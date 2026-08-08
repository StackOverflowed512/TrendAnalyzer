import yt_dlp
import os
import logging
from app.config.settings import settings

logger = logging.getLogger(__name__)

class VideoDownloadService:
    def __init__(self):
        self.download_path = settings.VIDEOS_DIR

    def download(self, url: str) -> str:
        logger.info(f"Downloading video from {url}")
        
        ydl_opts = {
            'outtmpl': os.path.join(self.download_path, '%(id)s.%(ext)s'),
            'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
            'quiet': True,
            'no_warnings': True,
        }
        
        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)
                video_path = ydl.prepare_filename(info)
                return video_path
        except Exception as e:
            logger.error(f"Error downloading video: {e}")
            raise
