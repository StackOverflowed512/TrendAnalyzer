import logging
from typing import List, Dict, Any
import httpx
from app.config.settings import settings

logger = logging.getLogger(__name__)

class TrendDiscoveryService:
    def discover_youtube_trends(self, keyword: str = "", max_results: int = 50) -> List[Dict[str, Any]]:
        logger.info(f"Discovering YouTube trends")
        
        if not settings.YOUTUBE_API_KEY:
            logger.error("YOUTUBE_API_KEY is not set.")
            return []
            
        url = "https://www.googleapis.com/youtube/v3/videos"
        params = {
            "part": "snippet,statistics",
            "chart": "mostPopular",
            "regionCode": "US",
            "maxResults": max_results,
            "key": settings.YOUTUBE_API_KEY
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
                    video_id = item_id.get("videoId") if isinstance(item_id, dict) else item_id

                    trends.append({
                        "id": video_id,
                        "title": snippet.get("title"),
                        "description": snippet.get("description"),
                        "channelTitle": snippet.get("channelTitle"),
                        "viewCount": stats.get("viewCount", "0"),
                        "likeCount": stats.get("likeCount", "0"),
                        "publishedAt": snippet.get("publishedAt"),
                        "platform": "youtube"
                    })
                return trends
        except Exception as e:
            logger.error(f"Error fetching YouTube trends: {e}")
            return []

    def discover_reddit_trends(self, subreddit: str = "tiktokcringe", limit: int = 10) -> List[Dict[str, Any]]:
        logger.info(f"Discovering Reddit trends for {subreddit}")
        
        url = f"https://www.reddit.com/r/{subreddit}/hot.json"
        params = {"limit": limit}
        headers = {"User-Agent": "ViralReelIntelligence/1.0"}
        
        try:
            with httpx.Client() as client:
                response = client.get(url, params=params, headers=headers)
                response.raise_for_status()
                data = response.json()
                
                trends = []
                for child in data.get("data", {}).get("children", []):
                    post = child.get("data", {})
                    if post.get("is_video") or "v.redd.it" in post.get("url", ""):
                        trends.append({
                            "id": post.get("id"),
                            "title": post.get("title"),
                            "description": post.get("selftext"),
                            "author": post.get("author"),
                            "score": post.get("score"),
                            "url": post.get("url"),
                            "platform": "reddit"
                        })
                return trends
        except Exception as e:
            logger.error(f"Error fetching Reddit trends: {e}")
            return []

    def discover(self) -> List[Dict[str, Any]]:
        yt_trends = self.discover_youtube_trends(max_results=50)
        reddit_trends = self.discover_reddit_trends(limit=25)
        return yt_trends + reddit_trends
