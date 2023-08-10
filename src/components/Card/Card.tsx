import style from '../Card/_card.scss';

function Card(): JSX.Element {
  return (
    <div className={style.container}>
      <h2 className={style.title}>Profile</h2>
    </div>
  );
}
export default Card;
