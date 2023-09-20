import { useEffect, useState } from 'react';
import { BestsellerProps } from '../../types/types';
import style from './_bestseller.scss';
import { throwNewError } from '../../utils/throwNewError';

export function Bestseller(props: BestsellerProps): JSX.Element {
  const [currentImage, setCurrentImage] = useState<string>('');

  useEffect(() => {
    if (!props.images) {
      throwNewError('no images for catalog card found');
    }
    setCurrentImage(props.images[0].url);
  }, [props.images]);

  return (
    <div className={style.bestseller_wrapper}>
      <div className={style.card_name}>
        <span>{props.sku}</span>
      </div>
      <img className={style.card_pic} src={currentImage} alt="" />
    </div>
  );
}
