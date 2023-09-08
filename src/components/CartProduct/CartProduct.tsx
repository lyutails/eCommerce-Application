import { CartProductProps } from '../../types/types';
import style from './_cart_product.module.scss';

export function CartProduct(props: CartProductProps): JSX.Element {
  if (!props.images) {
    throw new Error('no images found');
  }
  return (
    <div className={style.cartproduct_wrapper}>
      <div className={style.cartproduct_item}>
        <input
          name="cartproductItem"
          type="checkbox"
          // id={brand}
          onChange={(): void => {}}
        />
        <div className={style.cartproduct_name}>{props.sku}Name Here</div>
        <img
          className={style.cartproduct_pic}
          src={props.images[0].url}
          alt=""
        />
        <div className={style.cartproduct_product_counter}>
          <button className={style.cartproduct_minus}>-</button>
          <div className={style.cartproduct_product_amount}>0</div>
          <button className={style.cartproduct_plus}>+</button>
        </div>
        <div className={style.cartproduct_product_price}>
          {props.discounted ? props.discounted : props.prices}
        </div>
        <button className={style.cartproduct_delete}></button>
      </div>
    </div>
  );
}
