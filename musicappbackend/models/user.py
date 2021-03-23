from requests import Response
from flask import request, url_for
from models.address import AddressModel
from models.comment import CommentModel
from models.event import EventModel
from models.list import ListModel
from models.listlike import ListLikeModel
from models.userevent import UserEventModel
from models.song import SongModel
from werkzeug.security import check_password_hash

from db import db

class UserModel(db.Model):
    __tablename__ = "user" 

    id = db.Column(db.Integer, primary_key=True)
    isVerified = db.Column(db.Boolean, nullable=False, default=False)
    username = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(80), nullable=False, unique=True)
    bio = db.Column(db.String(200))
    
    #one user has one address, each address belongs to one user(One-to-One Relationship)
    address_id = db.Column(db.Integer, db.ForeignKey('address.id'),
        nullable=False)

    #one user has many lists, each list belongs to one user(One-to-Many Relationship)
    lists = db.relationship(
        "ListModel", backref='user', lazy=True, cascade="all, delete-orphan"
    )

    #one user has many comments, each comment belongs to one user(One-to-Many Relationship)
    comments = db.relationship(
        "CommentModel", backref='user', lazy=True, cascade="all, delete-orphan"
    )

    #one user takes part in many events, each event accommodates many users(Many-to-Many Relationship) 
    events = db.relationship(
        'UserEventModel', backref='user', lazy='dynamic'
    )

    #each listlike consists of a pair of user_id and list_id. each user can like multiple lists(Many-to-Many Relationship)
    likes = db.relationship(
        'ListLikeModel', backref='user', lazy='dynamic')

    @classmethod
    def find_by_username(cls, username: str) -> "UserModel":
        return cls.query.filter_by(username=username).first()

    @classmethod
    def find_by_email(cls, email: str) -> "UserModel":
        return cls.query.filter_by(email=email).first()

    @classmethod
    def find_by_id(cls, _id: int) -> "UserModel":
        return cls.query.filter_by(id=_id).first()

    def verify_hash(self,password):
        return check_password_hash(self.password,password)

    def sign_up_event(clf, event_id):
        if not self.has_signed_up_event(event_id):
            signup = UserEventModel(user_id=self.id, event_id=event_id)
            signup.save_to_db()
    
    def undo_sign_up(self, event_id):
        if self.has_signed_up_event(event_id):
            UserEventModel.query.filter_by(
                user_id=self.id,
                event_id=event_id).delete_from_db()

    def has_signed_up_event(self, event_id):
        return UserEventModel.query.filter(
            UserEventModel.user_id == self.id,
            UserEventModel.event_id == event_id).count() > 0

    def like_list(self, list_id):
        if not self.has_liked_list(list_id):
            like = ListLikeModel(user_id=self.id, list_id=list_id)
            like.save_to_db()

    def unlike_list(self, list_id):
        if self.has_liked_list(list_id):
            ListLikeModel.query.filter_by(
                user_id=self.id,
                list_id=list_id).first().delete_from_db()

    def has_liked_list(self, list_id):
        return ListLikeModel.query.filter(
            ListLikeModel.user_id == self.id,
            ListLikeModel.list_id == list_id).count() > 0

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
