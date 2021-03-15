
song_schema = SongSchema()
song_list_schema = SongSchema(many=True)

class Song(Resource):

    @classmethod
    @fresh_jwt_required
    def post(cls, title: str, artist: str):
        if SongModel.query.filter_by(title=title, artist=artist)::
            return {"message": gettext("song_exists")}, 400

        song_json = request.get_json()
        song_json["title"] = title
        song_json["artist"] = artist

        song = song_schema.load(song_json)

        try:
            song.save_to_db()
        except:
            return {"message": gettext("song_error_inserting")}, 500

        return song_schema.dump(song), 201

    @classmethod
    @jwt_required
    def delete(cls, id:int):
        song = SongModel.find_by_id(id)
        if song:
            song.delete_from_db()
            return {"message": gettext("song_deleted")}, 200

        return {"message": gettext("song_not_found")}, 404

    @classmethod
    def put(cls, title: id, artist:str):
        song_json = request.get_json()
        song = songModel.find_by_id(id)
        
        song_json = request.get_json()
        song_json["title"] = title
        song_json["artist"] = artist

        song = song_schema.load(song_json)
        
        song.save_to_db()

        return song_schema.dump(song), 200

class SongList(Resource):
    @classmethod
    def get(cls):
        return {"songs": song_list_schema.dump(SongModel.find_all())}, 200

class SongsInList(Resource):
    @classmethod
    def get(cls, list_id):
        list = ListModel.query.filter_by(id=list_id).first()
        return {"songs": song_list_schema.dump(list.songs)}, 200
