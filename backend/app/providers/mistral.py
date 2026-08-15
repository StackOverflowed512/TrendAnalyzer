import logging
from typing import Dict, Any
import json
import requests
from app.config.settings import settings
from app.providers.base import AIProvider

logger = logging.getLogger(__name__)

class MistralProvider(AIProvider):
    def __init__(self):
        self.api_key = settings.MISTRAL_API_KEY
        self.model = "mistral-small-latest"
        self.api_url = "https://api.mistral.ai/v1/chat/completions"
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

    def analyze(self, prompt: str) -> str:
        payload = {
            "model": self.model,
            "messages": [{"role": "user", "content": prompt}]
        }
        response = requests.post(self.api_url, headers=self.headers, json=payload)
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]

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
            prompt += f"\n\nReturn ONLY valid JSON matching this schema:\n{json.dumps(schema, indent=2)}"

        payload = {
            "model": self.model,
            "messages": [{"role": "user", "content": prompt}],
            "response_format": {"type": "json_object"}
        }
        response = requests.post(self.api_url, headers=self.headers, json=payload)
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]
