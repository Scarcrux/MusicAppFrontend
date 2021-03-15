from libs.strings import gettext
from models.comment import CommentModel

comment_schema = CommentSchema()
comment_list_schema = CommentSchema(many=True)

class Comment(Resource):

    @classmethod
    @fresh_jwt_required
    def post(cls, content: str, user_id: int, list_id: int ):

        comment_json = request.get_json()
        comment_json ["content"] = content
        comment_json["user_id"] = user_id
        comment_json["list_id"] = list_id

        comment = comment_schema.load(comment_json)

        try:
            comment.save_to_db()
        except:
            return {"message": gettext("comment_error_inserting")}, 500

        return comment_schema.dump(comment), 201

class CommentsByList(Resource):
    @classmethod
    def get(cls, list_id):
        return {"comments": comment_list_schema.dump(ListModel.query.filter_by(id = list_id).comments)}, 200
