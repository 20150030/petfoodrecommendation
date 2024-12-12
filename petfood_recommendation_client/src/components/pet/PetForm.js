import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { registerPet } from '../../redux/slices/petSlice';
import { createPet } from '../../services/api';

function PetForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [petInfo, setPetInfo] = useState({
    type: '',
    breed: '',
    age: '',
    weight: '',
    health_condition: 'healthy',
    allergies: 'none'
  });


  useEffect(() => {
    if (location.state && location.state.petType) {
      setPetInfo(prev => ({ ...prev, type: location.state.petType }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!petInfo.type || !petInfo.breed || !petInfo.age || !petInfo.weight) {
      alert('모든 필수 정보를 입력해주세요.');
      return;
    }
    try {
      const response = await createPet(petInfo);
      dispatch(registerPet(response.data));
      navigate(`/recommendation/${response.data.id}`);
    } catch (error) {
      console.error("Error creating pet:", error);
      if (error.response && error.response.data) {
        console.log("Server error details:", error.response.data);
        alert(`오류 발생: ${error.response.data.detail[0].msg}`);
      } else {
        alert('반려동물 정보 등록 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="bg-white shadow-2xl rounded-lg p-10 max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-rc-dark text-center">반려동물 정보 등록</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
      <div>
          <label htmlFor="type" className="block mb-2 text-lg font-semibold text-rc-dark">반려동물 유형</label>
          <input type="text" id="type" name="type" value={petInfo.type === 'dog' ? '강아지' : '고양이'} readOnly 
                 className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" />
        </div>
        
        <div>
          <label htmlFor="breed" className="block mb-2 text-lg font-semibold text-rc-dark">품종</label>
          <input type="text" id="breed" name="breed" value={petInfo.breed} onChange={handleChange} 
                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rc-red transition duration-300" required />
        </div>

        <div>
          <label htmlFor="age" className="block mb-2 text-lg font-semibold text-rc-dark">나이</label>
          <select id="age" name="age" value={petInfo.age} onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rc-red transition duration-300" required>
            <option value="">선택해주세요</option>
            <option value="0">1세 미만</option>
            <option value="1">1-7세</option>
            <option value="8">8세 이상</option>
          </select>
        </div>

        <div>
          <label htmlFor="weight" className="block mb-2 text-lg font-semibold text-rc-dark">체중 (kg)</label>
          <input type="number" id="weight" name="weight" value={petInfo.weight} onChange={handleChange} 
                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rc-red transition duration-300" required />
        </div>

        <div>
          <label htmlFor="health_condition" className="block mb-2 text-lg font-semibold text-rc-dark">건강 상태</label>
          <select id="health_condition" name="health_condition" value={petInfo.health_condition} onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rc-red transition duration-300">
            <option value="healthy">건강함</option>
            <option value="allergy">알레르기</option>
            <option value="senior">노령</option>
            <option value="overweight">과체중</option>
          </select>
        </div>

        <div>
          <label htmlFor="allergies" className="block mb-2 text-lg font-semibold text-rc-dark">알레르기</label>
          <select id="allergies" name="allergies" value={petInfo.allergies} onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rc-red transition duration-300">
            <option value="none">없음</option>
            <option value="chicken">닭고기</option>
            <option value="beef">소고기</option>
            <option value="fish">생선</option>
            <option value="grain">곡물</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-rc-red text-white p-4 rounded-md mt-10 text-lg font-semibold hover:bg-red-700 transition duration-300">
          반려동물 등록하기
        </button>
      </form>
    </div>
  );
}

export default PetForm;