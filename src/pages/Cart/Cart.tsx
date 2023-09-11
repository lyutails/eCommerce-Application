// import { CartProduct } from '../../components/CartProduct/CartProduct';
import style from './_cart.module.scss';

function CartPage(): JSX.Element {
  return (
    <div className={style.cart_wrapper}>
      <h2 className={style.cart_title}>Your cart, dear - customer name here</h2>
      {/* <CartProduct></CartProduct> */}
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
