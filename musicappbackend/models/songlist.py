from db import db

class SongListModel(db.Model):
    __tablename__ = "songlist"
    
    id = db.Column(db.Integer, primary_key=True)
    song_id = db.Column(db.Integer, db.ForeignKey('song.id'), primary_key = True)
    list_id = db.Column(db.Integer, db.ForeignKey('list.id'), primary_key = True)
    
    @classmethod
    def find_by_id(cls, _id: int) -> "SongListModel":
        return cls.query.filter_by(id=_id).first()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
