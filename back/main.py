# --- Imports --- ###
from flask import Flask, abort
from flask import jsonify
from flask import request
from database import db
import base64
from models import (
    User,
    Product,
    Order,
    Cart,
    RequestResponse,
    Category
)
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    get_jwt_identity,
    jwt_required,
    current_user
)
from flask_cors import CORS
import redis
from celery.schedules import crontab
from config import LocalDevelopmentConfig
from flask_restful import Resource, Api
import workers
from send_mail import init_mail
from flask_mail import Message
from flask_sse import sse


app, api, jwt = None, None, None


# ---- Flask app factory ---- #
def create_app():
    app = Flask(__name__)
    app.config.from_object(LocalDevelopmentConfig)
    CORS(app, origins=['http://localhost:5173'], supports_credentials=True)
    jwt = JWTManager(app)
    db.init_app(app)
    app.app_context().push()
    db.create_all()
    api = Api(app)
    return app, api, jwt


app, api, jwt = create_app()

# ------ flask sse ------ #
app.register_blueprint(sse, url_prefix='/stream')


# ------- Celery app ------- #
celery = workers.celery

# Update celery app configurations
celery.conf.update(
    broker_url=app.config["CELERY_BROKER_URL"],
    result_backend=app.config["CELERY_RESULT_BACKEND"],
    timezone=app.config["CELERY_TIMEZONE"],
    broker_connection_retry_on_startup=app.config["BROKER_CONNECTION_RETRY_ON_STARTUP"]
)
celery.conf.timezone = 'Asia/Kolkata'


# Register a callback function that takes whatever object is passed in as the
# identity when creating JWTs and converts it to a JSON serializable format.
@jwt.user_identity_loader
def user_identity_lookup(user):
    print(user)
    return user.id


# Register a callback function that loads a user from your database whenever
# a protected route is accessed. This should return any python object on a
# successful lookup, or None if the lookup failed for any reason (for example
# if the user has been deleted from the database).
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).first()


# ------- Admin user through code ---#
admin_exist = User.query.filter_by(email="sachin@gmail.com").first()
if admin_exist is None:
    user = User(email="sachin@gmail.com",
                password=generate_password_hash("sachin123"), name="sachin",
                role="admin", doj=datetime.now(), loginAt=datetime.now())
    db.session.add(user)
    db.session.commit()


# ------- My flask-restful api resources will start from here --------#


# ------- The authentication and authorization part will start from here ----#
class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email", None)
        password = data.get("password", None)
        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                access_token = create_access_token(identity=user)
                response = jsonify(id=user.id, role=user.role,
                                   email=user.email, access_token=access_token)
                return response
            return jsonify(error="Authentication failed"), 401
        return jsonify(error="wrong credentials"), 404


class AuthUser(Resource):
    @jwt_required()
    def get(self):
        if not current_user:
            # if the user doesn't exist or password is wrong, reload the page
            return jsonify({'error': 'wrong credentials'}), 404
        else:
            user_data = {
                'id': current_user.id,
                'role': current_user.role,
                'email': current_user.email,
                'image': base64.b64encode(
                    current_user.image
                ).decode('utf-8') if current_user.image else None
            }
            return jsonify({'message': 'User login successfully',
                            'resource': user_data}), 200


class Decline(Resource):
    def get(self, id):
        req = RequestResponse.query.filter_by(id=id).first()
        if req:
            req.status = 'declined'
            db.session.commit()
            return jsonify({'message': 'Request declined'}), 200
        else:
            return jsonify({'message': 'Not found'}), 404


class DeleteMan(Resource):
    def delete(self, id):
        man = User.query.filter_by(id=id).first()
        if man:
            db.session.delete(man)
            db.session.commit()
            return jsonify({'message': 'Deleted manager', 'resource': id}), 200
        else:
            return jsonify({'message': 'Not found'}), 404


