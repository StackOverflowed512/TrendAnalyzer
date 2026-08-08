from abc import ABC, abstractmethod
from typing import Dict, Any

class AIProvider(ABC):
    @abstractmethod
    def analyze(self, prompt: str) -> str:
        pass
        
    @abstractmethod
    def summarize(self, text: str) -> str:
        pass
        
    @abstractmethod
    def generate_prompt(self, context: str) -> str:
        pass
        
    @abstractmethod
    def generate_storyboard(self, context: str) -> str:
        pass
        
    @abstractmethod
    def generate_json(self, prompt: str, schema: Dict[str, Any] = None) -> str:
        pass
