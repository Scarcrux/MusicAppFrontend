from ma import ma
from models.address import AddressModel
from marshmallow_sqlalchemy import ModelSchema

class AddressSchema(ma.SQLAlchemyAutoSchema):
    
    events = ma.Nested('EventSchema', many=True, exclude=('event', ))

    class Meta:
        model = AddressModel
        dump_only = ("id",)
        include_fk = True