class Signup(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(email=data["email"]).first()
        exist_req = RequestResponse.query.filter_by(
            sender=data["email"]).first()

        admin = User.query.filter_by(role='admin').first()
        if user or exist_req:  #
            return {'msg': 'User already exists, Try with another email'}, 409
        if data["role"] == 'manager':
            message = f"{data['email']},{data['name']},{data['role']}, \
            {data['password']}"
            requested = RequestResponse(status='pending',
                                        type='manager',
                                        message=message,
                                        sender=data['email'],
                                        receiver=admin.email,
                                        timestamp=datetime.now())
            db.session.add(requested)
            db.session.commit()
            return {'message': 'Created request, \
                            on result will send on mail'}, 201
        else:
            new_user = User(email=data["email"], name=data["name"],
                            role=data["role"], password=generate_password_hash(
                data["password"], method='scrypt'), doj=datetime.now())
            db.session.add(new_user)
            db.session.commit()
            inserted_data = {
                "email": data["email"],
                "name": data["name"],
                "role": data["role"],
                "auth-token": current_user.is_authenticated
            }
            return {'message': 'User registered successfully',
                    'data': inserted_data}, 201


# --------------- AUTH END HERE ------------------------###


# ------- The CRUD operations or the business logic part will start from here ----#
class CatListResource(Resource):
    def get(self):
        categories = Category.query.all()
        categories_list = []
        for category in categories:
            cat = {
                'id': category.id,
                'name': category.name,
            }
            categories_list.append(cat)
        return categories_list


class CategoryResource(Resource):
    @jwt_required()
    def get(self, id):
        category = Category.query.get(id)
        if category:
            return {
                'id': category.id,
                'name': category.name
            }
        else:
            return jsonify({'error': 'Category not found'}), 404

    @jwt_required()
    def put(self, id):
        category = Category.query.filter_by(id=id).first()
        if category:
            data = request.get_json()
            category.name = data['name']
            db.session.commit()
            return jsonify({
                'id': category.id,
                'name': category.name
            })
        else:
            return jsonify({'error': 'Category not found'}), 404

    @jwt_required()
    def delete(self, id):
        category = Category.query.filter_by(id=id).first()
        if category:
            db.session.delete(category)
            db.session.commit()
            return {'message': 'Category deleted successfully'}, 200
        else:
            return {'error': 'Category not found'}, 404

    @jwt_required()
    def post(self):
        data = request.get_json()
        if data:
            if not Category.query.filter_by(name=data['name']).first():
                category = Category(name=data['name'])
                db.session.add(category)
                db.session.commit()
                return {
                    'message': f"Category {data['name'] } created successfully",
                    'resource': {'id': category.id, 'name': category.name}}, 201
            abort(409, message="Resource already exists")
        else:
            abort(404, message="Not found")


class ProListResource(Resource):
    def get(self):
        products = Product.query.all()
        product_list = []
        for new_product in products:
            prod_data = {
                'id': new_product.id,
                'quantity': new_product.quantity,
                'name': new_product.name,
                'manufacture': new_product.manufacture,
                'expiry': new_product.expiry,
                'description': new_product.description,
                'rpu': new_product.rpu,
                'unit': new_product.unit,
                'image': base64.b64encode(new_product.image).decode('utf-8')
            }
            product_list.append(prod_data)
        return product_list, 200


class ProductResource(Resource):
    @jwt_required()
    def get(self, id):
        product = Product.query.filter_by(id=id).first()
        if product:
            prod_data = {
                'id': product.id,
                'quantity': product.quantity,
                'name': product.name,
                'manufacture': product.manufacture,
                'description': product.description,
                'expiry': product.expiry,
                'rpu': product.rpu,
                'unit': product.unit,
                # Assuming image is stored as a base64-encoded string
                'image': base64.b64encode(product.image).decode('utf-8')
            }
            return jsonify(prod_data), 200
        else:
            abort(404, message="Not found")

    @jwt_required()
    def put(self, id):
        product = Product.query.filter_by(id=id).first()
        if product:
            if current_user.role == 'manager':
                admin = User.query.filter_by(role='admin').first()
                message = f"{id},{request.form['name']},{request.form['quantity']},{request.form['manufacture']},{request.form['expiry']},{request.form['rpu']},{request.form['category_id']},{request.form['unit']}, {request.form['description']}"
                requested = RequestResponse(status='pending',
                                            type='product update',
                                            message=message,
                                            sender=current_user.email,
                                            image=request.files['image'].read(
                                            ),
                                            receiver=admin.email,
                                            timestamp=datetime.now())
                db.session.add(requested)
                db.session.commit()
                noti_data = {
                    'id': requested.id,
                    'state': requested.status,
                    'message': requested.message,
                    'sender': requested.sender,
                    'timestamp': requested.timestamp.strftime('%Y-%m-%d'),
                }
                return {'message': 'Created request', 'resource': noti_data}, 201
            else:
                product.name = request.form['name']
                product.quantity = int(request.form['quantity'])
                product.manufacture = datetime.strptime(
                    request.form['manufacture'], '%Y-%m-%d')
                product.expiry = datetime.strptime(
                    request.form['expiry'], '%Y-%m-%d')
                product.rpu = float(request.form['rpu'])
                product.category_id = float(request.form['category_id'])
                product.unit = request.form['unit']
                product.description = request.form['description']

                # Handle file upload
                product.image = request.files['image'].read()
                db.session.commit()
                prod_data = {
                    'id': product.id,
                    'quantity': product.quantity,
                    'name': product.name,
                    'manufacture': product.manufacture,
                    'expiry': product.expiry,
                    'description': product.description,
                    'rpu': product.rpu,
                    'unit': product.unit,
                    # Assuming image is stored as a base64-encoded string
                    'image': base64.b64encode(product.image).decode('utf-8')
                }
                return jsonify({'message': f"Product {request.form['name']} updated successfully in the database",
                                'resource': prod_data}), 201
        else:
            return jsonify({'message': "Not found"}), 404

    @jwt_required()
    def delete(self, id):
        product = Product.query.filter_by(id=id).first()
        if product:
            if current_user.role == 'manager':
                admin = User.query.filter_by(role='admin').first()
                message = f"{id},{product.name}"
                requested = RequestResponse(status='pending',
                                            type='product delete',
                                            message=message,
                                            sender=current_user.email,
                                            receiver=admin.email,
                                            timestamp=datetime.now())
                db.session.add(requested)
                db.session.commit()
                noti_data = {
                    'id': requested.id,
                    'state': requested.status,
                    'message': requested.message,
                    'sender': requested.sender,
                    'timestamp': requested.timestamp.strftime('%Y-%m-%d'),
                }
                return jsonify({'message': 'Created request', 'resource': noti_data}), 201
            else:
                carts = Cart.query.filter_by(product_id=product.id).all()
                for cart in carts:
                    db.session.delete(cart)
                    db.session.commit()
                db.session.delete(product)
                db.session.commit()
                return jsonify({'message': f"Product {product.name} deleted successfully from the database", 'resource': id}), 201
        return jsonify({'message': "Not found"}), 404

    @jwt_required()
    def post(self):
        name_exist = Product.query.filter_by(name=request.form['name']).first()
        if name_exist:
            return {'message': "Resource already exists"}, 409
        else:
            if current_user.role == 'manager':
                admin = User.query.filter_by(role='admin').first()
                message = f"{request.form['name']},{request.form['quantity']},{request.form['manufacture']},{request.form['expiry']},{request.form['rpu']},{request.form['category_id']},{request.form['unit']}, {request.form['description']}"
                requested = RequestResponse(status='pending',
                                            type='product',
                                            message=message,
                                            sender=current_user.email,
                                            image=request.files['image'].read(
                                            ),
                                            receiver=admin.email,
                                            timestamp=datetime.now())
                db.session.add(requested)
                db.session.commit()
                noti_data = {
                    'id': requested.id,
                    'state': requested.status,
                    'message': requested.message,
                    'sender': requested.sender,
                    'timestamp': requested.timestamp.strftime('%Y-%m-%d'),
                }
                return jsonify({'message': 'Created request', 'resource': noti_data}), 201
            else:
                name = request.form['name']
                quantity = int(request.form['quantity'])
                manufacture = datetime.strptime(
                    request.form['manufacture'], '%Y-%m-%d')
                expiry = datetime.strptime(request.form['expiry'], '%Y-%m-%d')
                rpu = float(request.form['rpu'])
                category_id = float(request.form['category_id'])
                unit = request.form['unit']
                description = request.form['description']

                # Handle file upload
                image = request.files['image'].read()
                new_product = Product(
                    name=name,
                    quantity=quantity,
                    manufacture=manufacture,
                    expiry=expiry,
                    description=description,
                    rpu=rpu,
                    unit=unit,
                    image=image,
                    category_id=category_id
                )
                prod_data = {
                    'id': new_product.id,
                    'quantity': new_product.quantity,
                    'name': new_product.name,
                    'manufacture': new_product.manufacture,
                    'expiry': new_product.expiry,
                    'description': new_product.description,
                    'rpu': new_product.rpu,
                    'unit': new_product.unit,
                    # Assuming image is stored as a base64-encoded string
                    'image': base64.b64encode(new_product.image).decode('utf-8')
                }
                db.session.add(new_product)
                db.session.commit()
                return {'msg': f"Product {request.form['name']} add successfully in the database",
                        'resource': prod_data}, 201
# ----------- BUSINESS LOGIC END HERE -----------------###


api.add_resource(LoginResource, '/api/login')
api.add_resource(AuthUser, '/auth/user')
api.add_resource(Decline, '/decline/<int:id>')
api.add_resource(DeleteMan, '/delete/man/<int:id>')
api.add_resource(Signup, '/signup')

api.add_resource(CatListResource, '/get/categories')
api.add_resource(CategoryResource, '/update/category/<int:id>',
                 '/delete/category/<int:id>', '/get/category/<int:id>',
                 '/add/cat')
api.add_resource(ProListResource, '/get/products')


# ----------- All the micro services or celery tasks will be added here ------------###
mail = init_mail()


@celery.task()
def daily_reminder():
    print('daily reminder to users executed')
    with mail.connect() as conn:
        subject = "Grocery App V2 Reminder"
        message = """
                    <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                        <h1 style="color: #28a745;">Reminder: Visit Eat Fresh App</h1>
                        <p>This is a friendly reminder to visit Eat Fresh App and explore our latest offerings. We have exciting
                            products and categories waiting for you!</p>
                        <p>Don't miss out on the freshest and tastiest options. Click the link below to start your Eat Fresh
                            experience:</p>
                        <a href="http://127.0.0.1:5173/" style="display: inline-block; padding: 10px 20px; background-color: #28a745; color: #fff; text-decoration: none; border-radius: 5px;">Visit Eat Fresh App</a>
                        <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
                        <p>Thank you for choosing Eat Fresh!</p>
                        <p>Best regards,<br>Eat Fresh</p>
                    </div>
                    """
        msg = Message(recipients=['x@gmail.com', 'y@gmail', 'zgmail.com'],
                      html=message, subject=subject)
        conn.send(msg)
        sse.publish({"message": "Sent daily reminder to all \
                     the eligible users!"}, type='notifyadmin')
    return {'message': "Daily reminder to users executed"}


@celery.task()
def monthly_report():
    print('monthly report to users executed')
    return {'message': "Monthly report to users executed"}


@celery.task()
def user_triggered_async_job():
    print('user triggered async job executed')
    return {'message': "User triggered async job executed"}


# ------- To schedule the tasks --------#
celery.conf.beat_schedule = {
    'my_monthly_task': {
        'task': "main.daily_reminder",
        'schedule': crontab(hour=13, minute=50, day_of_month=1,
                            month_of_year='*/1'),
    },
    'my_daily_task': {
        'task': "main.monthly_report",
        'schedule': crontab(hour=21, minute=0),
    },
    'my_quick_check_task': {
        'task': "main.daily_reminder",
        'schedule': crontab(minute='*/1'),
    },
}

if __name__ == "__main__":
    app.run()
