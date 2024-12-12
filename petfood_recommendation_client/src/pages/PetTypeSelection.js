import React from 'react';
import { useNavigate } from 'react-router-dom';

function PetTypeSelection() {
  const navigate = useNavigate();

  const handlePetTypeSelection = (type) => {
    navigate('/register', { state: { petType: type } });
  };

  return (
    <div className="bg-gradient-to-b from-rc-gray to-white min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-rc-dark mb-8">어떤 반려동물과 함께하고 계신가요?</h2>
        <div className="flex justify-center space-x-12">
          <button onClick={() => handlePetTypeSelection('cat')} className="group">
            <div className="bg-white rounded-full p-6 mb-4 transition duration-300 ease-in-out group-hover:bg-yellow-400">
              <img src="/cat-icon.png" alt="고양이" className="w-24 h-24" />
            </div>
            <span className="text-2xl text-rc-dark group-hover:text-yellow-400 transition duration-300">고양이</span>
          </button>
          <button onClick={() => handlePetTypeSelection('dog')} className="group">
            <div className="bg-white rounded-full p-6 mb-4 transition duration-300 ease-in-out group-hover:bg-blue-400">
              <img src="/dog-icon.png" alt="강아지" className="w-24 h-24" />
            </div>
            <span className="text-2xl text-rc-dark group-hover:text-blue-400 transition duration-300">강아지</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PetTypeSelection;