/* eslint-disable import/no-unresolved */
import { IProductState } from '../../../types/interfaces';

import { EffectCards, Zoom, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './_modal-window.scss';

function ModalWindow(): JSX.Element {
  const dataProduct = useSelector(
    (state: IProductState) => state.product.productImg
  );
  console.log(dataProduct);
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string): string {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

  return (
    <section className="modal-window">
      <button>
        <img src="" alt="" />
      </button>
      <div className="modal-wrapper">
        <Swiper
          loop={true}
          navigation={true}
          effect={'cards'}
          grabCursor={true}
          zoom={true}
          pagination={pagination}
          modules={[EffectCards, Zoom, Navigation, Pagination]}
          className="mySwiper"
        >
          {dataProduct.map((image, index) => {
            return (
              <SwiperSlide
                onClick={(): void => console.log(index)}
                key={`${index}`}
              >
                <div className="swiper-zoom-container">
                  <img
                    className="content_wrapper_img"
                    src={image}
                    alt={`${index}`}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
export default ModalWindow;
