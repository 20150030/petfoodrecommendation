import React from 'react';
import FoodCard from './FoodCard';

function FoodList({ foods }) {
  if (!foods || foods.length === 0) {
    return <div className="text-center text-gray-600">추천 가능한 사료가 없습니다.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {foods.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}
    </div>
  );
}

export default FoodList;