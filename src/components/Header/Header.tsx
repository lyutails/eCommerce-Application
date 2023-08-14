import '../../style/variables.scss';
import style from './_header.module.scss';
import { logo } from './logo';
import { NavLink } from 'react-router-dom';

const cartCounter = 0;
const walletCost = 0;

function Header(): JSX.Element {
  return (
    <div className={style.header}>
      <div className={style.header_wrapper}>
        <NavLink className={style.logo} to="/">
          {logo}
        </NavLink>
        <div className={style.header_categories}>
          <ul className={style.list}>
            <li className={style.main}>
              <NavLink to="/">Main</NavLink>
            </li>
            <li className={style.customize}>
              <NavLink to="/catalog">Catalog</NavLink>
            </li>
            <li className={style.customize}>
              <NavLink to="/customize">Customize</NavLink>
            </li>
            <li className={style.aboutus}>
              <NavLink to="/about-us">About Us</NavLink>
            </li>
            <li>
              <NavLink className={style.cart} to="/basket">
                <span className={style.cart_counter}>{`${cartCounter}`}</span>
              </NavLink>
            </li>
            <li className={style.sum}>{`${walletCost}`}$</li>
            <li className={style.login}>
              <NavLink to="/profile">LogIn</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Header;
