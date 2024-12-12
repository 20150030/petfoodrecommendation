import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';  // axios로 API 호출
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import PetTypeSelection from './pages/PetTypeSelection';
import PetRegistration from './pages/PetRegistration';
import Recommendation from './pages/Recommendation';

function App() {
  const [products, setProducts] = useState([]);

  // API를 호출하여 데이터를 받아옴
  useEffect(() => {
    axios.get('http://localhost:8000')  // FastAPI에서 제공하는 API
      .then(response => {
        console.log(response.data);  // API 응답 데이터 콘솔 출력
        setProducts(response.data);  // 받아온 데이터를 상태에 저장
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pet-type-selection" element={<PetTypeSelection />} />
          <Route path="/register" element={<PetRegistration />} />
          {/* Recommendation 페이지에 products 데이터를 전달 */}
          <Route path="/recommendation/:petId" element={<Recommendation products={products} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;