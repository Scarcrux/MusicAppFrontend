from libs.strings import gettext
from models.address import AddressModel

address_schema = AddressSchema()

class Address(Resource):

    @classmethod
    @fresh_jwt_required
    def post(cls, street_name: str, city: str, state: str, zip: int ):
        if AddressModel.query.filter_by(street_name=street_name, city=city, state=state, zip=zip):
            return {"message": gettext("address_exists")}, 400

        address_json = request.get_json()
        address_json["street_name"] = street_name
        address_json["city"] = city
        address_json["state"] = state
        address_json["zip"] = zip

        address = address_schema.load(address_json)

        try:
            address.save_to_db()
        except:
            return {"message": gettext("address_error_inserting")}, 500

        return address_schema.dump(address), 201

