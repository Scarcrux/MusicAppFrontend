from libs.strings import gettext
from models.list import ListModel
from models.user import UserModel
from models.listlike import ListLikeModel
from schemas.list import ListSchema
from schemas.song import SongSchema
from schemas.user import UserSchema
from flask_restful import Resource
from flask import request
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_refresh_token_required,
    get_jwt_identity,
    jwt_required,
    get_raw_jwt,
)

list_schema = ListSchema()
list_list_schema = ListSchema(many=True)

song_schema = SongSchema()

user_schema = UserSchema(many=True)

class List(Resource):

    @classmethod
    @jwt_required
    def post(cls):
        list_json = request.get_json()
        list = list_schema.load(list_json)

        try:
            list.save_to_db()
            return {"message": gettext("list_song_inserting_success")}, 200
        except:
            return {"message": gettext("list_error_inserting")}, 500   
    
class ListsList(Resource):
    @classmethod
    def get(cls):
        return {"lists": list_list_schema.dump(ListModel.find_all())}, 200

class GetList(Resource):
    @classmethod
    def get(cls, id):
        return list_schema.dump(ListModel.find_by_id(id)), 200

class GetUserLike(Resource):
    @classmethod
    def get(cls, list_id):
        likes = ListLikeModel.query.filter_by(list_id=list_id).all()
        users = []
        for like in likes:
            user_id = like.user_id
            user = UserModel.find_by_id(user_id)
            users.append(user)
        return user_schema.dump(users), 200
        