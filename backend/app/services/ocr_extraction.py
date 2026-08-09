import easyocr
import logging
from typing import List, Dict, Any
import os

logger = logging.getLogger(__name__)


class OCRExtractionService:
    def __init__(self):
        # Force CPU mode since user has no GPU
        logger.info("Initializing EasyOCR with CPU mode")
        self.reader = easyocr.Reader(["en"], gpu=False)

    def extract_text(self, frame_paths: List[str]) -> List[Dict[str, Any]]:
        """
        Extract text from a list of frame images.
        """
        logger.info(f"Extracting OCR text from {len(frame_paths)} frames.")
        results = []

        for i, frame_path in enumerate(frame_paths):
            if not os.path.exists(frame_path):
                continue

            try:
                # detail=0 returns just the text, detail=1 returns bounding boxes
                ocr_results = self.reader.readtext(frame_path, detail=0)
                if ocr_results:
                    text = " ".join(ocr_results)
                    results.append(
                        {"frame_index": i, "frame_path": frame_path, "text": text}
                    )
            except Exception as e:
                logger.error(f"Error extracting text from {frame_path}: {e}")

        return results
