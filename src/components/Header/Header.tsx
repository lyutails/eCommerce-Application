import '../../style/variables.scss';
import style from './_header.module.scss';
import { logo } from './logo';
import { Link, NavLink } from 'react-router-dom';
import { ICartState, IRootState } from '../../types/interfaces';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import iconBurger from '../../../public/assets/burger/burger_icon_green_01.svg';

function Header(): JSX.Element {
  const { isAuth, customerId } = useSelector((state: IRootState) => state.user);
  const { cartPrice, cartQuantity, cartPriceDiscount } = useSelector(
    (state: ICartState) => state.cart
  );
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
    `/profile/${customerId}`,
    '/cart',
    'walletCost',
  ];
  const [activeBurger, SetActiveBurger] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const handleToBurger = (): void => {
    SetActiveBurger(true);
  };
  const handleToBurgerOff = (): void => {
    SetActiveBurger(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        setIsScroll(window.pageYOffset > 0);
      });
    }
  }, []);

  return (
    <div id="header" className={`${style.header} ${isScroll && style.sticky}`}>
      <div className={style.header_wrapper}>
        <Link className={style.logo} to="/">
          {logo}
        </Link>
        <nav className={style.header_categories}>
          <ul
            onClick={handleToBurgerOff}
            aria-hidden="true"
            className={
              activeBurger
                ? `${style.header_menu} ${style.header_menu_active}`
                : `${style.header_menu} `
            }
          >
            {nameRouteHeader.map((item, index) => {
              return item === 'Profile' ? (
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
                    <span className={style.header_cart_name}>Cart</span>
                    <span className={style.header_cart_counter}>
                      {cartQuantity ? cartQuantity : 0}
                    </span>
                  </NavLink>
                </li>
              ) : item === 'walletCost' ? (
                <li
                  className={`${style.header_menu_item} ${style.sum}`}
                  key={item}
                >
                  {cartPriceDiscount
                    ? (cartPriceDiscount / 100).toFixed(2)
                    : (cartPrice / 100).toFixed(2)}
                  $
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
              );
            })}
          </ul>
        </nav>
        <button
          onClick={handleToBurger}
          className={
            activeBurger
              ? `${style.burger_menu} ${style.burger_menu_active}`
              : `${style.burger_menu} `
          }
        >
          <img className={style.burger_menu_img} src={iconBurger} alt="icon" />
        </button>
      </div>
    </div>
  );
}

export default Header;
