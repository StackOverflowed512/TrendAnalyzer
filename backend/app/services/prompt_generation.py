import logging
import json
from typing import Dict, Any
from app.providers.factory import get_ai_provider

logger = logging.getLogger(__name__)


class PromptGenerationService:
    def __init__(self):
        self.provider = get_ai_provider()
        self.prompt_schema = {
            "title": "string",
            "topic": "string",
            "hook": "string",
            "scene_timeline": ["string"],
            "voiceover": "string",
            "captions": "string",
            "editing_style": "string",
            "camera_angles": "string",
            "transitions": "string",
            "music_mood": "string",
            "cta": "string",
            "hashtags": ["string"],
        }

    def generate(
        self, template: Dict[str, Any], trending_video: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Generates an original video prompt based on a viral template and a trending video's data.
        """
        video_title = trending_video.get("title", "Unknown Title")
        video_desc = trending_video.get("description", "")
        logger.info(f"Generating prompt for trending video: {video_title}")

        prompt = f"""
        Using the following proven viral template structure, generate an ORIGINAL short-form video concept.
        The concept should be inspired by this trending video:
        Title: {video_title}
        Description: {video_desc}
        
        NEVER copy existing copyrighted content. Produce an entirely new script and concept.
        
        Template Structure:
        {json.dumps(template)}
        """

        response_json = self.provider.generate_json(prompt, schema=self.prompt_schema)
        try:
            return json.loads(response_json)
        except json.JSONDecodeError:
            logger.error("Failed to parse prompt JSON")
            return {}
