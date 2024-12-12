import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const navigate = useNavigate();
  const petInfo = useSelector((state) => state.pet.petInfo);

  const handleRecommendationClick = () => {
    if (petInfo && petInfo.id) {
      navigate(`/recommendation/${petInfo.id}`);
    } else {
      navigate('/pet-type-selection');
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-rc-red hover:text-rc-dark transition duration-300">
            반려동물 사료 추천
          </Link>
          <nav>
            <ul className="flex items-center space-x-6">
              <li><Link to="/" className="text-rc-dark hover:text-rc-red transition duration-300">홈</Link></li>
              <li><Link to="/pet-type-selection" className="text-rc-dark hover:text-rc-red transition duration-300">반려동물 등록</Link></li>
              <li>
                <button onClick={handleRecommendationClick} className="bg-rc-red text-white px-4 py-2 rounded-full hover:bg-rc-dark transition duration-300">
                  사료 추천 받기
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;