import { CategoryCardProps } from '../../types/types';
import style from './_card.module.scss';

function Card(props: CategoryCardProps): JSX.Element {
  return (
    <div className={style.card_wrapper}>
      <button className={style.card_to_cart}>to Cart</button>
      <h2 className={style.card_name} id={props.keyCard}>
        <span>{props.sku}</span>
      </h2>
      <img className={style.card_pic} src={props.images} alt="" />
      <div className={style.card_buy}>
        <span className={style.card_price}>{props.prices}$</span>
        <span className={style.card_discount}>{props.discounted}$</span>
      </div>
    </div>
  );
}

export default Card;
