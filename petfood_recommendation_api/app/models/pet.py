from sqlalchemy import Column, Integer, String, Float, Enum
from app.db.database import Base
import enum

class PetType(str, enum.Enum):
    DOG = "dog"
    CAT = "cat"

class Pet(Base):
    __tablename__ = "pets"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(Enum(PetType))
    breed = Column(String)
    age = Column(Float)
    weight = Column(Float)
    health_condition = Column(String, nullable=True)
    allergies = Column(String, nullable=True)