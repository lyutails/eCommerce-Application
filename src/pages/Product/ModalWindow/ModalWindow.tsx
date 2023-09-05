/* eslint-disable import/no-unresolved */
import { IProductState } from '../../../types/interfaces';

import { EffectCards, Zoom, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';

import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './_modal-window.scss';
import iconModal from '../../../../public/portal/circle_14.svg';
import { changeflagInModalWindow } from '../../../store/reducers/productReduser';

function ModalWindow(): JSX.Element {
  const dataProduct = useSelector(
    (state: IProductState) => state.product.productImg
  );
  const dispatch = useDispatch();
  function disablingModal(): void {
    dispatch(changeflagInModalWindow(false));
  }
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string): string {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

  return (
    <section className="modal-window">
      <div className="modal-wrapper">
        <button onClick={disablingModal} className="modal-button">
          <img className="modal-button_img" src={iconModal} alt="iconModal" />
        </button>
        <Swiper
          loop={true}
          navigation={true}
          centeredSlides={true}
          effect={'cards'}
          grabCursor={true}
          zoom={{
            maxRatio: 2,
            minRatio: 1,
          }}
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
