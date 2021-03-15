from libs.strings import gettext
import datetime
from models.event import EventModel
from models.user import UserModel

event_schema = EventSchema()
event_list_schema = EventSchema(many=True)

class Event(Resource):

    @classmethod
    @fresh_jwt_required
    def post(cls, description: str, headline: str, address_id: int, date: datetime ):

        event_json = request.get_json()
        event_json["description"] = description
        event_json["headline"] = headline
        event_json["address_id"] = address_id
        event_json["date"]=date

        if EventModel.query.filter_by(description=description, headline=headline, address_id=address_id,
        date=date):
            return {"message": gettext("event_exists")}, 400

        event = event_schema.load(event_json)

        try:
            event.save_to_db()
        except:
            return {"message": gettext("event_error_inserting")}, 500

        return event_schema.dump(event), 201

class EventsList(Resource):
    @classmethod
    def get(cls):
        return {"events": event_list_schema.dump(EventModel.find_all())}, 200

class ParticipatorsList(Resource):
    @classmethod
    def get(cls, event_id):
        event = EventModel.query.filter_by(id=event_id).first()
        return {"participators": event_list_schema.dump(event.users)}, 200