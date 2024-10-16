# --- Imports Start here--- ###
from flask import Flask, abort, make_response
from flask import jsonify
from flask import request
from database import db
import csv
import io
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
from flask_caching import Cache
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    current_user
)
from flask_cors import CORS
from celery.schedules import crontab
from config import LocalDevelopmentConfig
from flask_restful import Resource, Api
from celery import Celery
from send_mail import init_mail
from flask_mail import Message
from flask_sse import sse
from functools import wraps
from sqlalchemy import or_
# --- Imports End here--- ###

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
celery = Celery('Application')

# -------- Flask cache ------- #
cache = Cache(app)

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


# ------- Custom Decorator for role verification ----#
def role_required(role):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if current_user is None or current_user.role != role:
                return {'message': 'You role is not authorized'}, 401
            return f(*args, **kwargs)
        return decorated_function
    return decorator

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

    @jwt_required()
    def put(self, id):
        if isinstance(id, int):
            if request.method == 'PUT':
                user = User.query.filter_by(id=id).first()
                if user:
                    # Handle file upload
                    user.image = request.files['image'].read()
                    db.session.commit()
                    user_data = {
                        'id': user.id,
                        'role': user.role,
                        'email': user.email,
                        'auth_token': current_user.is_authenticated,
                        # Assuming image is stored as a base64-encoded string
                        'image': base64.b64encode(user.image).decode('utf-8')
                    }
                    return {
                        'message': f"User profile updated successfully in the database",
                        'resource': user_data}, 201
                else:
                    return {'message': "Not found"}, 404
        else:
            return '', 400


class DeleteMan(Resource):
    @role_required('admin')
    @jwt_required()
    def delete(self, id):
        man = User.query.filter_by(id=id).first()
        if man:
            db.session.delete(man)
            db.session.commit()
            return jsonify({'message': 'Deleted manager', 'resource': id}), 200
        else:
            return jsonify({'message': 'Not found'}), 404


class Signup(Resource):
    @jwt_required()
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

    @jwt_required()
    def delete(self, id):
        man = User.query.filter_by(id=id).first()
        if man:
            db.session.delete(man)
            db.session.commit()
            return {'message': 'Deleted manager', 'resource': id}, 200
        else:
            return {'message': 'Not found'}, 404

# --------------- AUTH END HERE ------------------------###


