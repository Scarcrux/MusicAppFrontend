from ma import ma
from marshmallow import pre_dump
from models.user import UserModel
from marshmallow_sqlalchemy import ModelSchema

class UserSchema(ma.SQLAlchemyAutoSchema):

    lists = ma.Nested('ListSchema', many=True, exclude=('user', ))
    comments = ma.Nested('CommentSchema', many=True, exclude=('user', ))
    events = ma.Nested('EventSchema', many=True)
    
    class Meta:
        model = UserModel
        load_only = ("password",)
        dump_only = ("id",  )
