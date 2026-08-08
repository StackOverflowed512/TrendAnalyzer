from pydantic import BaseModel, HttpUrl
from typing import Optional, Dict, Any, List
from datetime import datetime

class VideoBase(BaseModel):
    url: HttpUrl
    platform: str
    title: Optional[str] = None
    description: Optional[str] = None
    thumbnail: Optional[str] = None
    views: int = 0
    likes: int = 0
    comments: int = 0

class VideoCreate(VideoBase):
    pass

class Video(VideoBase):
    id: int
    engagement: float
    trend_score: float
    published: Optional[datetime] = None
    video_path: Optional[str] = None
    analysis_json: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True

class TrendDiscoverResponse(BaseModel):
    trends: List[Dict[str, Any]]
