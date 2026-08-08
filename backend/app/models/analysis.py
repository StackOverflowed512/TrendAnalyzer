from sqlalchemy import Column, Integer, String, Text, ForeignKey, JSON
from app.database.session import Base

class Analysis(Base):
    __tablename__ = "analysis"

    id = Column(Integer, primary_key=True, index=True)
    video_id = Column(Integer, ForeignKey("videos.id"))
    hook = Column(String)
    emotion = Column(String)
    editing = Column(String)
    captions = Column(String)
    camera = Column(String)
    music = Column(String)
    cta = Column(String)
    topic = Column(String)
