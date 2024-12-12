from pydantic import BaseModel, Field
from typing import Optional

class FoodBase(BaseModel):
    name: str
    category: str
    price: str
    rating: Optional[float] = Field(None, description="Rating of the food")
    image_url: Optional[str] = None
    details: Optional[str] = None

class FoodCreate(FoodBase):
    pass

class FoodResponse(FoodBase):
    id: int

    class Config:
        orm_mode = True