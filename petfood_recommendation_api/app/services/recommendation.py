from sqlalchemy.orm import Session
from app.models.pet import Pet, PetType
from app.models.food import Food
from sqlalchemy import or_, and_, not_
import logging
from app.schemas.food import FoodResponse

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def get_recommendations(pet_id: int, db: Session):
    pet = db.query(Pet).filter(Pet.id == pet_id).first()
    if not pet:
        logger.info(f"Pet with id {pet_id} not found")
        return []

    logger.info(f"Found pet: {pet.type}, age: {pet.age}, health: {pet.health_condition}, allergies: {pet.allergies}")

    # 반려동물 타입에 맞는 사료를 필터링합니다.
    pet_type = "고양이" if pet.type == PetType.CAT else "강아지"
    suitable_foods = db.query(Food).filter(
        or_(
            Food.category.ilike(f"%{pet_type}%"),
            Food.details.ilike(f"%{pet_type}%")
        )
    )

    logger.info(f"Foods suitable for {pet.type}: {suitable_foods.count()}")

    # "사료" 또는 "간식"이 포함된 제품을 찾습니다.
    suitable_foods = suitable_foods.filter(
        or_(
            Food.name.ilike("%사료%"),
            Food.name.ilike("%간식%"),
            Food.details.ilike("%사료%"),
            Food.details.ilike("%간식%")
        )
    )

    logger.info(f"Foods related to pet food or treats: {suitable_foods.count()}")

    # 연령에 따른 필터링
    if pet.age == 0:  # 1세 미만
        suitable_foods = suitable_foods.filter(
            or_(
                Food.details.ilike("%전연령%"),
                Food.details.ilike("%퍼피%"),
                Food.details.ilike("%키튼%")
            )
        )
    else:  # 1세 이상
        suitable_foods = suitable_foods.filter(
            or_(
                Food.details.ilike("%전연령%"),
                Food.details.ilike("%어덜트%"),
                ~Food.details.ilike("%퍼피%"),
                ~Food.details.ilike("%키튼%")
            )
        )

    logger.info(f"Foods after age filtering: {suitable_foods.count()}")

    # 건강 상태에 따른 필터링 (옵션)
    if pet.health_condition and pet.health_condition != "healthy":
        health_foods = suitable_foods.filter(Food.details.ilike(f"%{pet.health_condition}%"))
        if health_foods.count() > 0:
            suitable_foods = health_foods
        logger.info(f"Foods after health condition filtering: {suitable_foods.count()}")

    # 알러지 정보에 따른 필터링
    if pet.allergies and pet.allergies.lower() != "none":
        allergens = pet.allergies.split(',')
        allergen_keywords = {
            "chicken": ["닭", "치킨", "가금류"],
            "beef": ["소", "쇠고기", "비프"],
            "fish": ["생선", "연어", "참치", "흰살생선", "고등어", "멸치", "정어리", "대구", "명태", "비린내", "어류", "황태"],
            "grain": ["곡물", "밀", "보리", "옥수수", "쌀"]
        }

        for allergen in allergens:
            allergen = allergen.strip().lower()
            if allergen in allergen_keywords:
                keywords = allergen_keywords[allergen]
                filter_condition = and_(*[
                    and_(
                        not_(Food.name.ilike(f"%{keyword}%")),
                        not_(Food.details.ilike(f"%{keyword}%"))
                    )
                    for keyword in keywords
                ])
                logger.info(f"Filtering out foods containing keywords: {keywords}")
            else:
                filter_condition = and_(
                    not_(Food.name.ilike(f"%{allergen}%")),
                    not_(Food.details.ilike(f"%{allergen}%"))
                )
                logger.info(f"Filtering out foods containing: {allergen}")

            suitable_foods = suitable_foods.filter(filter_condition)
            logger.info(f"Foods after filtering {allergen} allergy: {suitable_foods.count()}")

    # 평점순으로 정렬하고 상위 5개 추천
    recommendations = suitable_foods.order_by(Food.rating.desc()).limit(9).all()

    logger.info(f"Final recommendations count: {len(recommendations)}")

    # 최종 추천 결과를 로그로 출력
    logger.info("Final recommendations:")
    for idx, food in enumerate(recommendations, 1):
        logger.info(f"{idx}. Name: {food.name}, Category: {food.category}, Rating: {food.rating}")

    # Food 객체를 FoodResponse 형식으로 변환하며 필요한 데이터 변환 수행
    return [FoodResponse(
        id=food.id,
        name=food.name,
        category=food.category,
        price=food.price,
        rating=float(food.rating) if isinstance(food.rating, (int, float, str)) and str(food.rating).replace('.', '').isdigit() else None,
        image_url=food.image_url,
        details=food.details
    ) for food in recommendations]