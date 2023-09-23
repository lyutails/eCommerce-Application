/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Parallax } from 'swiper/modules';

import 'swiper/css/parallax';
import 'swiper/css/free-mode';
import './_catalog-category-paralax.scss';

import { useSelector } from 'react-redux';
import { ICategoryState } from '../../types/interfaces';
import { Link } from 'react-router-dom';
function CatalogCategoryParalax(): JSX.Element {
  const allCategories = useSelector(
    (state: ICategoryState) => state.category.category
  );

  return (
    <div className="category_slider">
      <Swiper
        freeMode={true}
        centeredSlides={true}
        parallax={true}
        grabCursor={true}
        modules={[FreeMode, Parallax]}
        initialSlide={1}
        breakpoints={{
          0: {
            slidesPerView: 1.3,
            spaceBetween: 5,
          },
          710: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 3.5,
            spaceBetween: 20,
          },
        }}
        className="swiper slider slider_main"
      >
        {allCategories.length &&
          allCategories.map((category, index) => {
            if (category !== 'Custom') {
              return (
                <SwiperSlide
                  className="swiper-slide slider__item"
                  key={category}
                >
                  <Link to={category} key={category}>
                    <div
                      className={`slider__img ${category.toLowerCase()}`}
                      data-swiper-parallax={index % 2 === 0 ? '20%' : '10%'}
                    ></div>
                    <h3 className="slider_title_img">{category}</h3>
                  </Link>
                </SwiperSlide>
              );
            }
          })}
      </Swiper>
    </div>
  );
}
export default CatalogCategoryParalax;
