from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://myuser:password@localhost:5432/mydatabase"
    TEST_DATABASE_URL: str = "postgresql+asyncpg://myuser:password@localhost:5432/mydatabase"

    class Config:
        env_file = ".env"

settings = Settings()