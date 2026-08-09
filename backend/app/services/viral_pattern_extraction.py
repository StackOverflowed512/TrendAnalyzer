import logging
from typing import Dict, Any, List
from app.providers.factory import get_ai_provider

logger = logging.getLogger(__name__)


class ViralPatternExtractionService:
    def __init__(self):
        self.provider = get_ai_provider()
        self.template_schema = {
            "template_name": "string",
            "structure": ["string"],
            "description": "string",
            "category": "string",
        }

    def extract_pattern(self, analyses: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Compare analyzed reels, cluster similar structures, and generate reusable templates.
        """
        logger.info("Extracting viral pattern from analyses")

        prompt = f"""
        Analyze the following viral video breakdowns and extract a generalized, reusable content template.
        The template should capture the core storytelling structure, hook type, and pacing, but NOT the specific topic.
        
        Analyses:
        {analyses}
        """

        response_json = self.provider.generate_json(prompt, schema=self.template_schema)
        import json

        try:
            return json.loads(response_json)
        except json.JSONDecodeError:
            logger.error("Failed to parse pattern extraction JSON")
            return {}
