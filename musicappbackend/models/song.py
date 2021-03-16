from db import db

class SongModel(db.Model):
    __tablename__ = "song" 

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    artist = db.Column(db.String(80), nullable=False)

    #each song belongs to one list, and each list consists many songs(Many-to-Many Relationship)
    lists = db.relationship(
        'SongListModel', backref='song', lazy='dynamic')

    @classmethod
    def find_by_id(cls, _id: int) -> "SongModel":
        return cls.query.filter_by(id=_id).first()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
