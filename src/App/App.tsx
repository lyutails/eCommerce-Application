import style from './_app.module.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Auth from '../pages/Auth/Auth';
import Registration from '../pages/Registration/Registration';
import NotFound from '../pages/NotFound/NotFound';
import Main from '../pages/Main/Main';
import AboutUs from '../pages/AboutUs/AboutUs';
import Customize from '../pages/Customize/Customize';
import Profile from '../pages/Profile/Profile';
import { IRootState } from '../types/interfaces';
import Catalog from '../pages/Catalog/Catalog';
import { Layout } from '../components/Layout/Layout';
import Category from '../pages/Category/Category';
import Product from '../components/Product/Product';
import Cart from '../pages/Cart/Cart';

function App(): JSX.Element {
  const isAuth = useSelector((state: IRootState) => state.user.isAuth);
  return (
    <section className={style.app}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/customize" element={<Customize />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:category" element={<Category />} />
          <Route path="/category/:category/:id" element={<Product />} />
          <Route
            path="/profile"
            element={
              isAuth ? <Profile /> : <Navigate to={'/login'} replace />
            }
          />
          <Route
            path="/registration"
            element={
              isAuth ? <Navigate to={'/login'} replace /> : <Registration />
            }
          />
          <Route path="/login" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </section>
  );
}
export default App;
