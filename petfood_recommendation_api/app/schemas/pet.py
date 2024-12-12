from pydantic import BaseModel
from enum import Enum

class PetType(str, Enum):
    DOG = "dog"
    CAT = "cat"

class PetBase(BaseModel):
    type: PetType
    breed: str
    age: float
    weight: float
    health_condition: str | None = None
    allergies: str | None = None

class PetCreate(PetBase):
    pass

class PetResponse(PetBase):
    id: int

    class Config:
        orm_mode = True