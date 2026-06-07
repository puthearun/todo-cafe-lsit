import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductsSection = () => {
  const products = [
    { id: 1, name: 'Product 1', price: '$29.99', image: 'image1.jpg' },
    { id: 2, name: 'Product 2', price: '$39.99', image: 'image2.jpg' },
    { id: 3, name: 'Product 3', price: '$49.99', image: 'image3.jpg' },
    { id: 4, name: 'Product 4', price: '$59.99', image: 'image4.jpg' },
    { id: 5, name: 'Product 5', price: '$69.99', image: 'image5.jpg' },
    { id: 6, name: 'Product 6', price: '$79.99', image: 'image6.jpg' },
  ];

  return (
    <div className="products-grid">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          // Responsive breakpoints
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="product-grid">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <button>Add to Cart</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsSection;