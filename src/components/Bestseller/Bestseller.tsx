import { useEffect, useState } from 'react';
import { BestsellerProps } from '../../types/types';
import style from './_bestseller.module.scss';
import { throwNewError } from '../../utils/throwNewError';
import { Link } from 'react-router-dom';

export function Bestseller(props: BestsellerProps): JSX.Element {
  const [currentImage, setCurrentImage] = useState<string>('');

  useEffect(() => {
    if (!props.images) {
      throwNewError('no images for catalog card found');
    }
    setCurrentImage(props.images[0].url);
  }, [props.images]);

  return (
    <Link to={`/main/${props.idBestseller}`} className={style.category_card}>
      <div className={style.bestseller_wrapper}>
        <div className={style.bestseller_name}>
          <span>{props.sku}</span>
        </div>
        <img
          className={style.bestseller_pic}
          src={currentImage}
          alt="bestseller pic"
        />
        <div className={style.bestseller_buy}>
          <span
            className={
              !props.discounted ? style.bestseller_price : style.linethrough
            }
          >
            {props.prices}$
          </span>
          <span className={style.bestseller_discount}>{props.discounted}</span>
        </div>
      </div>
    </Link>
  );
}
