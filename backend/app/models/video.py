from sqlalchemy import Column, Integer, String, Float, DateTime, Text, JSON
from sqlalchemy.sql import func
from app.database.session import Base

class Video(Base):
    __tablename__ = "videos"

    id = Column(Integer, primary_key=True, index=True)
    platform = Column(String, index=True)
    url = Column(String, unique=True, index=True)
    title = Column(String)
    description = Column(Text)
    views = Column(Integer, default=0)
    likes = Column(Integer, default=0)
    comments = Column(Integer, default=0)
    engagement = Column(Float, default=0.0)
    published = Column(DateTime)
    thumbnail = Column(String)
    video_path = Column(String)
    analysis_json = Column(JSON, nullable=True)
    trend_score = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
