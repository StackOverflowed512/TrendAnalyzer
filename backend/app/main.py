from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
from contextlib import asynccontextmanager

from app.api.endpoints import router as api_router
from app.config.settings import settings
from app.workers.scheduler import start_scheduler, stop_scheduler
from app.database.session import engine, Base
import app.models  # Ensures models are imported for create_all

# Create tables automatically for local development
Base.metadata.create_all(bind=engine)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting up Viral Reel Intelligence API...")
    start_scheduler()
    yield
    logger.info("Shutting down...")
    stop_scheduler()

app = FastAPI(
    title=settings.PROJECT_NAME,
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

@app.get("/")
def root():
    return {"message": f"Welcome to {settings.PROJECT_NAME} API"}
