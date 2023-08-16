import '../../style/variables.scss';
import style from './_header.module.scss';
import { logo } from './logo';
import { Link, NavLink } from 'react-router-dom';
import { IRootState } from '../../types/interfaces';
import { useSelector } from 'react-redux';

const cartCounter = 0;
const walletCost = 0;

function Header(): JSX.Element {
  const isAuth = useSelector((state: IRootState) => state.user.isAuth);
  return (
    <div className={style.header}>
      <div className={style.header_wrapper}>
        <Link className={style.logo} to="/">
          {logo}
        </Link>
        <div className={style.header_categories}>
          <ul className={style.header_menu}>
            <li className={style.header_menu_item}>
              <NavLink className={style.header_menu_link} to="/">
                Main
              </NavLink>
            </li>
            <li className={style.header_menu_item}>
              <NavLink className={style.header_menu_link} to="/catalog">
                Catalog
              </NavLink>
            </li>
            <li className={style.header_menu_item}>
              <NavLink className={style.header_menu_link} to="/customize">
                Customize
              </NavLink>
            </li>
            <li className={style.header_menu_item}>
              <NavLink className={style.header_menu_link} to="/about-us">
                About Us
              </NavLink>
            </li>
            <li className={style.header_menu_item}>
              <NavLink
                className={`${style.header_menu_link} ${style.header_cart}`}
                to="/cart"
              >
                <span
                  className={style.header_cart_counter}
                >{`${cartCounter}`}</span>
              </NavLink>
            </li>
            <li className={`${style.header_menu_item} ${style.sum}`}>
              {`${walletCost}`}$
            </li>
            <li className={style.header_menu_item}>
              <NavLink className={style.header_menu_link} to="/profile">
                {isAuth ? 'Profile' : 'LogIn'}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Header;
