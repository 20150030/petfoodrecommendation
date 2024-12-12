from sqlalchemy import Column, Integer, String, Float
from app.db.database import Base

class Food(Base):
    __tablename__ = "foods"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String)
    price = Column(String)
    rating = Column(String)
    image_url = Column(String)
    details = Column(String)