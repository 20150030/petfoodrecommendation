import React from 'react';

function Footer() {
  return (
    <footer className="bg-rc-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">반려동물 사료 추천</h3>
            <p className="text-gray-300">당신의 반려동물에게 가장 적합한 사료를 찾아드립니다.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">링크</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white">홈</a></li>
              <li><a href="/register" className="text-gray-300 hover:text-white">반려동물 등록</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-4">문의하기</h3>
            <p className="text-gray-300">이메일: insun4210@gmail.com</p>
            <p className="text-gray-300">전화: 010-6749-4210</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; 2024 PetFood Recommendation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;