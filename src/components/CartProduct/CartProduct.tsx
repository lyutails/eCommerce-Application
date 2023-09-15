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
        <div className={style.cartproduct_name}>{`${props.sku}`}</div>
        <img
          className={style.cartproduct_pic}
          src={props.images[0].url}
          alt=""
        />
        <div className={style.cartproduct_product_counter}>
          <button
            onClick={props.reduceQuantity}
            className={`${style.cartproduct_counter_button} ${style.minus}`}
          ></button>
          <div className={style.cartproduct_product_amount}>
            {props.quantity}
          </div>
          <button
            onClick={props.increaseQuantity}
            className={`${style.cartproduct_counter_button} ${style.plus}`}
          ></button>
        </div>
        <div className={style.cartproduct_product_price}>
          {props.discounted
            ? (Number(props.discounted) / 100).toFixed(2)
            : (Number(props.prices) / 100).toFixed(2)}
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
