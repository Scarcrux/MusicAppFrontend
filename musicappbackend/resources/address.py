from libs.strings import gettext
from models.address import AddressModel
from schemas.address import AddressSchema
from flask_restful import Resource
from flask import request

address_schema = AddressSchema()

class Address(Resource):

    @classmethod
    def post(cls):
        address_json = request.get_json()

        streetName = address_json["streetName"]
        city = address_json["city"]
        state = address_json["state"] 
        zip = address_json["zip"]

        print(streetName)

        if AddressModel.query.filter_by(streetName=streetName, city=city, state=state, zip=zip).first():
            return {"message": gettext("address_exists")}, 400

        address = address_schema.load(address_json)

        address.save_to_db()

        try:
            address.save_to_db()
        except:
            return {"message": gettext("address_error_inserting")}, 500

        return address_schema.dump(address), 201

