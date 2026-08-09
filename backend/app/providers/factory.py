from app.config.settings import settings
from app.providers.base import AIProvider


def get_ai_provider() -> AIProvider:
    if settings.AI_PROVIDER == "MistralProvider":
        from app.providers.mistral import MistralProvider

        return MistralProvider()
    if settings.AI_PROVIDER == "GeminiProvider":
        from app.providers.gemini import GeminiProvider

        return GeminiProvider()

    # Fallback or other providers
    from app.providers.gemini import GeminiProvider

    return GeminiProvider()
