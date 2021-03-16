from ma import ma
from models.comment import CommentModel
from marshmallow_sqlalchemy import ModelSchema

class CommentSchema(ma.SQLAlchemyAutoSchema):
    
    class Meta:
        model = CommentModel
        dump_only = ("id",)
        include_fk = True
        load_instance = True