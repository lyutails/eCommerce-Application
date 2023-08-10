import { useNavigate } from 'react-router-dom';
import style from '../NotFound/_not-found.module.scss';

function NotFoundPage(): JSX.Element {
  const navigate = useNavigate();
  const goBack = (): void => navigate(-1);
  const handelNotFound = (): void => {
    goBack();
  };
  return (
    <section className={style.container}>
      <div>
        <h1 className={style.title}>404</h1>
        <div className={style.bottom}>
          <p>You have lost your way</p>
          <button onClick={handelNotFound}>go back</button>
        </div>
      </div>
    </section>
  );
}
export default NotFoundPage;
