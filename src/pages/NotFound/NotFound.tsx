import { useNavigate } from 'react-router-dom';
import style from '../NotFound/_not-found.module.scss';

function NotFound(): JSX.Element {
  const navigate = useNavigate();
  const goBack = (): void => navigate(-1);
  const handleNotFound = (): void => {
    goBack();
  };
  return (
    <section className={style.container}>
      <div>
        <h1 className={style.title}>404</h1>
        <div className={style.bottom}>
          <p>You have lost your way</p>
          <button onClick={handleNotFound}>go back</button>
        </div>
      </div>
    </section>
  );
}
export default NotFound;
