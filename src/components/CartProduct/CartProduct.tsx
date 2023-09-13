import { throwNewError } from '../../utils/throwNewError';
import { CartProductProps } from '../../types/types';
import style from './_cart_product.module.scss';

export function CartProduct(props: CartProductProps): JSX.Element {
  if (!props.images) {
    throwNewError('no product images for cart product found');
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
        <div
          className={style.cartproduct_name}
        >{`${props.sku} ${props.name}`}</div>
        <img
          className={style.cartproduct_pic}
          src={props.images[0].url}
          alt=""
        />
        <div className={style.cartproduct_product_counter}>
          <button className={style.cartproduct_minus}>-</button>
          <div className={style.cartproduct_product_amount}>
            {props.quantity}
          </div>
          <button className={style.cartproduct_plus}>+</button>
        </div>
        <div className={style.cartproduct_product_price}>
          {props.discounted
            ? Number(props.discounted) / 100
            : Number(props.prices) / 100}
          $
        </div>
        <button
          onClick={props.onDelete}
          className={style.cartproduct_delete}
        ></button>
      </div>
    </div>
  );
}
