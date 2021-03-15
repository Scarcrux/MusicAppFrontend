from db import db

class ListLikeModel(db.Model):
    __tablename__ = "listlike"
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    list_id = db.Column(db.Integer, db.ForeignKey('list.id'))

    @classmethod
    def find_by_id(cls, _id: int) -> "ListLikeModel":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def count_likes_by_list(cls, list_id: int) -> "ListLikeModel":
        return cls.query.filter_by(list_id=list_id).count()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
