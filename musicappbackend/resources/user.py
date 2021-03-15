from flask_restful import Resource
from flask import Response
from flask import request
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_refresh_token_required,
    get_jwt_identity,
    jwt_required,
    get_raw_jwt,
)
from models.user import UserModel
from schemas.user import UserSchema
from blacklist import BLACKLIST
from libs.strings import gettext
from libs.token import ( 
    generate_verification_token, 
    confirm_verification_token
)

user_schema = UserSchema()
user_list_schema = UserSchema(many=True)

class UserRegister(Resource):
    @classmethod
    def post(cls):
        try:
            user_json = request.get_json()
            user = user_schema.load(user_json)
            password = User.generate_hash(user.password)
            token = generate_verification_token(user.email)

            if UserModel.find_by_username(user.username):
                return {"message": gettext("user_username_exists")}, 400

            if UserModel.find_by_email(user.email):
                return {"message": gettext("user_email_exists")}, 400

            verification_email = verify_email(token)
            html = render_template_string("<p>Welcome! Thanks for \
            signing up. Please follow this link to activate your \
            account:</p> <p><a href='{{ verification_email }}'>{{ \
            verification_email }}</a></p> <br> <p>Thanks!</p>",
            verification_email=verification_email)
            subject = "Please Verify your email"
            send_email(user.email, subject, html)

            result = user_schema.dump(user.save_to_db()).user
            return {"message": gettext("user_registered")}, 201

        except Exception as e:
            print(e)
            return {"message": gettext("user_invalid_input")}, 402
    
    @classmethod
    def verify_email( cls, token: str ) -> Response:
        try:
           email = confirm_verification_token(token)
        except:
            return {"message": gettext("user_verification_token_invalid")}, 401
        user = UserModel.query.filter_by(email=email).first_or_404()
        if user.isVerified:
            return {"message": gettext("user_duplicate_verification")}, 422
        else:
            user.isVerified = True
            user.save_to_db()
            return {"message": gettext("user_email_verification_success")}, 200

class UserLogin(Resource):
    @classmethod
    def post(cls):
        user_json = request.get_json()
        user_data = user_schema.load(user_json, partial=("email",))

        user = UserModel.find_by_username(user_data.username)

        if not user:
            return {"message": gettext("user_not_existed")}, 404

        if user and not user.isVerified:
            return {"message": gettext("user_not_confirmed")}, 400
        
        if UserModel.verify_hash(user.password, user_data.password):
            access_token = create_access_token(user.id, fresh=True)
            refresh_token = create_refresh_token(user.id)
            return (
                    {"access_token": access_token, "refresh_token": refresh_token},
                    200,
                )

        return {"message": gettext("user_invalid_credentials")}, 401


class UserLogout(Resource):
    @classmethod
    @jwt_required
    def post(cls):
        jti = get_raw_jwt()["jti"]  # jti is "JWT ID", a unique identifier for a JWT.
        user_id = get_jwt_identity()
        BLACKLIST.add(jti)
        return {"message": gettext("user_logged_out").format(user_id)}, 200


class TokenRefresh(Resource):
    @classmethod
    @jwt_refresh_token_required
    def post(cls):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user, fresh=False)
        return {"access_token": new_token}, 200

class LikeList(Resource):
    @classmethod
    @jwt_refresh_token_required
    def post(cls, list_id):
        current_user = get_jwt_identity()
        current_user.like_post(list_id)
        return {"message": gettext("user_liked").format(user_id)}, 200

class UnlikeList(Resource):
    @classmethod
    @jwt_refresh_token_required
    def post(cls, list_id):
        current_user = get_jwt_identity()
        current_user.unlike_post(list_id)
        return {"message": gettext("user_unliked").format(user_id)}, 200

class SignUpEvent(Resource):
    @classmethod
    @jwt_refresh_token_required
    def post(cls, event_id):
        current_user = get_jwt_identity()
        current_user.sign_up_event(event_id)
        return {"message": gettext("user_signed_up").format(user_id)}, 200

class UndoSignUpEvent(Resource):
    @classmethod
    @jwt_refresh_token_required
    def post(cls, event_id):
        current_user = get_jwt_identity()
        current_user.undo_sign_up(event_id)
        return {"message": gettext("user_undo_sign_up").format(user_id)}, 200

class ListByMember(Resource):
    @classmethod
    def get(cls, user_id):
        user = UserModel.query.filter_by(id=user_id).first()
        return {"lists": user_list_schema.dump(user.lists)}, 200



