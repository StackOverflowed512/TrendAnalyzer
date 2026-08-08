import logging
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
from app.services.trend_discovery import TrendDiscoveryService

logger = logging.getLogger(__name__)
scheduler = BackgroundScheduler()

def discover_job():
    logger.info("Running background trend discovery job...")
    service = TrendDiscoveryService()
    trends = service.discover()
    logger.info(f"Discovered {len(trends)} trends in background job.")
    # Here you would typically save them to DB using a repository

def start_scheduler():
    logger.info("Starting background scheduler...")
    scheduler.add_job(
        discover_job,
        trigger=IntervalTrigger(hours=1),
        id="trend_discovery_job",
        name="Discover trending reels hourly",
        replace_existing=True
    )
    scheduler.start()
    
def stop_scheduler():
    logger.info("Stopping background scheduler...")
    scheduler.shutdown()
