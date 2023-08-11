import style from './_app.module.scss';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthPage from '../pages/Auth/Auth';
import RegistrationPage from '../pages/Registration/Registration';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import NotFoundPage from '../pages/NotFound/NotFound';
import Main from '../pages/Main/Main';
import AboutUsPage from '../pages/AboutUs/AboutUs';
import BasketPage from '../pages/Basket/Basket';
import CustomizePage from '../pages/Customize/Customize';
import ProfilePage from '../pages/Profile/Profile';
import { IRootState } from '../types/interfaces';
import CategoryPage from '../pages/Category/Category';
import Card from '../components/Card/Card';

function App(): JSX.Element {
  const isAuth = useSelector((state: IRootState) => state.user.isAuth);
  return (
    <section className={style.app}>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/customize" element={<CustomizePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/category/:category/:id" element={<Card />} />
        <Route path="*" element={<NotFoundPage />} />
        {isAuth === false ? (
          <>
            <Route path="/profile" element={<AuthPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
          </>
        ) : (
          <>
            <Route path="/profile" element={<ProfilePage />} />
          </>
        )}
      </Routes>
      <Footer />
    </section>
  );
}
export default App;
