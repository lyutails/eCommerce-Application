import '../../style/variables.scss';
import style from './_header.module.scss';
import { logo } from './logo';
import { Link, NavLink } from 'react-router-dom';
import { IRootState } from '../../types/interfaces';
import { useSelector } from 'react-redux';

function Header(): JSX.Element {
  const isAuth = useSelector((state: IRootState) => state.user.isAuth);
  const cartCounter = 0;
  const walletCost = 0;
  const nameRouteHeader = [
    'Main',
    'Catalog',
    'Customize',
    'About Us',
    'Cart',
    'walletCost',
    'Profile',
  ];
  const parhRouteHeader = [
    '/',
    '/catalog',
    '/customize',
    '/about-us',
    '/cart',
    'walletCost',
    '/profile',
  ];
  return (
    <div className={style.header}>
      <div className={style.header_wrapper}>
        <Link className={style.logo} to="/">
          {logo}
        </Link>
        <div className={style.header_categories}>
          <ul className={style.header_menu}>
            {nameRouteHeader.map((item, index) =>
              item === 'Profile' ? (
                <li className={style.header_menu_item} key={item}>
                  <NavLink
                    className={style.header_menu_link}
                    to={parhRouteHeader[index]}
                  >
                    {isAuth ? 'Profile' : 'LogIn'}
                  </NavLink>
                </li>
              ) : item === 'Cart' ? (
                <li className={style.header_menu_item} key={item}>
                  <NavLink
                    className={`${style.header_menu_link} ${style.header_cart}`}
                    to={parhRouteHeader[index]}
                  >
                    <span className={style.header_cart_counter}>
                      {cartCounter}
                    </span>
                  </NavLink>
                </li>
              ) : item === 'walletCost' ? (
                <li className={`${style.header_menu_item} ${style.sum}`}>
                  {`${walletCost}`}$
                </li>
              ) : (
                <li className={style.header_menu_item} key={item}>
                  <NavLink
                    className={style.header_menu_link}
                    to={parhRouteHeader[index]}
                  >
                    {item}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
