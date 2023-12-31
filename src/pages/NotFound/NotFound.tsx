import { useNavigate } from 'react-router-dom';
import style from '../NotFound/_not-found.module.scss';

function NotFoundPage(): JSX.Element {
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
          <p className={style.text}>
            You have lost your way - the page you are looking for is not found
            out there
          </p>
          <button onClick={handleNotFound} className={style.button}>
            go back
          </button>
        </div>
      </div>
    </section>
  );
}
export default NotFoundPage;
