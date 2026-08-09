import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "Viral Reel Intelligence"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./viral_reel.db")
    AI_PROVIDER: str = os.getenv("AI_PROVIDER", "MistralProvider")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    MISTRAL_API_KEY: str = os.getenv("MISTRAL_API_KEY", "")
    YOUTUBE_API_KEY: str = os.getenv("YOUTUBE_API_KEY", "")

    # Storage Settings
    STORAGE_DIR: str = os.getenv("STORAGE_DIR", "./storage")
    VIDEOS_DIR: str = os.path.join(STORAGE_DIR, "videos")
    FRAMES_DIR: str = os.path.join(STORAGE_DIR, "frames")

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

# Ensure directories exist
os.makedirs(settings.VIDEOS_DIR, exist_ok=True)
os.makedirs(settings.FRAMES_DIR, exist_ok=True)
