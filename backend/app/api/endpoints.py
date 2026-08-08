from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import List, Dict, Any

from app.database.session import get_db
from app.repositories.video import video_repo
from app.schemas.video import VideoCreate, Video, TrendDiscoverResponse
from app.schemas.prompt import PromptGenerationRequest, PromptResponse, StoryboardResponse
from app.services.trend_discovery import TrendDiscoveryService
from app.services.video_download import VideoDownloadService
from app.services.frame_extraction import FrameExtractionService
from app.services.ocr_extraction import OCRExtractionService
from app.services.transcript_extraction import TranscriptExtractionService
from app.services.ai_analysis import AIAnalysisService
from app.services.prompt_generation import PromptGenerationService
from app.services.storyboard_generation import StoryboardGenerationService
from app.services.metadata_collection import MetadataCollectionService

router = APIRouter()

@router.post("/discover", response_model=TrendDiscoverResponse)
def discover_trends():
    service = TrendDiscoveryService()
    trends = service.discover()
    return {"trends": trends}

class TrendSaveRequest(BaseModel):
    id: str
    title: str
    description: str
    platform: str
    viewCount: str = "0"
    likeCount: str = "0"

@router.post("/videos/save-trend")
def save_trend(trend: TrendSaveRequest, db: Session = Depends(get_db)):
    # Construct a URL for VideoCreate
    if trend.platform == "youtube":
        url = f"https://youtube.com/watch?v={trend.id}"
    elif trend.platform == "reddit":
        url = f"https://reddit.com{trend.id}" if trend.id.startswith("/") else f"https://reddit.com/{trend.id}"
    else:
        url = f"https://example.com/{trend.id}"

    # Check if video already exists by URL
    existing = db.query(video_repo.model).filter(video_repo.model.url == url).first()
    if existing:
        return {"status": "success", "video_id": existing.id}

    video_in = VideoCreate(
        url=url,
        platform=trend.platform,
        title=trend.title,
        description=trend.description,
        views=int(trend.viewCount) if trend.viewCount.isdigit() else 0,
        likes=int(trend.likeCount) if trend.likeCount.isdigit() else 0,
    )
    
    # The repository expects a dictionary, not a Pydantic model
    video_data = {
        "url": str(video_in.url),
        "platform": video_in.platform,
        "title": video_in.title,
        "description": video_in.description,
        "views": video_in.views,
        "likes": video_in.likes,
        "comments": video_in.comments,
    }
    video = video_repo.create(db, obj_in=video_data)
    
    # Inject mock analysis_json so the prompt generator has a template to work with
    mock_template = {
        "hook": "An attention-grabbing opening based on the video's premise.",
        "body": "The main content breakdown.",
        "cta": "Call to action for the viewer."
    }
    
    # We update it directly and commit
    video.analysis_json = mock_template
    video.trend_score = 90.0 # High score for being a trend
    db.commit()
    
    return {"status": "success", "video_id": video.id}

@router.post("/download")
def download_video(url: str, db: Session = Depends(get_db)):
    service = VideoDownloadService()
    video_path = service.download(url)
    # We would typically save this to the DB here
    return {"status": "success", "video_path": video_path}

@router.post("/analyze/{video_id}")
def analyze_video(video_id: int, db: Session = Depends(get_db)):
    # Mocking the pipeline execution for the endpoint
    video = video_repo.get(db, id=video_id)
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
        
    # In a real scenario, we would run these asynchronously via a task queue (e.g. Celery)
    # 1. Download
    # 2. Extract frames
    # 3. OCR
    # 4. Transcript
    # 5. Analyze
    
    return {"status": "success", "message": "Analysis started in background"}

@router.post("/generate-prompt/{video_id}")
def generate_prompt(video_id: int, request: PromptGenerationRequest, db: Session = Depends(get_db)):
    video = video_repo.get(db, id=video_id)
    if not video or not video.analysis_json:
        raise HTTPException(status_code=400, detail="Video not analyzed yet")
        
    service = PromptGenerationService()
    # Assuming video.analysis_json acts as our template structure for now
    trending_video_data = {
        "title": video.title,
        "description": video.description
    }
    prompt = service.generate(template=video.analysis_json, trending_video=trending_video_data)
    return {"status": "success", "prompt": prompt}

@router.post("/generate-storyboard/{video_id}", response_model=StoryboardResponse)
def generate_storyboard(video_id: int, db: Session = Depends(get_db)):
    # In real app, we fetch the generated prompt from DB
    service = StoryboardGenerationService()
    mock_prompt_data = {"title": "Test Title", "concept": "Test concept"}
    scenes = service.generate(mock_prompt_data)
    return {"scenes": scenes}

@router.get("/videos", response_model=List[Video])
def list_videos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return video_repo.get_multi(db, skip=skip, limit=limit)

@router.get("/videos/top", response_model=List[Video])
def get_top_videos(limit: int = 10, db: Session = Depends(get_db)):
    return video_repo.get_top_trending(db, limit=limit)

@router.get("/templates")
def get_templates(db: Session = Depends(get_db)):
    # Need template repo here
    return []

@router.get("/analytics")
def get_analytics(db: Session = Depends(get_db)):
    return {"total_videos": 0, "total_templates": 0}