# ------- The CRUD operations or the business logic part will start from here ----#
class CatListResource(Resource):
    @cache.cached(timeout=50, key_prefix="get_category")
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
    @role_required('admin')
    @role_required('manager')
    @jwt_required()
    def get(self, id):
        category = Category.query.get(id)
        if category:
            return {
                'id': category.id,
                'name': category.name
            }
        else:
            return {'error': 'Category not found'}, 404

    @jwt_required()
    def put(self, id):
        data = request.get_json()
        category = Category.query.filter_by(id=id).first()
        if current_user.role == 'manager':
            admin = User.query.filter_by(role='admin').first()
            message = f"{id},{data['name']}"
            requested = RequestResponse(status='pending',
                                        type='category update',
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
            return {'message': 'Created request', 'resource': noti_data}, 201
        else:
            category.name = data['name']
            db.session.commit()
            return {
                'message': f"Category {data['name']} update successfully in database",
                'resource': {
                    'id': category.id,
                    'name': category.name}
            }, 201

    @jwt_required()
    def delete(self, id):
        category = Category.query.filter_by(id=id).first()
        if category:
            if current_user.role == 'manager':
                admin = User.query.filter_by(role='admin').first()
                message = f"{id},{category.name}"
                requested = RequestResponse(status='pending',
                                            type='category delete',
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
                return {'message': 'Created request', 'resource': noti_data}, 201
            else:
                products = Product.query.filter_by(
                    category_id=int(id)).all()
                for product in products:
                    carts = Cart.query.filter_by(
                        product_id=product.id).all()
                    for cart in carts:
                        db.session.delete(cart)
                        db.session.commit()
                    db.session.delete(product)
                    db.session.commit()
                db.session.delete(category)
                db.session.commit()
                return {
                    'message': f"Category { category.name } Deleted \
                    successfully from database",
                    'resource': {
                        'id': category.id,
                        'name': category.name}
                }, 201
        return {'message': "Not found"}, 404

    @jwt_required()
    def post(self):
        data = request.get_json()
        if data:
            if not Category.query.filter_by(name=data['name']).first():
                if current_user.role == 'manager':
                    admin = User.query.filter_by(role='admin').first()
                    message = data['name']
                    requested = RequestResponse(status='pending',
                                                type='category',
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
                    return {
                        'message': 'Created request',
                        'resource': noti_data}, 201
                else:
                    category = Category(name=data['name'])
                    db.session.add(category)
                    db.session.commit()
                    return {
                        'message': f"Category {data['name']} created successfully",
                        'resource': {
                            'id': category.id,
                            'name': category.name}
                    }, 201
            abort(409, message="Resource already exists")
        else:
            abort(404, message="Not found")


class ProListResource(Resource):
    @cache.cached(timeout=50, key_prefix="get_products")
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


class OrderListResource(Resource):
    def get(self):
        try:
            orders = Order.query.filter_by(user_id=current_user.id).all()
            orders_list = []
            for order in orders:
                cat = {
                    'id': order.id,
                    'product_name': order.product_name,
                    'user_id': order.user_id,
                    'quantity': order.quantity,
                    'rate': order.rate,
                    'total': order.total,
                    'image': base64.b64encode(
                        order.image).decode('utf-8') if order.image else None,
                    'order_date': order.order_date.strftime("%Y-%m-%d")
                }
                orders_list.append(cat)
            return orders_list, 200
        except Exception as e:
            return {'error': str(e)}, 500


class OrderResource(Resource):
    def put(self, id):
        data = request.get_json()
        order = Order.query.filter_by(id=id).first()
        order.rate = data['value']
        db.session.commit()
        cat = {
            'id': order.id,
            'product_name': order.product_name,
            'user_id': order.user_id,
            'quantity': order.quantity,
            'total': order.total,
            'rate': order.rate,
            'image': base64.b64encode(
                order.image).decode('utf-8') if order.image else None,
            'order_date': order.order_date.strftime("%Y-%m-%d")
        }
        orders = Order.query.filter_by(product_name=order.product_name).all()
        avg_rate = int(sum([
            each_order.rate for each_order in orders])/len(orders))
        product = Product.query.filter_by(name=order.product_name).first()
        product.rate = avg_rate
        db.session.commit()
        return {'message': 'Created request', 'resource': cat}, 201

    @jwt_required()
    def post(self):
        cart_item = Cart.query.filter_by(user_id=current_user.id).all()
        for cart in cart_item:
            product = Product.query.filter_by(id=cart.product_id).first()
            order = Order(product_name=cart.product_name, user_id=current_user.id, quantity=cart.quantity,
                          total=cart.quantity*cart.rpu, order_date=datetime.now(), image=product.image, rate=0)
            db.session.add(order)
            db.session.commit()
            db.session.delete(cart)
            db.session.commit()
            product.quantity -= cart.quantity
            db.session.commit()
        return {"message": "Thank you for shopping, visit again", 'resource': []}, 200


class CartListResource(Resource):
    def get(self):
        cart_items = Cart.query.filter_by(user_id=current_user.id).all()
        cart_list = []
        for product_exist in cart_items:
            cart = {
                'id': product_exist.id,
                'product_id': product_exist.product_id,
                'product_name': product_exist.product_name,
                'rpu': product_exist.rpu,
                'quantity': product_exist.quantity,
                'user_id': product_exist.user_id
            }
            cart_list.append(cart)
        return jsonify(cart_list), 200


class CartResource(Resource):
    @jwt_required()
    def put(self, id):
        # will pass operation from front for incre or decre
        cart_item = Cart.query.filter_by(id=id).first()
        product = Product.query.filter_by(id=cart_item.product_id).first()
        if product.quantity > cart_item.quantity:
            cart_item.quantity += 1
            db.session.commit()
            cart_list = {
                'id': cart_item.id,
                'product_id': cart_item.product_id,
                'product_name': cart_item.product_name,
                'rpu': cart_item.rpu,
                'quantity': cart_item.quantity,
                'user_id': cart_item.user_id
            }
            return {"message": "added to cart", 'resource': cart_list}, 201
        return {"message": "No more qty available"}, 200

    @jwt_required()
    def delete(self, id):
        cart_item = Cart.query.filter_by(id=id).first()
        db.session.delete(cart_item)
        db.session.commit()
        return {'message': "remove item",
                "resource": id}, 200

    @jwt_required()
    def post(self):
        data = request.get_json()
        product_exist = Cart.query.filter_by(
            product_id=int(data['id'])).first()
        product = Product.query.filter_by(id=int(data['id'])).first()
        if product_exist:
            if product.quantity > product_exist.quantity:
                product_exist.quantity += 1
                db.session.commit()
                cart_list = {
                    'id': product_exist.id,
                    'product_id': product_exist.product_id,
                    'product_name': product_exist.product_name,
                    'rpu': product_exist.rpu,
                    'quantity': product_exist.quantity,
                    'user_id': product_exist.user_id
                }
                return jsonify({"message": "added to cart", 'resource': cart_list}), 209
            return jsonify({"message": "No more qty available"}), 200
        else:
            if product.quantity > 0:
                cart_item = Cart(product_id=product.id, product_name=product.name,
                                 rpu=product.rpu, quantity=1, user_id=current_user.id)
                db.session.add(cart_item)
                db.session.commit()
                cart_list = {
                    'id': cart_item.id,
                    'product_id': cart_item.product_id,
                    'product_name': cart_item.product_name,
                    'rpu': cart_item.rpu,
                    'quantity': cart_item.quantity,
                    'user_id': cart_item.user_id
                }
                return jsonify({"message": "added to cart", 'resource': cart_list}), 201
            else:
                return jsonify({"message": "No more qty available"}), 200


class ManListResource(Resource):
    @jwt_required()
    def get(self):
        managers = User.query.filter_by(role='manager').all()
        man_list = []
        for man in managers:
            print((datetime.now() - man.doj).total_seconds() /
                  (365.25 * 24 * 3600), "year of exprience")
            man_data = {
                'id': man.id,
                'role': man.role,
                'name': man.name,
                'email': man.email,
                'doj': man.doj.strftime('%Y-%m-%d'),
                'exp': f"{(datetime.now() - man.doj).total_seconds() / (365.25 * 24 * 3600):.2f} years of experience",
                # Assuming image is stored as a base64-encoded string
                'image': base64.b64encode(man.image).decode('utf-8') if man.image else None
            }
            man_list.append(man_data)
        return {'resource': man_list}, 200


class NotListResource(Resource):
    @jwt_required()
    def get(self):
        if current_user.role == 'admin':
            notis = RequestResponse.query.filter_by(status='pending').all()
            noti_list = []
            for noti in notis:
                noti_data = {
                    'id': noti.id,
                    'state': noti.status,
                    'message': noti.message,
                    'sender': noti.sender,
                    'timestamp': noti.timestamp.strftime('%Y-%m-%d'),
                }
                noti_list.append(noti_data)
            return {'resource': noti_list}, 200
        else:
            notis = RequestResponse.query.filter_by(
                sender=current_user.email, status='pending').all()
            noti_list = []
            for noti in notis:
                noti_data = {
                    'id': noti.id,
                    'state': noti.status,
                    'message': noti.message,
                    'sender': noti.sender,
                    'timestamp': noti.timestamp.strftime('%Y-%m-%d'),
                }
                noti_list.append(noti_data)
            return {'resource': noti_list}, 200

    @jwt_required()
    def put(self, id):
        req = RequestResponse.query.filter_by(id=id).first()
        if req:
            req.status = 'declined'
            db.session.commit()
            return {'message': 'Request declined'}, 200
        else:
            return {'message': 'Not found'}, 404


class SearchCatResource(Resource):
    def post(self):
        data = request.get_json()
        query = data.get('query')

        # Search for products and categories based on the query
        products = Product.query.filter(or_(
            Product.name.ilike(f'%{query}%'),
            Product.rpu.ilike(f'%{query}%'),
            Product.manufacture.ilike(f'%{query}%'),
            Product.description.ilike(f'%{query}%'),
            Product.expiry.ilike(f'%{query}%'),
            Product.category.has(Category.name.ilike(f'%{query}%'))
        )).all()
        category = Category.query.filter_by(name=query).first()
        products = Product.query.filter_by(category_id=category.id).all()
        product_list = []
        categories = []
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
                # Assuming image is stored as a base64-encoded string
                'image': base64.b64encode(new_product.image).decode('utf-8')
            }
            if new_product.category not in categories:
                categories.append(new_product.category)
            product_list.append(prod_data)
        categories_list = []
        for category in categories:
            cat = {
                'id': category.id,
                'name': category.name,
            }
            categories_list.append(cat)
        return jsonify({"cat": categories_list, 'pro': product_list}), 200


class SearchResource(Resource):
    def post(self):
        data = request.get_json()
        query = data.get('query')

        # Search for products and categories based on the query
        products = Product.query.filter(or_(
            Product.name.ilike(f'%{query}%'),
            Product.rpu.ilike(f'%{query}%'),
            Product.manufacture.ilike(f'%{query}%'),
            Product.description.ilike(f'%{query}%'),
            Product.expiry.ilike(f'%{query}%'),
            Product.category.has(Category.name.ilike(f'%{query}%'))
        )).all()
        product_list = []
        categories = []
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
                # Assuming image is stored as a base64-encoded string
                'image': base64.b64encode(new_product.image).decode('utf-8')
            }
            if new_product.category not in categories:
                categories.append(new_product.category)
            product_list.append(prod_data)
        categories_list = []
        for category in categories:
            cat = {
                'id': category.id,
                'name': category.name,
            }
            categories_list.append(cat)
        return jsonify({"cat": categories_list, 'pro': product_list}), 200


class AdminManagerRequestResource(Resource):
    @jwt_required()
    def get(self, id):
        req = RequestResponse.query.filter_by(id=id).first()
        if req:
            if req.type == 'manager':
                data = req.message.split(',')
                new_user = User(email=data[0], name=data[1], role=data[2], password=generate_password_hash(
                    data[3], method='scrypt'), doj=req.timestamp)
                db.session.add(new_user)
                db.session.commit()
                man_data = {
                    'id': new_user.id,
                    'role': new_user.role,
                    'name': new_user.name,
                    'email': new_user.email,
                    'doj': new_user.doj.strftime('%Y-%m-%d'),
                    'exp': f"{(datetime.now() - new_user.doj).total_seconds() / (365.25 * 24 * 3600):.2f} years of experience",
                    # Assuming image is stored as a base64-encoded string
                    'image': base64.b64encode(new_user.image).decode('utf-8') if new_user.image else None
                }
                req.status = 'approved'
                db.session.commit()
                with mail.connect() as conn:
                    subject = "Manager Role Application Approved"
                    message = """
                        <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                            <h1 style="color: #28a745;">Manager Role Application Approved</h1>
                            <p>Congratulations! We are pleased to inform you that your application for the Manager role has been approved.</p>
                            <p>You can now log in to your account and access the manager features. Click the link below to log in:</p>
                            <a href="http://127.0.0.1:5000/" style="display: inline-block; padding: 10px 20px; background-color: #28a745; color: #fff; text-decoration: none; border-radius: 5px;">Log In</a>
                            <p>If you have any questions or need further assistance, feel free to reach out to our support team.</p>
                            <p>Thank you for choosing our platform!</p>
                            <p>Best regards,<br>Your Company Name</p>
                        </div>
                    """
                    msg = Message(
                        recipients=[new_user.email], html=message, subject=subject)
                    conn.send(msg)

                return jsonify({'message': "Approved", 'resource': man_data, 'type': req.type}), 201
            elif req.type == 'category':
                data = req.message.split(',')
                category = Category(name=data[0])
                db.session.add(category)
                db.session.commit()
                req.status = 'approved'
                db.session.commit()
                return jsonify({'message': f"Category {data[0]} created successfully",
                                'resource': {'id': category.id, 'name': category.name}}), 201
            elif req.type == 'category update':
                data = req.message.split(',')
                category = Category.query.filter_by(id=int(data[0])).first()
                category.name = data[1]
                db.session.commit()
                req.status = 'approved'
                db.session.commit()
                return jsonify({'message': f"Category {data[1]} created successfully",
                                'resource': {'id': category.id, 'name': category.name}}), 201
            elif req.type == 'category delete':
                data = req.message.split(',')
                category = Category.query.filter_by(id=int(data[0])).first()
                products = Product.query.filter_by(
                    category_id=int(data[0])).all()
                for product in products:
                    carts = Cart.query.filter_by(product_id=product.id).all()
                    for cart in carts:
                        db.session.delete(cart)
                        db.session.commit()
                    db.session.delete(product)
                    db.session.commit()
                db.session.delete(category)
                db.session.commit()
                req.status = 'approved'
                db.session.commit()
                return jsonify({'message': f"Category {category.name} created successfully",
                                'resource': {'id': category.id, 'name': category.name}}), 200
            elif req.type == 'product':
                data = req.message.split(',')
                name = data[0]
                quantity = int(data[1])
                manufacture = datetime.strptime(data[2], '%Y-%m-%d')
                expiry = datetime.strptime(data[3], '%Y-%m-%d')
                rpu = float(data[4])
                category_id = int(data[5])
                unit = data[6]
                description = data[7]

                image = req.image
                new_product = Product(
                    name=name,
                    quantity=quantity,
                    manufacture=manufacture,
                    expiry=expiry,
                    rpu=rpu,
                    unit=unit,
                    image=image,
                    category_id=category_id,
                    description=description
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
                req.status = 'approved'
                db.session.commit()
                return jsonify({'message': f"Product {data[0]} add successfully in the database",
                                'resource': prod_data}), 201
            elif req.type == 'product update':
                data = req.message.split(',')
                product = Product.query.filter_by(id=data[0]).first()
                product.name = data[1]
                product.quantity = int(data[2])
                product.manufacture = datetime.strptime(data[3], '%Y-%m-%d')
                product.expiry = datetime.strptime(data[4], '%Y-%m-%d')
                product.rpu = float(data[5])
                product.category_id = int(data[6])
                product.unit = data[7]
                product.description = data[8]

                product.image = req.image
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
                req.status = 'approved'
                db.session.commit()
                return jsonify({'message': f"Product {data[1]} add successfully in the database",
                                'resource': prod_data}), 201
            elif req.type == 'product delete':
                data = req.message.split(',')
                product = Product.query.filter_by(id=int(data[0])).first()
                carts = Cart.query.filter_by(product_id=product.id).all()
                for cart in carts:
                    db.session.delete(cart)
                    db.session.commit()
                db.session.delete(product)
                db.session.commit()
                req.status = 'approved'
                db.session.commit()
                return jsonify({'message': f"Product {product.name} deleted successfully from the database", 'resource': data[0]}), 200
        else:
            return jsonify({'message': 'Not found'}), 404


# ----------- BUSINESS LOGIC END HERE -----------------###

api.add_resource(LoginResource, '/api/login')
api.add_resource(AuthUser, '/auth/user', '/update/profile/<int:id>')
api.add_resource(NotListResource, '/decline/<int:id>', '/get/all/noti')
api.add_resource(DeleteMan, '/delete/man/<int:id>')
api.add_resource(Signup, '/signup')

api.add_resource(CatListResource, '/get/categories')
api.add_resource(CategoryResource, '/update/category/<int:id>',
                 '/delete/category/<int:id>', '/get/category/<int:id>',
                 '/add/cat')
api.add_resource(ProListResource, '/get/products')
api.add_resource(ProductResource, '/update/product/<int:prod_id>',
                 '/add/product')
api.add_resource(CartResource, '/cart/item/remove/<int:id>',
                 '/cart/item/increment/<int:id>', '/add/to/cart')

api.add_resource(AdminManagerRequestResource, '/approve/<int:id>')
api.add_resource(SearchCatResource, '/search/by/catgory')
api.add_resource(SearchResource, '/search/for')
api.add_resource(OrderResource, '/update/order/<int:id>', '/cart/items/buy')
api.add_resource(OrderListResource, '/get/orders')
api.add_resource(CartListResource, '/get/cart/items')
api.add_resource(ManListResource, '/get/all/managers')


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


# ----------- Async Job will trigger here ---------------#
class AsyncJobResource(Resource):
    @jwt_required()
    def get(self):
        job = user_triggered_async_job.delay()
        result = job.get()
        return result, 200


class DownloadResource(Resource):
    @jwt_required()
    def get(self):
        with open('product_report.csv', 'r') as file:
            csv_reader = csv.reader(file)
            csv_data = list(csv_reader)
            csv_buffer = io.StringIO()
            csv_writer = csv.writer(csv_buffer)
            csv_writer.writerows(csv_data)
            print(csv_buffer.getvalue())
        response = make_response(csv_buffer.getvalue())
        response.headers['Content-Disposition'] = 'attachment; filename=report.csv'
        response.headers['Content-Type'] = 'text/csv'
        return response


class SendWarningResource(Resource):
    @jwt_required()
    def get(self):
        managers = User.query.filter_by(role='manager').all()
        man_list = []
        for man in managers:
            man_data = {
                'id': man.id,
                'name': man.name,
                'email': man.email,
            }
            man_list.append(man_data)
        return man_list, 200

    def post(self):
        data = request.get_json()
        with mail.connect() as conn:
            subject = "Alert from Admin"
            message = data['message']
            msg = Message(recipients=[data['email']],
                          html=message, subject=subject)
            conn.send(msg)

            return jsonify({'message': "sent"}), 200


api.add_resource(DownloadResource, '/get/report/download')
api.add_resource(AsyncJobResource, '/get/report/data')
api.add_resource(SendWarningResource, '/send/alert')

if __name__ == "__main__":
    app.run()
