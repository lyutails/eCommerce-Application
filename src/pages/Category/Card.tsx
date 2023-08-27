import { CategoryCardProps } from '../../types/types';
import style from './_card.module.scss';

function Card(props: CategoryCardProps): JSX.Element {
  console.log(props.keyCard);
  return (
    <div className={style.card_wrapper}>
      <div className={style.card_card}>
        <h2 className={style.card_name} id={props.keyCard}>
          {props.keyCard}
        </h2>
        <img className={style.card_pic} src={props.images} alt="" />
        <div className={style.card_buy}>
          <span className={style.card_to_cart}></span>
          <span className={style.card_price}>{props.prices}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
