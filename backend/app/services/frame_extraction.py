import cv2
import os
import logging
from typing import List, Dict, Any
from app.config.settings import settings

logger = logging.getLogger(__name__)

class FrameExtractionService:
    def __init__(self):
        self.output_dir = settings.FRAMES_DIR

    def extract_frames(self, video_path: str, interval_seconds: int = 1) -> List[str]:
        """
        Extract frames from a video at the specified interval.
        Returns a list of paths to the extracted frames.
        """
        logger.info(f"Extracting frames from {video_path}")
        
        if not os.path.exists(video_path):
            raise FileNotFoundError(f"Video not found at {video_path}")
            
        video_id = os.path.splitext(os.path.basename(video_path))[0]
        video_frame_dir = os.path.join(self.output_dir, video_id)
        os.makedirs(video_frame_dir, exist_ok=True)
        
        cap = cv2.VideoCapture(video_path)
        if not cap.isOpened():
            raise Exception("Error opening video stream or file")
            
        fps = int(cap.get(cv2.CAP_PROP_FPS))
        if fps <= 0:
            fps = 30 # Default fallback
            
        frame_interval = fps * interval_seconds
        
        extracted_frames = []
        frame_count = 0
        saved_count = 0
        
        while True:
            ret, frame = cap.read()
            if not ret:
                break
                
            if frame_count % frame_interval == 0:
                frame_name = f"frame_{saved_count:04d}.jpg"
                frame_path = os.path.join(video_frame_dir, frame_name)
                cv2.imwrite(frame_path, frame)
                extracted_frames.append(frame_path)
                saved_count += 1
                
            frame_count += 1
            
        cap.release()
        logger.info(f"Extracted {len(extracted_frames)} frames.")
        return extracted_frames
