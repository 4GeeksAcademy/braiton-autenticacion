"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import json
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/register', methods=['POST', 'GET'])
def addUser():
    body=json.loads(request.data)
    existUser=User.query.filter_by(email=body['email']).first()
    if existUser is None:
        newUser=User(
            email=body['email'],
            password=body['password']
        )
        db.session.add(newUser)
        db.session.commit()
        return jsonify({'msg':'usuario creado'})
    return jsonify({'msg':'el usuario ya existe'})

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    existUser=User.query.filter_by(email=email).first()

    if email != existUser.email or password != existUser.password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

