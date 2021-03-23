from flask_mail import Mail
from flask import Flask, jsonify
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_cors import CORS
from marshmallow import ValidationError
from flask_uploads import configure_uploads, patch_request_class
from libs.image_helper import IMAGE_SET
from dotenv import load_dotenv

from db import db
from ma import ma
from blacklist import BLACKLIST

app = Flask(__name__)
db.init_app(app)
migrate = Migrate(app, db)
load_dotenv(".env", verbose=True)
app.config.from_object("config")  # load default configs from config.py
app.config.from_envvar(
    "APPLICATION_SETTINGS"
)  # override with config.py (APPLICATION_SETTINGS points to config.py)
patch_request_class(app, 10 * 1024 * 1024)  # restrict max upload image size to 10MB
configure_uploads(app, IMAGE_SET)
api = Api(app)
mail = Mail(app)


@app.before_first_request
def create_tables():
    db.create_all()


@app.errorhandler(ValidationError)
def handle_marshmallow_validation(err):
    return jsonify(err.messages), 400

@app.after_request
def add_header(response):
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '-1'
    return response

jwt = JWTManager(app)


# This method will check if a token is blacklisted, and will be called automatically when blacklist is enabled
@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    return decrypted_token["jti"] in BLACKLIST

from resources.user import UserRegister, UserConfirm, UserLogin, UserLogout, GetUserBio, UpdateUserBio, LikeList, UnlikeList, LikedList
from resources.address import Address
from resources.list import List, ListsList, GetList, GetUserLike
from resources.image import AvatarUpload, Avatar

api.add_resource(UserRegister, "/register")
api.add_resource(UserConfirm, "/confirm/<token>")
api.add_resource(UserLogin, "/signin")
api.add_resource(UserLogout, "/signout")
api.add_resource(GetUserBio, "/userbio/<int:user_id>")
api.add_resource(UpdateUserBio, "/updatebio/<int:user_id>")
api.add_resource(LikeList, "/like/<int:list_id>")
api.add_resource(UnlikeList, "/unlike/<int:list_id>")
api.add_resource(LikedList, "/liked/<int:list_id>")

api.add_resource(Address, "/createaddress")

api.add_resource(List, "/createlist")
api.add_resource(ListsList, "/alllists")
api.add_resource(GetList, "/list/<int:id>")
api.add_resource(GetUserLike, "/likedlist/<int:list_id>")

api.add_resource(AvatarUpload, "/upload/avatar")
api.add_resource(Avatar, "/avatar/<int:user_id>")

cors = CORS(app, resources={r"/*": {"origins": "*"}})

if __name__ == "__main__":
    ma.init_app(app)
    app.run(port=5000, debug=True)
