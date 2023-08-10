import style from './_app.module.scss';
import AuthPage from '../pages/Auth/Auth';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import NotFoundPage from '../pages/NotFound/NotFound';

function App(): JSX.Element {
  return (
    <div>
      <NotFoundPage />
    </div>
  );
}
export default App;
