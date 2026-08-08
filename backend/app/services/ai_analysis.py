import json
import logging
from typing import Dict, Any, List
from app.providers.factory import get_ai_provider

logger = logging.getLogger(__name__)

class AIAnalysisService:
    def __init__(self):
        self.provider = get_ai_provider()
        
        self.analysis_schema = {
            "topic": "string",
            "hook": "string",
            "duration": "number",
            "emotion": "string",
            "story_structure": ["string"],
            "editing_style": "string",
            "caption_style": "string",
            "camera_style": "string",
            "music_style": "string",
            "target_audience": "string",
            "cta": "string",
            "viral_reasons": ["string"],
            "difficulty": "string",
            "content_category": "string"
        }

    def analyze_reel(
        self,
        title: str,
        description: str,
        transcript: str,
        ocr_text: List[Dict[str, Any]],
        metadata: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Analyzes a reel's components to extract viral patterns."""
        logger.info(f"Analyzing reel: {title}")
        
        prompt = f"""
        Analyze this short-form video (reel) to extract its viral characteristics.
        
        Title: {title}
        Description: {description}
        Metadata: {json.dumps(metadata)}
        
        Transcript:
        {transcript}
        
        OCR Text from Keyframes:
        {json.dumps(ocr_text)}
        
        Provide a detailed breakdown of why this video works and its structural patterns.
        """
        
        response_json = self.provider.generate_json(prompt, schema=self.analysis_schema)
        try:
            return json.loads(response_json)
        except json.JSONDecodeError:
            logger.error("Failed to parse AI response as JSON")
            return {}
