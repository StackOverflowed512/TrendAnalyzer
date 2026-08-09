from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config.settings import settings

# Force SQLite for local development to bypass any PostgreSQL environment variables
LOCAL_DB_URL = "sqlite:///./viral_reel.db"

engine_kwargs = {"pool_pre_ping": True, "connect_args": {"check_same_thread": False}}
engine = create_engine(LOCAL_DB_URL, **engine_kwargs)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
