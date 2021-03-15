from ma import ma
from models.listlike import ListLikeModel
from marshmallow_sqlalchemy import ModelSchema

class ListLikeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ListLikeModel
        dump_only = ("id",)
        include_fk = True