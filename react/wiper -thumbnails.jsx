import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/thumbs';

const ProductsSection = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const products = [
    // Your products data
  ];

  return (
    <div className="products-grid">
      <Swiper
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Thumbs, Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={4}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            {/* Product content */}
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Thumbnail navigation */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[Thumbs]}
        className="thumbnail-swiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <img src={product.thumbnail} alt={product.name} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};