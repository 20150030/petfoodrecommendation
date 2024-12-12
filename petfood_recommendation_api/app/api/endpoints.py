from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.pet import PetCreate, PetResponse
from app.schemas.food import FoodResponse
from app.models.pet import Pet
from app.services.recommendation import get_recommendations
from app.db.database import get_db

router = APIRouter()

@router.post("/pets", response_model=PetResponse)
def create_pet(pet: PetCreate, db: Session = Depends(get_db)):
    new_pet = Pet(**pet.dict())
    db.add(new_pet)
    db.commit()
    db.refresh(new_pet)
    return new_pet

@router.get("/recommendations/{pet_id}", response_model=list[FoodResponse])
def get_food_recommendations(pet_id: int, db: Session = Depends(get_db)):
    recommendations = get_recommendations(pet_id, db)
    if not recommendations:
        raise HTTPException(status_code=404, detail="이 반려동물을 위한 추천 사료를 찾을 수 없습니다.")
    return recommendations