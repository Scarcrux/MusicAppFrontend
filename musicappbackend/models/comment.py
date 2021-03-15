from db import db

class CommentModel(db.Model):
    __tablename__ = "comment"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(80), nullable=False)

    #each comment belongs to one list, each list can have multiple comments.(One-To-Many Relationship)
    list_id = db.Column(db.Integer, db.ForeignKey('list.id'),
        nullable=False)

    #each comment belongs to one user, each user can have multiple comments.(One-To-Many Relationship)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
        nullable=False)

    @classmethod
    def find_by_id(cls, _id: int) -> "CommentModel":
        return cls.query.filter_by(id=_id).first()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
