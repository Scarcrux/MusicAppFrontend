from db import db
from models.event import EventModel

class AddressModel(db.Model):
    __tablename__ = "address"
    id = db.Column(db.Integer, primary_key=True)
    streetName = db.Column(db.String(80), nullable=False)
    city = db.Column(db.String(80), nullable=False)
    state = db.Column(db.String(80), nullable=False)
    zip = db.Column(db.Integer, nullable=False)

    #each event takes part in one address. each address can hold multiple events at different times.(One-to-Many Relationship)
    events = db.relationship('EventModel', backref='address', lazy=True)
    #one user has one address, each address belongs to one user(One-to-One Relationship)
    user_id =  db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    @classmethod
    def find_by_id(cls, _id: int) -> "AddressModel":
        return cls.query.filter_by(id=_id).first()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()