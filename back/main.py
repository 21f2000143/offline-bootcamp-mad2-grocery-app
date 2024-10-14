from flask import Flask, abort
from flask import jsonify
from flask import request
from database import db
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
    set_access_cookies,
    current_user
)

from flask_cors import CORS
from config import LocalDevelopmentConfig
from flask_restful import Resource, Api
import workers
app, api, jwt = None, None, None


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


# Register a callback function that takes whatever object is passed in as the
# identity when creating JWTs and converts it to a JSON serializable format.
@jwt.user_identity_loader
def user_identity_lookup(id):
    return id


# Register a callback function that loads a user from your database whenever
# a protected route is accessed. This should return any python object on a
# successful lookup, or None if the lookup failed for any reason (for example
# if the user has been deleted from the database).
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).first()


celery = workers.celery


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
                access_token = create_access_token(identity=user.email)
                response = jsonify(access_token=access_token)
                response = jsonify(id=user.id, role=user.role,
                                   email=user.email)
                set_access_cookies(response, access_token)
                return response
            return jsonify(error="Authentication failed"), 401
        return jsonify(error="wrong credentials"), 404


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
    def get(self, id):
        category = Category.query.get(id)
        if category:
            return {
                'id': category.id,
                'name': category.name
            }
        else:
            return jsonify({'error': 'Category not found'}), 404
      
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
        
    def delete(self, id):
        category = Category.query.filter_by(id=id).first()
        if category:
            db.session.delete(category)
            db.session.commit()
            return {'message': 'Category deleted successfully'}, 200
        else:
            return {'error': 'Category not found'}, 404
    
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


api.add_resource(LoginResource, '/api/login')
api.add_resource(CatListResource, '/get/categories')
api.add_resource(CategoryResource, '/update/category/<int:id>',
                 '/delete/category/<int:id>', '/get/category/<int:id>',
                 '/add/cat')


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
                'email': current_user.email
                # Assuming image is stored as a base64-encoded string
                # 'image': base64.b64encode(current_user.image).decode('utf-8') if current_user.image else None
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
            return jsonify({'error': 'User already exists'}), 409
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
            return jsonify({'message': 'Created request, \
                            on result will send on mail'}), 201
        else:
            new_user = User(email=data["email"], name=data["name"],
                            role=data["role"], password=generate_password_hash(
                data["password"], method='scrypt'), doj=datetime.now())
            db.session.add(new_user)
            db.session.commit()
            verified_data = {
                "email": data["email"],
                "name": data["name"],
                "role": data["role"],
                "auth-token": current_user.is_authenticated
            }
            return jsonify({'message': 'User registered successfully',
                            'data': verified_data}), 201


# class Logout(Resource):
#     @login_required
#     def get(self):
#         logout_user()
#         return jsonify({'message': "logout successful"}), 200

# ------- The CRUD resources will start from here ----#

api.add_resource(AuthUser, '/auth/user')
api.add_resource(Decline, '/decline/<int:id>')
api.add_resource(DeleteMan, '/delete/man/<int:id>')
api.add_resource(Signup, '/signup')
# api.add_resource(Logout, '/logout')

if __name__ == "__main__":
    app.run()
