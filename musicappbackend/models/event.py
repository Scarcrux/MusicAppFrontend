from db import db
from models.userevent import UserEventModel

class EventModel(db.Model):
    __tablename__ = "event"

    id = db.Column(db.Integer, primary_key=True)
    headline = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(80), nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    #each event takes part in one address. each address can hold multiple events at different times.(One-to-Many Relationship)
    address_id = db.Column(db.Integer, db.ForeignKey('address.id'),
        nullable=False)

    users = db.relationship(
        'UserEventModel', backref='event', lazy='dynamic'
    )

    @classmethod
    def find_by_id(cls, _id: int) -> "EventModel":
        return cls.query.filter_by(id=_id).first()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()