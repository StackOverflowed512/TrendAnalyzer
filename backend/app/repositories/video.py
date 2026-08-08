from sqlalchemy.orm import Session
from app.models.video import Video
from app.repositories.base import CRUDBase
from typing import Optional

class CRUDVideo(CRUDBase[Video]):
    def get_by_url(self, db: Session, *, url: str) -> Optional[Video]:
        return db.query(Video).filter(Video.url == url).first()
        
    def get_top_trending(self, db: Session, limit: int = 10):
        return db.query(Video).order_by(Video.trend_score.desc()).limit(limit).all()

video_repo = CRUDVideo(Video)
