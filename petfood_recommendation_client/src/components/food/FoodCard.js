import React from 'react';
import { StarIcon } from '@heroicons/react/20/solid';

function FoodCard({ food }) {
  if (!food) return null;

  // "자세히 보기" 버튼 클릭 시 링크로 이동
  const handleDetailsClick = () => {
    console.log(food.details);  // food.link가 올바르게 전달되고 있는지 확인
    if (food.details) {
      window.open(food.details, '_blank');  // 링크가 있으면 새로운 탭에서 열기
    } else {
      alert('링크가 제공되지 않았습니다.');  // 링크가 없으면 경고 메시지
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 hover:shadow-xl">
      {food.image_url && (
        <div className="relative h-48 overflow-hidden">
          <img src={food.image_url} alt={food.name} className="w-full h-full object-cover transition duration-300 transform hover:scale-110" />
        </div>
      )}
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2 text-rc-dark">{food.name || '이름 없음'}</h3>
        <p className="text-gray-600 text-sm mb-4">{food.category || '카테고리 없음'}</p>
        <div className="flex justify-between items-center mb-4">
          <p className="text-rc-red font-bold text-xl">{food.price || '가격 정보 없음'}</p>
          <div className="flex items-center">
            <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
            <span className="text-gray-600">{food.rating || '평점 없음'}</span>
          </div>
        </div>
        <button
          onClick={handleDetailsClick}  // 클릭 시 링크로 이동
          className="w-full bg-rc-red text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
        >
          자세히 보기
        </button>
      </div>
    </div>
  );
}

export default FoodCard;