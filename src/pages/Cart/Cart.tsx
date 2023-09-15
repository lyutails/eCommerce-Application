import { ICartState, IRootState } from '../../types/interfaces';
import style from './_cart.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from '../../api/existTokenFlow';
import { debounce } from 'lodash';
import {
  changeAnonymousCart,
  changeUserCart,
  setCartItems,
  setCartPrice,
  setCartPriceDiscount,
  setCartQuantity,
  setDiscountCodesCart,
  setPromocode,
} from '../../store/reducers/cartReducer';
import { CartProduct } from '../../components/CartProduct/CartProduct';
import { refreshTokenFlow } from '../../api/adminBuilder';
import { MyCartUpdate } from '@commercetools/platform-sdk';
import { useEffect } from 'react';

function CartPage(): JSX.Element {
  const dispatch = useDispatch();
  const {
    anonymousCart,
    userCart,
    cartItems,
    discountCodes,
    cartPrice,
    promocode,
    cartPriceDiscount,
    discountCodesCart,
  } = useSelector((state: ICartState) => state.cart);
  const { customerId, customerRefreshToken, accessToken } = useSelector(
    (state: IRootState) => state.user
  );
  const isAuth: boolean = useSelector((state: IRootState) => state.user.isAuth);

  // DELETE ITEM FROM CART
  const deleteItem = (
    itemId: string,
    quantity: number,
    refreshToken: string
  ): void => {
    const deleteItemData = {
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

  // INCREASE ITEM FROM CART
  const increaseItem = (itemId: string, refreshToken: string): void => {
    const increaseItemData = {
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

  const addDiscountCode = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const code = event.target.value;
    dispatch(setPromocode(code));
  };

  const setPromocodeToCart = (refreshToken: string): void => {
    const addPromocodeData = {
      version: !isAuth
        ? anonymousCart.versionAnonCart
        : userCart.versionUserCart,
      actions: [
        {
          action: 'addDiscountCode',
          code: promocode.toLowerCase(),
        },
      ],
    };
    const existPromo = discountCodes.map((code) => {
      if (code.name === promocode.toLowerCase()) {
        return true;
      }
      return false;
    });
    if (existPromo.includes(true)) {
      refreshTokenFlow(refreshToken).then((response) => {
        if (response) {
          updateCart(
            !isAuth ? anonymousCart.cartID : userCart.userCartId,
            addPromocodeData,
            response.access_token
          ).then((responseTwo) => {
            dispatch(setCartItems(responseTwo?.body.lineItems));
            dispatch(setCartQuantity(responseTwo?.body.totalLineItemQuantity));
            dispatch(
              setCartPriceDiscount(responseTwo?.body.totalPrice.centAmount)
            );
            dispatch(setDiscountCodesCart(responseTwo?.body.discountCodes));
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
    }
  };
  useEffect(() => {
    discountCodes.map((code) => {
      if (
        discountCodesCart &&
        code.id === discountCodesCart[0]?.discountCode.id
      ) {
        dispatch(setPromocode(code.name));
      }
    });
  }, [discountCodes, discountCodesCart, dispatch]);

  const deletePromocodeFromCart = (refreshToken: string): void => {
    const deletePromocodeData = {
      version: !isAuth
        ? anonymousCart.versionAnonCart
        : userCart.versionUserCart,
      actions: [
        {
          action: 'removeDiscountCode',
          discountCode: {
            typeId: 'discount-code',
            id:
              discountCodesCart && discountCodesCart[0]
                ? discountCodesCart[0].discountCode.id
                : '',
          },
        },
      ],
    };
    if (discountCodesCart && discountCodesCart[0]) {
      refreshTokenFlow(refreshToken).then((response) => {
        if (response) {
          updateCart(
            !isAuth ? anonymousCart.cartID : userCart.userCartId,
            deletePromocodeData,
            response.access_token
          ).then((responseTwo) => {
            dispatch(setCartItems(responseTwo?.body.lineItems));
            dispatch(setCartQuantity(responseTwo?.body.totalLineItemQuantity));
            dispatch(
              setCartPriceDiscount(responseTwo?.body.totalPrice.centAmount)
            );
            dispatch(setDiscountCodesCart(responseTwo?.body.discountCodes));
            dispatch(setPromocode(''));
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
    }
  };

  if (cartItems.length === 0 && discountCodesCart && discountCodesCart[0]) {
    deletePromocodeFromCart(
      !isAuth ? anonymousCart.anonymousRefreshToken : customerRefreshToken
    );
  }

  const deleteAllProducts = (refreshToken: string): void => {
    const deleteItemData: MyCartUpdate = {
      version: !isAuth
        ? anonymousCart.versionAnonCart
        : userCart.versionUserCart,
      actions: [],
    };
    cartItems.map((item) => {
      return deleteItemData.actions.push({
        action: 'removeLineItem',
        lineItemId: item.id,
        quantity: item.quantity,
      });
    });
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

  const itemCartCards = cartItems.map((card, i) => {
    return (
      <CartProduct
        name={card.name['en-US']}
        key={`card_${i}`}
        sku={card.variant.sku ? card.variant.sku : ''}
        images={card.variant.images}
        discounted={
          card.variant.prices && card.variant.prices[0]
            ? card.variant.prices[0].discounted?.value.centAmount
            : 0
        }
        prices={
          card.variant.prices ? card.variant.prices[0].value.centAmount : 0
        }
        onDelete={debounce((): void => {
          deleteItem(
            card.id,
            card.quantity,
            !isAuth ? anonymousCart.anonymousRefreshToken : customerRefreshToken
          );
        }, 500)}
        quantity={card.quantity}
        reduceQuantity={debounce(
          (): void =>
            deleteItem(
              card.id,
              1,
              !isAuth
                ? anonymousCart.anonymousRefreshToken
                : customerRefreshToken
            ),
          500
        )}
        increaseQuantity={debounce(
          (): void =>
            increaseItem(
              card.variant.sku ? card.variant.sku : '',
              !isAuth
                ? anonymousCart.anonymousRefreshToken
                : customerRefreshToken
            ),
          500
        )}
      ></CartProduct>
    );
  });
  return (
    <div className={style.cart_wrapper}>
      <h2 className={style.cart_title}>Your cart, dear - customer name here</h2>
      <div className={style.cards}>{itemCartCards}</div>
      <div className={style.cart_price_wrapper}>
        <div className={style.cart_price_name}>Total Price</div>
        <div className={style.cart_price_amount}>
          {(cartPrice / 100).toFixed(2)}$
        </div>
      </div>
      <div className={style.cart_discount_codes}>
        <div className={style.cart_discount}>
          <input
            onChange={(event): void => addDiscountCode(event)}
            type="text"
            placeholder="type discount here"
            value={promocode}
          />
          <button
            onClick={debounce(
              (): void =>
                setPromocodeToCart(
                  !isAuth
                    ? anonymousCart.anonymousRefreshToken
                    : customerRefreshToken
                ),
              500
            )}
            className={style.cart_discount_button}
            disabled={
              discountCodesCart?.length ? true : !promocode ? true : false
            }
          >
            Apply
          </button>
          <button
            onClick={debounce(
              (): void =>
                deletePromocodeFromCart(
                  !isAuth
                    ? anonymousCart.anonymousRefreshToken
                    : customerRefreshToken
                ),
              500
            )}
            className={style.cart_discount_button}
            // disabled={
            //   discountCodesCart?.length ? true : !promocode ? true : false
            // }
          >
            Delete
          </button>
        </div>
      </div>
      <div className={style.cart_discount_black}>
        *If you have a black T-Shirt in your cart make sure to add one more and
        to get them by cost of one.
      </div>
      <div className={style.cart_price_wrapper}>
        <div className={style.cart_price_name}>
          Total Price with applied Discount
        </div>
        <div className={style.cart_discount_price}>
          {cartPriceDiscount
            ? (cartPriceDiscount / 100).toFixed(2)
            : (cartPrice / 100).toFixed(2)}
          $
        </div>
      </div>
      <div className={style.cart_clear}>
        <button
          onClick={(): void =>
            deleteAllProducts(
              !isAuth
                ? anonymousCart.anonymousRefreshToken
                : customerRefreshToken
            )
          }
          className={style.cart_buy}
        >
          Delete all products
        </button>
      </div>

      <div className={style.cart_buy_sloth}>
        <button className={style.cart_buy}>Buy</button>
        <div className={style.cart_cybersloth}></div>
      </div>
    </div>
  );
}
export default CartPage;
