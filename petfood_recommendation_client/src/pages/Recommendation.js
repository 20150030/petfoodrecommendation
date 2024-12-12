import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRecommendations } from '../redux/slices/foodSlice';
import PetProfile from '../components/pet/PetProfile';
import FoodList from '../components/food/FoodList';

function Recommendation() {
  const dispatch = useDispatch();
  const { petId } = useParams();
  const { recommendations, loading, error } = useSelector((state) => state.food);
  const pet = useSelector((state) => state.pet.petInfo);

  useEffect(() => {
    if (petId) {
      dispatch(fetchRecommendations(petId));
    }
  }, [dispatch, petId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-rc-red"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">오류 발생:</strong>
        <span className="block sm:inline"> {error.detail || '추천을 가져오는 중 문제가 발생했습니다.'}</span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-rc-gray to-white min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-rc-dark text-center">맞춤 사료 추천 결과</h1>
        
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-rc-dark">반려동물 정보</h2>
          <PetProfile pet={pet} />
        </div>

        {recommendations && recommendations.length > 0 ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-rc-dark">추천 사료</h2>
            <FoodList foods={recommendations} />
          </div>
        ) : (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">알림:</strong>
            <span className="block sm:inline"> 현재 추천 가능한 사료가 없습니다. 다른 조건으로 다시 시도해 보세요.</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Recommendation;