import React from 'react';

function PetProfile({ pet }) {
  if (!pet) {
    return <div>반려동물 정보가 없습니다.</div>;
  }

  const getAgeRange = (age) => {
    if (age < 1) return '1세 미만';
    if (age >= 1 && age <= 7) return '1-7세';
    return '8세 이상';
  };

  const getHealthCondition = (condition) => {
    const conditions = {
      'healthy': '건강함',
      'allergy': '알레르기',
      'senior': '노령',
      'overweight': '과체중'
    };
    return conditions[condition] || condition;
  };

  const getAllergies = (allergies) => {
    if (allergies === 'none') return '없음';
    const allergyMap = {
      'chicken': '닭고기',
      'beef': '소고기',
      'fish': '생선',
      'grain': '곡물'
    };
    return allergies.split(',').map(allergy => allergyMap[allergy.trim()] || allergy.trim()).join(', ');
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="font-semibold">종류:</p>
        <p>{pet.type === 'dog' ? '강아지' : '고양이'}</p>
      </div>
      <div>
        <p className="font-semibold">품종:</p>
        <p>{pet.breed}</p>
      </div>
      <div>
        <p className="font-semibold">나이:</p>
        <p>{getAgeRange(pet.age)}</p>
      </div>
      <div>
        <p className="font-semibold">체중:</p>
        <p>{pet.weight} kg</p>
      </div>
      <div>
        <p className="font-semibold">건강 상태:</p>
        <p>{getHealthCondition(pet.health_condition)}</p>
      </div>
      <div>
        <p className="font-semibold">알레르기:</p>
        <p>{getAllergies(pet.allergies)}</p>
      </div>
    </div>
  );
}

export default PetProfile;