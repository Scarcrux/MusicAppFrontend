from db import db
from models.listlike import ListLikeModel
from models.songlist import SongListModel

class ListModel(db.Model):
    __tablename__ = "list"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    category = db.Column(db.String(80))    

    #likelist table consists of pairs of user_id and list_id. Each pair is unique.(One-To-Many Relationship)
    db.relationship('ListLikeModel', backref='songlist', lazy='dynamic')
    
    #each list belongs to one user, one user can have multiple lists. (One-To-Many Relationship)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
        nullable=False)
    
    likes = db.relationship('ListLikeModel', backref='list', lazy='dynamic')

    songs = db.relationship(
        'SongListModel', backref='list', lazy='dynamic')


    @classmethod
    def find_by_id(cls, _id: int) -> "ListModel":
        return cls.query.filter_by(id=_id).first()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
