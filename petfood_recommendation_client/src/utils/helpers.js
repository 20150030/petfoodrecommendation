// 날짜 형식 변환 함수
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  
  // 가격 형식 변환 함수
  export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };
  
  // 별점 표시 함수
  export const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
    return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
  };
  
  // 여기에 필요한 다른 헬퍼 함수들을 추가할 수 있습니다