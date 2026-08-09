from sqlalchemy import Column, Integer, Text, ForeignKey, JSON
from app.database.session import Base


class Prompt(Base):
    __tablename__ = "prompts"

    id = Column(Integer, primary_key=True, index=True)
    video_id = Column(Integer, ForeignKey("videos.id"))
    generated_prompt = Column(JSON)
    storyboard = Column(JSON)
