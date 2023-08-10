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
    <div>
      <Header />
      <Routes>
        {isAuth === false ? (
          <>
            <Route path="/" element={<Main />} />
            <Route path="/customize" element={<CustomizePage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/basket" element={<BasketPage />} />
            <Route path="/profile" element={<AuthPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/category/:category/:id" element={<Card />} />
            <Route path="*" element={<NotFoundPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Main />} />
            <Route path="/customize" element={<CustomizePage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/basket" element={<BasketPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/category/:category/:id" element={<Card />} />
            <Route path="*" element={<NotFoundPage />} />
          </>
        )}
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
