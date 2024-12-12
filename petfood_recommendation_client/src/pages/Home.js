import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, ShieldCheckIcon, HeartIcon, SparklesIcon } from '@heroicons/react/24/outline';

function Home() {
  const navigate = useNavigate();

  const handlePetTypeSelection = (type) => {
    navigate('/register', { state: { petType: type } });
  };

  const handleStartClick = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Banner Image */}
      <div className="relative h-[70vh] bg-cover bg-center" style={{ backgroundImage: 'url("/banner-image.png")' }}>
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center text-white max-w-2xl p-8">
            <h1 className="text-5xl font-bold mb-4">맞춤형 반려동물 사료 추천</h1>
            <p className="text-lg mb-6">당신의 소중한 반려동물에게 최적의 영양을 제공하세요</p>
            <button onClick={handleStartClick} className="bg-rc-red text-white font-bold py-3 px-6 rounded-full hover:bg-rc-dark transition duration-300">
              지금 시작하기
              <ArrowRightIcon className="w-5 h-5 ml-2 inline-block" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">왜 우리의 추천이 특별할까요?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <ShieldCheckIcon className="w-12 h-12 mb-4 mx-auto text-rc-red" />
            <h3 className="text-2xl font-bold mb-2">과학적 분석</h3>
            <p className="text-gray-700 text-left">최신 영양학 연구를 바탕으로 한 알고리즘으로 최적의 사료를 추천합니다.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <HeartIcon className="w-12 h-12 mb-4 mx-auto text-rc-red" />
            <h3 className="text-2xl font-bold mb-2">건강한 선택</h3>
            <p className="text-gray-700 text-left">반려동물의 건강 상태와 특성을 고려하여 맞춤형 영양 솔루션을 제공합니다.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <SparklesIcon className="w-12 h-12 mb-4 mx-auto text-rc-red" />
            <h3 className="text-2xl font-bold mb-2">다양한 옵션</h3>
            <p className="text-gray-700 text-left">다양한 브랜드와 제품 중에서 가장 적합한 사료를 찾아드립니다.</p>
          </div>
        </div>
      </div>

      {/* Pet Type Selection */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">어떤 반려동물과 함께하고 계신가요?</h2>
          <div className="flex justify-center space-x-12">
            <button onClick={() => handlePetTypeSelection('cat')} className="group">
              <div className="bg-white shadow-md rounded-full p-6 mb-4 transition duration-300 ease-in-out group-hover:bg-yellow-400">
                <img src="/cat-icon.png" alt="고양이" className="w-24 h-24" />
              </div>
              <span className="text-2xl text-rc-dark group-hover:text-yellow-400 transition duration-300">고양이</span>
            </button>
            <button onClick={() => handlePetTypeSelection('dog')} className="group">
              <div className="bg-white shadow-md rounded-full p-6 mb-4 transition duration-300 ease-in-out group-hover:bg-blue-400">
                <img src="/dog-icon.png" alt="강아지" className="w-24 h-24" />
              </div>
              <span className="text-2xl text-rc-dark group-hover:text-blue-400 transition duration-300">강아지</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
