import '../../style/variables.scss';
import style from './_header.module.scss';
import { logo } from './logo';
import { Link, NavLink } from 'react-router-dom';
import { IRootState } from '../../types/interfaces';
import { useSelector } from 'react-redux';
import { useState } from 'react';

function Header(): JSX.Element {
  const isAuth = useSelector((state: IRootState) => state.user.isAuth);
  const cartCounter = 0;
  const walletCost = 0;
  const nameRouteHeader = [
    'Main',
    'Catalog',
    'Customize',
    'About Us',
    'Profile',
    'Cart',
    'walletCost',
  ];
  const parhRouteHeader = [
    '/',
    '/catalog',
    '/customize',
    '/about-us',
    '/profile',
    '/cart',
    'walletCost',
  ];
  const [activeBurger, SetActiveBurger] = useState(false);
  const handleToBurger = (): void => {
    SetActiveBurger(false);
  };
  const handleToBurgerOff = (): void => {
    SetActiveBurger(true);
  };
  return (
    <div className={style.header}>
      <div className={style.header_wrapper}>
        <Link className={style.logo} to="/">
          {logo}
        </Link>
        <nav className={style.header_categories}>
          <ul
            className={
              activeBurger
                ? `${style.header_menu}`
                : `${style.header_menu} ${style.header_menu_active}`
            }
          >
            {nameRouteHeader.map((item, index) =>
              item === 'Profile' ? (
                <li className={style.header_menu_item} key={item}>
                  <NavLink
                    onClick={handleToBurgerOff}
                    className={style.header_menu_link}
                    to={parhRouteHeader[index]}
                  >
                    {isAuth ? 'Profile' : 'LogIn'}
                  </NavLink>
                </li>
              ) : item === 'Cart' ? (
                <li className={style.header_menu_item} key={item}>
                  <NavLink
                    onClick={handleToBurgerOff}
                    className={`${style.header_menu_link} ${style.header_cart}`}
                    to={parhRouteHeader[index]}
                  >
                    <span className={style.header_cart_name}>Card</span>
                    <span className={style.header_cart_counter}>
                      {cartCounter}
                    </span>
                  </NavLink>
                </li>
              ) : item === 'walletCost' ? (
                <li
                  className={`${style.header_menu_item} ${style.sum}`}
                  key={item}
                >
                  {`${walletCost}`}$
                </li>
              ) : (
                <li className={style.header_menu_item} key={item}>
                  <NavLink
                    onClick={handleToBurgerOff}
                    className={style.header_menu_link}
                    to={parhRouteHeader[index]}
                  >
                    {item}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </nav>
        <div
          onClick={handleToBurger}
          className={
            activeBurger
              ? `${style.burger_menu}`
              : `${style.burger_menu} ${style.burger_menu_active}`
          }
        >
          <img
            className={style.burger_menu_img}
            src="./assets/burger/burger_icon_green_little.svg"
            alt="icon"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
