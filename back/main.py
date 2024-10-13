from flask import Flask
from flask import jsonify
from flask import request
from database import db
from models import *
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required, set_access_cookies
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import LocalDevelopmentConfig
from flask_restful import Resource, Api

app, api = None, None
def create_app():
    app = Flask(__name__)
    app.config.from_object(LocalDevelopmentConfig)
    CORS(app, origins='http://localhost:5173', supports_credentials=True)
    jwt = JWTManager(app)
    db.init_app(app)
    app.app_context().push()
    db.create_all()
    api = Api(app)
    return app, api

app, api = create_app()


admin_exist = User.query.filter_by(email="sachin@gmail.com").first()
if admin_exist is None:
    user = User(email="sachin@gmail.com", 
                password=generate_password_hash("sachin123"), name="sachin", 
                role="admin", doj=datetime.now(), loginAt=datetime.now())
    db.session.add(user)
    db.session.commit()


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
# @app.route("/api/login", methods=["POST"])
# def login():
#     data = request.get_json()
#     email = data.get("email", None)
#     password = data.get("password", None)
#     print(email, password)
#     user = User.query.filter_by(email=email).first()
#     if user:
#         if check_password_hash(user.password, password):
#             access_token = create_access_token(identity=user.email)
#             response = jsonify(access_token=access_token)
#             set_access_cookies(response, access_token)
#             return response
#         return jsonify(error="Authentication failed"), 401
    
#     return jsonify(error="wrong credentials"), 404


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


####------- My flask-restful api resources will start from here ###--------

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
                set_access_cookies(response, access_token)
                return response
            return jsonify(error="Authentication failed"), 401
        return jsonify(error="wrong credentials"), 404
    

api.add_resource(LoginResource, '/api/login')

if __name__ == "__main__":
    app.run()