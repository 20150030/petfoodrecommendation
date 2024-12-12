import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import PetForm from '../components/pet/PetForm';

function PetRegistration() {
  const location = useLocation();
  const petType = location.state?.petType;

  if (!petType) {
    // 만약 petType이 없다면 반려동물 타입 선택 페이지로 리다이렉트
    return <Navigate to="/pet-type-selection" replace />;
  }

  return (
    <div className="bg-gradient-to-b from-rc-gray to-white min-h-screen py-16">
      <div className="container mx-auto px-4">
        <PetForm initialPetType={petType} />
      </div>
    </div>
  );
}

export default PetRegistration;