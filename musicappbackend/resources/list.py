from libs.strings import gettext
from models.list import ListModel

list_schema = ListSchema()
list_list_schema = ListSchema(many=True)

class List(Resource):

    @classmethod
    @fresh_jwt_required
    def post(cls, title: str, category: str):

        list_json = request.get_json()
        list_json["title"] = title
        list_json["category"] = category

        list = list_schema.load(list_json)

        try:
            list.save_to_db()
        except:
            return {"message": gettext("list_error_inserting")}, 500

        return list_schema.dump(list), 201

class ListsList(Resource):
    @classmethod
    def get(cls):
        return {"lists": list_list_schema.dump(ListModel.find_all())}, 200

class AddSongs(Resource):
    @classmethod
    def post(cls, list_id):
        list = ListModel.query.filter_by(id=list_id).first()
        data = request.get_json()
        for _id in data["song_ids"]:
            song = SongModel.find_by_id(id = _id)
            if not song:
                return {"message": gettext("list_song_by_id_not_found").format(_id)}, 404
            songlist = SongListModel(list_id=list.id, song_id=_id)
            songlist.save_to_db()
        return {"message": gettext("list_song_inserting_success")}, 200

