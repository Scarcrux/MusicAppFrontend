from ma import ma
from models.song import SongModel
from marshmallow_sqlalchemy import ModelSchema

class SongSchema(ma.SQLAlchemyAutoSchema):
    
    lists = ma.Nested('ListSchema', many=True)
    
    class Meta:
        model = SongModel
        dump_only = ("id",)
        include_fk = True
        load_instance = True
