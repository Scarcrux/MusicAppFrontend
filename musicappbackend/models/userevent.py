from db import db

class UserEventModel(db.Model):
    __tablename__ = "userevent"
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key = True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), primary_key = True)
    
    @classmethod
    def find_by_id(cls, _id: int) -> "UserEventModel":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def count_users_by_event(cls, event_id: int) -> int:
        return cls.query.filter_by(event_id=event_id).count()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
