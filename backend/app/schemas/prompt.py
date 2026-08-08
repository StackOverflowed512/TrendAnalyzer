from pydantic import BaseModel
from typing import Dict, Any, List

class PromptGenerationRequest(BaseModel):
    topic: str
    
class PromptResponse(BaseModel):
    id: int
    video_id: int
    generated_prompt: Dict[str, Any]
    storyboard: Dict[str, Any]

    class Config:
        from_attributes = True

class StoryboardResponse(BaseModel):
    scenes: List[Dict[str, Any]]
