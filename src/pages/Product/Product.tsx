/* eslint-disable import/no-unresolved */
import { getProductProjectionsByVariantKey } from '../../api/getProducts';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { ProductProjection, ProductVariant } from '@commercetools/platform-sdk';
import { useDispatch } from 'react-redux';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

// import '../Product/_product.scss';

import { createProductImgArr } from '../../store/reducers/productReduser';
import ModalWindow from './ModalWindow/ModalWindow';

interface IDataProduct {
  name: string;
  description: string;
  images: string[];
  price: number;
  sale: number;
  color: string;
  size: string;
  brand: string;
  bestseller: boolean;
}

function ProductPage(): JSX.Element {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [dataProduct, setDataProduct] = useState<IDataProduct>({
    name: '',
    description: '',
    images: [],
    price: 0,
    sale: 0,
    color: '',
    size: '',
    brand: '',
    bestseller: false,
  });

  const creatingQueryForMaster = useCallback(
    (product: ProductProjection): void => {
      const intermediateProduct: IDataProduct = {
        name: '',
        description: '',
        images: [],
        price: 0,
        sale: 0,
        color: '',
        size: '',
        brand: '',
        bestseller: false,
      };
      product.name ? (intermediateProduct.name = product.name['en-US']) : '';

      product.description
        ? (intermediateProduct.description = product.description['en-US'])
        : '';

      if (product.masterVariant.images) {
        const imagesArr = product.masterVariant.images.map((images) => {
          return String(images['url']);
        });
        intermediateProduct.images = imagesArr;
        dispatch(createProductImgArr(imagesArr));
      }

      product.masterVariant.prices
        ? (intermediateProduct.price =
            product.masterVariant.prices[0].value.centAmount / 100)
        : 0;

      product.masterVariant.prices &&
      product.masterVariant.prices[0].discounted?.value.centAmount
        ? (intermediateProduct.sale =
            product.masterVariant.prices[0].discounted?.value.centAmount / 100)
        : 0;

      const colorProduct = product.masterVariant.attributes?.filter(
        (item) => item.name === 'color'
      );
      colorProduct?.length
        ? (intermediateProduct.color = colorProduct[0].value['key'])
        : '';

      const sizeProduct = product.masterVariant.attributes?.filter(
        (item) => item.name === 'size'
      );
      sizeProduct?.length
        ? (intermediateProduct.size = sizeProduct[0].value['key'])
        : '';

      const brandProduct = product.masterVariant.attributes?.filter(
        (item) => item.name === 'brand'
      );
      brandProduct?.length
        ? (intermediateProduct.brand = brandProduct[0].value['key'])
        : '';
      setDataProduct(intermediateProduct);
    },
    [dispatch]
  );

  const creatingQueryForVariant = useCallback(
    (product: ProductProjection, variant: ProductVariant): void => {
      const intermediateProduct: IDataProduct = {
        name: '',
        description: '',
        images: [],
        price: 0,
        sale: 0,
        color: '',
        size: '',
        brand: '',
        bestseller: false,
      };
      variant.sku ? (intermediateProduct.name = variant.sku) : '';

      product.description
        ? (intermediateProduct.description = product.description['en-US'])
        : '';

      if (variant.images) {
        const imagesArr = variant.images.map((images) => {
          return String(images['url']);
        });
        intermediateProduct.images = imagesArr;
        dispatch(createProductImgArr(imagesArr));
      }

      variant.prices
        ? (intermediateProduct.price = variant.prices[0].value.centAmount / 100)
        : 0;

      variant.prices && variant.prices[0].discounted?.value.centAmount
        ? (intermediateProduct.sale =
            variant.prices[0].discounted?.value.centAmount / 100)
        : 0;

      const colorProduct = variant.attributes?.filter(
        (item) => item.name === 'color'
      );
      colorProduct?.length
        ? (intermediateProduct.color = colorProduct[0].value['key'])
        : '';

      const sizeProduct = variant.attributes?.filter(
        (item) => item.name === 'size'
      );
      sizeProduct?.length
        ? (intermediateProduct.size = sizeProduct[0].value['key'])
        : '';

      const brandProduct = variant.attributes?.filter(
        (item) => item.name === 'brand'
      );
      brandProduct?.length
        ? (intermediateProduct.brand = brandProduct[0].value['key'])
        : '';
      setDataProduct(intermediateProduct);
    },
    [dispatch]
  );
  useEffect(() => {
    id &&
      getProductProjectionsByVariantKey(id).then((response) => {
        const productObtained = response.body.results[0];

        if (productObtained.masterVariant.key === id) {
          creatingQueryForMaster(productObtained);
        } else {
          const variant = productObtained.variants.find(
            (data) => data.key && data.key === id
          );
          variant && creatingQueryForVariant(productObtained, variant);
        }
      });
  }, [creatingQueryForMaster, creatingQueryForVariant, id]);

  return (
    <section className="showcase">
      <h2 className="showcase_header">{dataProduct.name}</h2>
      <div className="showcase__content-wrapper">
        <div className="showcase_content">
          <div className="showcase_carousel">
            <Swiper
              className="swiper-wrapper"
              // effect={'coverflow'}
              grabCursor={true}
              loop={true}
              slidesPerView={3}
              // spaceBetween={30}
              centeredSlides={true}
              speed={1800}
              // coverfloweffect={{
              //   rotate: 0,
              //   stretch: 0,
              //   depth: 100,
              //   modifier: 2.5,
              // }}
              // pagination={{ el: '.swiper-pagination', clickable: true }}
              navigation={{
                nextEl: 'showcase-navigation_next',
                prevEl: 'showcase-navigation_prev',
                // clickable: true,
              }}
              modules={[EffectCoverflow, Navigation]}
            >
              {dataProduct.images.map((image, index) => {
                return (
                  <SwiperSlide
                    onClick={(): void => console.log(index)}
                    // className="swiper-slide showcase_carousel_item"
                    key={`${dataProduct.name}-${index}`}
                  >
                    <img
                      className="content_wrapper_img"
                      src={image}
                      alt={`${dataProduct.name}-${index}`}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="showcase-navigation_prev"></div>
            <div className="showcase-navigation_next"></div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <div>{dataProduct.description}</div>
          <div>
            <div>
              <div>sale : {dataProduct.sale.toFixed(2)} $</div>
              <div>prace: {dataProduct.price.toFixed(2)} $</div>
              <div>size: {dataProduct.size}</div>
              <div>color: {dataProduct.color}</div>
              <div>brand:{dataProduct.brand}</div>
            </div>
            <button>В корзину</button>
          </div>
        </div>
      </div>
      <ModalWindow />
    </section>
  );
}
export default ProductPage;
