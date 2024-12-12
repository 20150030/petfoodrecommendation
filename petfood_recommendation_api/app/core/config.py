from pydantic import BaseModel

class Settings(BaseModel):
    PROJECT_NAME: str = "Pet Food Recommendation API"
    DATABASE_URL: str = "sqlite:///./petfood.db"

settings = Settings()