from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./medvision.db"
    SECRET_KEY: str   = "medvision-hackathon-2026-secret-key-change-in-prod"
    MODEL_PATH: str   = "ai_model/saved_models/medvision_cnn_v1.pth"
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10 MB

    model_config = {"env_file": ".env"}


settings = Settings()
