import { ICartState, IRootState } from '../../types/interfaces';
import { useEffect } from 'react';
import style from './_cart.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAnonCart,
  getDiscountCodes,
  updateCart,
} from '../../api/existTokenFlow';
import { refreshTokenFlow } from '../../api/adminBuilder';
import { setAccessTokenStatus } from '../../store/reducers/userReducer';
import {
  changeAnonymousCart,
  setCartItems,
  setDiscountCodes,
} from '../../store/reducers/cartReducer';
import { CartProduct } from '../../components/CartProduct/CartProduct';

function CartPage(): JSX.Element {
  const dispatch = useDispatch();
  const { anonymousCart, userCart, cartItems, discountCodes } = useSelector(
    (state: ICartState) => state.cart
  );
  const { customerId, customerRefreshToken, accessToken } = useSelector(
    (state: IRootState) => state.user
  );
  const isAuth = useSelector((state: IRootState) => state.user.isAuth);

  // DELETE ITEM FROM CART
  const deleteItem = (itemId: string, quantity: number): void => {
    const deleteItemData = {
      version: anonymousCart.anonymousID
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
    updateCart(
      anonymousCart.anonymousID ? anonymousCart.cartID : userCart.userCartId,
      deleteItemData,
      anonymousCart.anonymousID
        ? anonymousCart.anonymousAccessToken
        : accessToken
    ).then((response) => {
      dispatch(setCartItems(response?.body.lineItems));
    });
  };
  const itemCartCards = cartItems.map((card, i) => {
    return (
      <CartProduct
        name={card.name['en-US']}
        key={`card_${i}`}
        sku={card.variant.sku ? card.variant.sku : ''}
        images={card.variant.images}
        discounted={card.variant.prices[0].value?.discounted}
        prices={card.variant.prices[0].value.centAmount}
        onDelete={(): void => {
          deleteItem(card.id, card.quantity);
        }}
        quantity={card.quantity}
      ></CartProduct>
    );
  });
  return (
    <div className={style.cart_wrapper}>
      <h2 className={style.cart_title}>Your cart, dear - customer name here</h2>
      <div className={style.cards}>{itemCartCards}</div>
      <div className={style.cart_price_wrapper}>
        <div className={style.cart_price_name}>Total Price</div>
        <div className={style.cart_price_amount}>total price paste here</div>
      </div>
      <div className={style.cart_discount_codes}>
        <div className={style.cart_discount}>Discount Codes</div>
        <div className={style.cart_discount_wrapper}>
          <div className={style.cart_discount_amount}>10%</div>
          <button className={style.cart_discount_name}>RSSchool</button>
        </div>
        <div className={style.cart_discount_wrapper}>
          <div className={style.cart_discount_amount}>30%</div>
          <button className={style.cart_discount_name}>trinity</button>
        </div>
        <input
          type="text"
          placeholder="type a discount code here"
          className={style.cart_discount_input}
        ></input>
      </div>
      <div className={style.cart_discount_black}>
        *If you have a black T-Shirt in your cart make sure to add one more and
        to get them by cost of one.
      </div>
      <div className={style.cart_price_wrapper}>
        <div className={style.cart_price_name}>
          Total Price with applied Discount
        </div>
        <div className={style.cart_discount_price}>total price paste here</div>
      </div>
      <div className={style.cart_buy_sloth}>
        <button className={style.cart_buy}>Buy</button>
        <div className={style.cart_cybersloth}></div>
      </div>
    </div>
  );
}
export default CartPage;
