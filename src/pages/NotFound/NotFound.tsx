import { Link } from 'react-router-dom';
import style from '../NotFound/_not-found.module.scss';

function NotFoundPage(): JSX.Element {
  return (
    <section className="errorbody">
      <div className={style.message}>
        <h1>404</h1>
        <div className={style.bottom}>
          <p>You have lost your way</p>
          <Link to="#">return home</Link>
        </div>
      </div>
    </section>
  );
}
export default NotFoundPage;
