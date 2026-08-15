import logging
from typing import List, Dict, Any
import httpx
from app.config.settings import settings

logger = logging.getLogger(__name__)


class TrendDiscoveryService:
    def discover_youtube_trends(
        self, keyword: str = "", max_results: int = 50
    ) -> List[Dict[str, Any]]:
        logger.info("Discovering YouTube trends")

        if not settings.YOUTUBE_API_KEY:
            logger.error("YOUTUBE_API_KEY is not set.")
            return []

        url = "https://www.googleapis.com/youtube/v3/videos"
        params = {
            "part": "snippet,statistics",
            "chart": "mostPopular",
            "regionCode": "US",
            "maxResults": max_results,
            "key": settings.YOUTUBE_API_KEY,
        }

        try:
            with httpx.Client() as client:
                response = client.get(url, params=params)
                response.raise_for_status()
                data = response.json()

                trends = []
                for item in data.get("items", []):
                    snippet = item.get("snippet", {})
                    stats = item.get("statistics", {})

                    item_id = item.get("id")
                    video_id = (
                        item_id.get("videoId") if isinstance(item_id, dict) else item_id
                    )

                    trends.append(
                        {
                            "id": video_id,
                            "title": snippet.get("title"),
                            "description": snippet.get("description"),
                            "channelTitle": snippet.get("channelTitle"),
                            "viewCount": stats.get("viewCount", "0"),
                            "likeCount": stats.get("likeCount", "0"),
                            "publishedAt": snippet.get("publishedAt"),
                            "platform": "youtube",
                        }
                    )
                return trends
        except Exception as e:
            logger.error(f"Error fetching YouTube trends: {e}")
            return []

    def discover(self) -> List[Dict[str, Any]]:
        yt_trends = self.discover_youtube_trends(max_results=50)
        return yt_trends
