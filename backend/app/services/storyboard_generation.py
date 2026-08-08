import logging
import json
from typing import Dict, Any, List
from app.providers.factory import get_ai_provider

logger = logging.getLogger(__name__)

class StoryboardGenerationService:
    def __init__(self):
        self.provider = get_ai_provider()
        self.storyboard_schema = {
            "scenes": [
                {
                    "scene_number": "number",
                    "duration": "number",
                    "visual": "string",
                    "caption": "string",
                    "voice": "string",
                    "transition": "string"
                }
            ]
        }

    def generate(self, prompt_data: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Generates a scene-by-scene storyboard from a generated video prompt.
        """
        logger.info(f"Generating storyboard for prompt: {prompt_data.get('title')}")
        
        prompt = f"""
        Based on the following video concept and script, generate a detailed scene-by-scene storyboard.
        
        Concept:
        {json.dumps(prompt_data)}
        """
        
        response_json = self.provider.generate_json(prompt, schema=self.storyboard_schema)
        try:
            data = json.loads(response_json)
            return data.get("scenes", [])
        except json.JSONDecodeError:
            logger.error("Failed to parse storyboard JSON")
            return []
