/* eslint-disable import/no-unresolved */
import { getProductProjectionsByVariantKey } from '../../api/getProducts';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { ProductProjection, ProductVariant } from '@commercetools/platform-sdk';
import { useDispatch, useSelector } from 'react-redux';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';

import 'swiper/css/navigation';

import {
  changeflagInModalWindow,
  createProductImgArr,
} from '../../store/reducers/productReduser';
import ModalWindow from './ModalWindow/ModalWindow';
import {
  ICartState,
  IMyCartUpdate,
  IProductState,
  IRootState,
} from '../../types/interfaces';
import '../Product/_product.scss';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { refreshTokenFlow } from '../../api/adminBuilder';
import {
  changeAnonymousCart,
  changeUserCart,
  setCartItems,
  setCartPrice,
  setCartPriceDiscount,
  setCartQuantity,
} from '../../store/reducers/cartReducer';
import { updateCart } from '../../api/existTokenFlow';
import SistemModalWindow from './SistemModalWindow/SistemModalWindow';

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
  sku: string;
}

function ProductPage(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantityProduct, setQuantityProduct] = useState(1);
  const [productExistence, setProductExistence] = useState(false);
  const [productId, setProductId] = useState('');
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const { anonymousCart, userCart, cartItems } = useSelector(
    (state: ICartState) => state.cart
  );
  const { customerRefreshToken } = useSelector(
    (state: IRootState) => state.user
  );
  const isAuth = useSelector((state: IRootState) => state.user.isAuth);

  const updateCustomerCart = (): void => {
    if (!isAuth) {
      refreshTokenFlow(anonymousCart.anonymousRefreshToken).then((response) => {
        updateCart(
          anonymousCart.cartID,
          updateAnonCartData,
          response.access_token
        ).then((updatedCart) => {
          if (updatedCart) {
            dispatch(
              changeAnonymousCart({
                versionAnonCart: updatedCart.body.version,
              })
            );
            dispatch(setCartItems(updatedCart?.body.lineItems));
            dispatch(setCartQuantity(updatedCart?.body.totalLineItemQuantity));
            dispatch(
              setCartPriceDiscount(updatedCart?.body.totalPrice.centAmount)
            );
            let totalPrice = 0;
            updatedCart?.body.lineItems.map((item) => {
              if (item) {
                totalPrice += item.price.value.centAmount * item.quantity;
              }
              return totalPrice;
            });
            dispatch(setCartPrice(totalPrice));
          }
        });
      });
    } else {
      refreshTokenFlow(customerRefreshToken).then((response) => {
        updateCart(
          userCart.userCartId,
          updateAnonCartData,
          response.access_token
        ).then((updatedCart) => {
          if (updatedCart) {
            dispatch(
              changeUserCart({
                versionUserCart: updatedCart.body.version,
              })
            );
            dispatch(setCartQuantity(updatedCart?.body.totalLineItemQuantity));
            dispatch(
              setCartPriceDiscount(updatedCart?.body.totalPrice.centAmount)
            );
            let totalPrice = 0;
            updatedCart?.body.lineItems.map((item) => {
              if (item) {
                totalPrice += item.price.value.centAmount * item.quantity;
              }
              return totalPrice;
            });
            dispatch(setCartPrice(totalPrice));
          }
        });
      });
    }
  };

  const flagModalWindow = useSelector(
    (state: IProductState) => state.product.flagInModalWindow
  );
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
    sku: '',
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
        sku: '',
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
      product.masterVariant.sku
        ? (intermediateProduct.sku = product.masterVariant.sku)
        : '';

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

      const bestseller = product.masterVariant.attributes?.filter(
        (item) => item.name === 'bestseller'
      );
      bestseller?.length
        ? (intermediateProduct.bestseller = bestseller[0].value)
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
        sku: '',
      };
      variant.sku ? (intermediateProduct.name = variant.sku) : '';

      variant.sku ? (intermediateProduct.sku = variant.sku) : '';

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
      const bestseller = variant.attributes?.filter(
        (item) => item.name === 'bestseller'
      );
      bestseller?.length
        ? (intermediateProduct.bestseller = bestseller[0].value)
        : '';
      setDataProduct(intermediateProduct);
      setDataProduct(intermediateProduct);
    },
    [dispatch]
  );

  const updateAnonCartData: IMyCartUpdate = {
    version: !isAuth ? anonymousCart.versionAnonCart : userCart.versionUserCart,
    actions: [
      {
        action: 'addLineItem',
        sku: dataProduct.sku,
        quantity: quantityProduct,
      },
    ],
  };

  const increaseItem = (itemId: string, refreshToken: string): void => {
    const increaseItemData: IMyCartUpdate = {
      version: !isAuth
        ? anonymousCart.versionAnonCart
        : userCart.versionUserCart,
      actions: [
        {
          action: 'addLineItem',
          sku: itemId,
          quantity: 1,
        },
      ],
    };
    refreshTokenFlow(refreshToken).then((response) => {
      if (response) {
        updateCart(
          isAuth ? userCart.userCartId : anonymousCart.cartID,
          increaseItemData,
          response.access_token
        ).then((responseTwo) => {
          dispatch(setCartItems(responseTwo?.body.lineItems));
          dispatch(setCartQuantity(responseTwo?.body.totalLineItemQuantity));
          dispatch(
            setCartPriceDiscount(responseTwo?.body.totalPrice.centAmount)
          );
          let totalPrice = 0;
          responseTwo?.body.lineItems.map((item) => {
            if (item) {
              totalPrice += item.price.value.centAmount * item.quantity;
            }
            return totalPrice;
          });
          dispatch(setCartPrice(totalPrice));
          isAuth
            ? dispatch(
                changeUserCart({
                  versionUserCart: responseTwo?.body.version,
                })
              )
            : dispatch(
                changeAnonymousCart({
                  versionAnonCart: responseTwo?.body.version,
                })
              );
        });
      }
    });
  };
  const deleteItem = (
    itemId: string,
    quantity: number,
    refreshToken: string
  ): void => {
    const deleteItemData: IMyCartUpdate = {
      version: !isAuth
        ? anonymousCart.versionAnonCart
        : userCart.versionUserCart,
      actions: [
        {
          action: 'removeLineItem',
          lineItemId: itemId,
          quantity: quantity,
        },
      ],
    };
    refreshTokenFlow(refreshToken).then((response) => {
      if (response) {
        updateCart(
          !isAuth ? anonymousCart.cartID : userCart.userCartId,
          deleteItemData,
          response.access_token
        ).then((responseTwo) => {
          dispatch(setCartItems(responseTwo?.body.lineItems));
          dispatch(setCartQuantity(responseTwo?.body.totalLineItemQuantity));
          dispatch(
            setCartPriceDiscount(responseTwo?.body.totalPrice.centAmount)
          );
          let totalPrice = 0;
          responseTwo?.body.lineItems.map((item) => {
            if (item) {
              totalPrice += item.price.value.centAmount * item.quantity;
            }
            return totalPrice;
          });
          dispatch(setCartPrice(totalPrice));
          isAuth
            ? dispatch(
                changeUserCart({
                  versionUserCart: responseTwo?.body.version,
                })
              )
            : dispatch(
                changeAnonymousCart({
                  versionAnonCart: responseTwo?.body.version,
                })
              );
        });
      }
    });
  };

  function openModalWindow(): void {
    dispatch(changeflagInModalWindow(true));
  }

  function deleteProduct(): void {
    const refreshTokenProduct = !isAuth
      ? anonymousCart.anonymousRefreshToken
      : customerRefreshToken;
    deleteItem(productId, quantityProduct, refreshTokenProduct);
    setProductExistence(false);
    setQuantityProduct(1);
    setModal(true);
    setTimeout(() => {
      setModal(false);
    }, 3000);
  }
  function addOneProduct(): void {
    const refreshTokenProduct = !isAuth
      ? anonymousCart.anonymousRefreshToken
      : customerRefreshToken;
    setQuantityProduct(quantityProduct + 1);
    increaseItem(dataProduct.sku, refreshTokenProduct);
  }
  function deleteOneProduct(): void {
    const refreshTokenProduct = !isAuth
      ? anonymousCart.anonymousRefreshToken
      : customerRefreshToken;
    if (quantityProduct > 1) {
      setQuantityProduct(quantityProduct - 1);
      const quantity = 1;
      deleteItem(productId, quantity, refreshTokenProduct);
    }
  }

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

  useEffect(() => {
    console.log(id, cartItems);
    if (cartItems.length) {
      cartItems.map((item) => {
        if (item.variant.key === id) {
          setProductExistence(true);
          setQuantityProduct(item.quantity);
          setProductId(item.id);
        }
      });
    }
  }, [cartItems, id]);

  return (
    <section className="showcase">
      <div className="showcase_header">
        <h2 className="showcase_header-title">{dataProduct.name}</h2>
        <div
          className={
            dataProduct.bestseller
              ? 'showcase_carousel-bestSellerOn'
              : 'showcase_carousel-bestSellerOff'
          }
        >
          BestSeller!!!
        </div>
      </div>
      <div className="showcase__content-wrapper">
        <div className="showcase_content">
          <div className="showcase_carousel">
            <Swiper
              grabCursor={true}
              effect={'coverflow'}
              centeredSlides={true}
              spaceBetween={100}
              slidesPerView={3}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 4,
                slideShadows: false,
              }}
              modules={[EffectCoverflow]}
              initialSlide={1}
              breakpoints={{
                3900: {
                  slidesPerView: 3,
                },
                1000: {
                  slidesPerView: 3,
                },
                700: {
                  slidesPerView: 3,
                },
                400: {
                  slidesPerView: 3,
                },
              }}
              className="swiper-custom"
            >
              {dataProduct.images.map((image, index) => {
                return (
                  <SwiperSlide
                    onClick={openModalWindow}
                    className="showcase_carousel_item"
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
          </div>
        </div>
      </div>

      <div className="product-description">
        <div className="product-description-wrapper wrapper">
          <h3 className="wrapper-title">{dataProduct.name}</h3>
          <div
            className={
              dataProduct.bestseller
                ? 'wrapper-title-bestSellerOn'
                : 'wrapper-title-bestSellerOff'
            }
          >
            BestSeller!!!
          </div>
          <div className="wrapper-desc-block">
            <p className="wrapper-desc">
              <span className="wrapper-desc-span">Description: </span>
              {dataProduct.description}
            </p>
          </div>
          <div className="wrapper-characteristics">
            <div className="specifications">
              <div className="specifications-item">
                <span className="specifications-item-span1">price:</span>
                <span
                  className={
                    dataProduct.sale === 0
                      ? 'specifications-item-span2'
                      : 'specifications-item-span2OFF'
                  }
                >
                  {dataProduct.price.toFixed(2)} $
                  <div
                    className={
                      dataProduct.sale === 0
                        ? 'specifications-item-OFF'
                        : 'specifications-item-sale'
                    }
                  >
                    {dataProduct.sale.toFixed(2)} $
                  </div>
                </span>
              </div>
              <div className="specifications-item">
                <span className="specifications-item-span1">color: </span>
                <span className="specifications-item-span2">
                  {dataProduct.color}
                </span>
              </div>
              <div className="specifications-item">
                <span className="specifications-item-span1">brand:</span>
                <span className="specifications-item-span2">
                  {dataProduct.brand}
                </span>
              </div>
              <div
                className={
                  dataProduct.size === 'no'
                    ? 'specifications-item-OFF'
                    : 'specifications-item'
                }
              >
                <span className="specifications-item-span1">size:</span>
                <span className="specifications-item-span2">
                  {' '}
                  {dataProduct.size}
                </span>
              </div>
            </div>
            {productExistence && (
              <div className="block-buttons-quantity">
                <button
                  onClick={deleteOneProduct}
                  className="quantity-minus"
                ></button>
                <div className="quantity">{quantityProduct}</div>
                <button
                  onClick={addOneProduct}
                  className="quantity-plus"
                ></button>
              </div>
            )}

            <div className="wrapper-characteristics_buttons">
              <button
                className="wrapper-characteristics_button"
                onClick={(): void =>
                  productExistence ? navigate('/cart') : updateCustomerCart()
                }
              >
                {productExistence ? 'Go To Cart' : 'Add To Card'}
              </button>
              {productExistence && (
                <button
                  onClick={deleteProduct}
                  className="wrapper-characteristics-delete_button"
                ></button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>{flagModalWindow ? <ModalWindow /> : ''}</div>
      <div>{modal ? <SistemModalWindow /> : ''}</div>
    </section>
  );
}
export default ProductPage;
