import google.generativeai as genai
import logging
from typing import Dict, Any
import json
from app.config.settings import settings
from app.providers.base import AIProvider

logger = logging.getLogger(__name__)

class GeminiProvider(AIProvider):
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-1.5-pro')
        
    def analyze(self, prompt: str) -> str:
        response = self.model.generate_content(prompt)
        return response.text
        
    def summarize(self, text: str) -> str:
        prompt = f"Summarize the following text:\n\n{text}"
        return self.analyze(prompt)
        
    def generate_prompt(self, context: str) -> str:
        prompt = f"Based on the following context, generate an ORIGINAL short-form video prompt. Do not recreate copyrighted content.\n\n{context}"
        return self.analyze(prompt)
        
    def generate_storyboard(self, context: str) -> str:
        prompt = f"Based on the following context, generate a scene-by-scene storyboard.\n\n{context}"
        return self.analyze(prompt)
        
    def generate_json(self, prompt: str, schema: Dict[str, Any] = None) -> str:
        if schema:
            prompt += f"\n\nReturn ONLY JSON matching this schema:\n{json.dumps(schema, indent=2)}"
        
        response = self.model.generate_content(
            prompt,
            generation_config=genai.GenerationConfig(
                response_mime_type="application/json",
            )
        )
        return response.text
