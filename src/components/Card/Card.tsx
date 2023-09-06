import { useEffect, useState } from 'react';
import { CategoryCardProps } from '../../types/types';
import style from './_card.module.scss';

function Card(props: CategoryCardProps): JSX.Element {
  const [currentImage, setCurrentImage] = useState<string>('');
  const [currentSecondImage, setCurrentSecondImage] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (!props.images) {
      throw new Error('no images found');
    }
    setCurrentImage(props.images[0].url);
  }, [props.images]);

  // useEffect(() => {
  //   if (!props.description) {
  //     throw new Error('no description found');
  //   }
  //   setDescription(props.description);
  // }, [props.description]);

  return (
    <div
      className={style.card_wrapper}
      onMouseEnter={(): void => {
        // if (!props.description) {
        //   throw new Error('no description found');
        // }
        // setDescription(props.description);
        if (!props.images) {
          throw new Error('no pic found');
        }
        setCurrentSecondImage(props.images[1].url);
      }}
      onMouseLeave={(): void => {
        setDescription('');
        setCurrentSecondImage('');
      }}
    >
      <button className={style.card_to_cart}>to Cart</button>
      <h2 className={style.card_name} id={props.keyCard}>
        <span>{props.sku}</span>
      </h2>
      <div className={style.card_description}>{description}</div>
      <img
        className={style.card_pic}
        src={currentSecondImage || currentImage}
        alt=""
      />
      <div className={style.card_buy}>
        <span className={style.card_price}>{props.prices}$</span>
        <span className={style.card_discount}>{props.discounted}</span>
      </div>
    </div>
  );
}

export default Card;
