from ma import ma
from marshmallow import pre_dump
from models.user import UserModel
from schemas.comment import CommentSchema
from schemas.event import EventSchema
from schemas.list import ListSchema
from marshmallow_sqlalchemy import ModelSchema

class UserSchema(ma.SQLAlchemyAutoSchema):

    lists = ma.Nested('ListSchema', many=True)
    comments = ma.Nested('CommentSchema', many=True)
    events = ma.Nested('EventSchema', many=True)
    
    class Meta:
        model = UserModel
        load_only = ("password",)
        dump_only = ("id",  )
        include_fk = True
        load_instance = True
