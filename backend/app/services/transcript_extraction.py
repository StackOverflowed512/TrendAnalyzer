import logging
import os
import subprocess
from typing import Optional

logger = logging.getLogger(__name__)

class TranscriptExtractionService:
    def __init__(self):
        pass
        
    def extract_audio(self, video_path: str) -> str:
        """Extracts audio using ffmpeg to a wav file."""
        logger.info(f"Extracting audio from {video_path}")
        audio_path = os.path.splitext(video_path)[0] + ".wav"
        
        try:
            # ffmpeg -i video.mp4 -q:a 0 -map a audio.wav
            subprocess.run([
                'ffmpeg', '-y', '-i', video_path, '-q:a', '0', '-map', 'a', audio_path
            ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            return audio_path
        except Exception as e:
            logger.error(f"Failed to extract audio: {e}")
            raise
            
    def transcribe(self, audio_path: str) -> str:
        """
        Transcribes audio. This should ideally call an API (e.g. OpenAI Whisper API, Groq)
        because local Whisper is heavy on CPU. 
        For now, returns a placeholder.
        """
        logger.info(f"Transcribing audio {audio_path}")
        # Placeholder for external API call
        # e.g., client.audio.transcriptions.create(model="whisper-large-v3", file=open(audio_path, "rb"))
        return "This is a transcribed text of the reel."
        
    def get_transcript(self, video_path: str, subtitle_path: Optional[str] = None) -> str:
        """Get transcript either from downloaded subtitles or by transcribing audio."""
        if subtitle_path and os.path.exists(subtitle_path):
            with open(subtitle_path, 'r', encoding='utf-8') as f:
                return f.read()
                
        audio_path = self.extract_audio(video_path)
        transcript = self.transcribe(audio_path)
        
        # Cleanup audio
        if os.path.exists(audio_path):
            os.remove(audio_path)
            
        return transcript
