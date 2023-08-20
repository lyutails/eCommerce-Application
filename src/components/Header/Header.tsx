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
  return (
    <div className={style.header}>
      <div className={style.header_wrapper}>
        <Link className={style.logo} to="/">
          {logo}
        </Link>
        <nav className={style.header_categories}>
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
        <div className={style.menu_hidden}></div>
        <div className={style.burger_menu}>
          <img
            className={style.burger_menu_img}
            src="./assets/burger/burger_icon_green_01.svg"
            alt="icon"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;

{
  /* <header class="header-container">
  <nav class="header-menu menu">
    <ul class="menu-list">
      <li class="menu-list_item">
        <a class="item-link item-link-active" href="#">
          About the shelter
        </a>
      </li>
      <li class="menu-list_item">
        <a class="item-link" href="./pages/OurPets.html">
          Our pets
        </a>
      </li>
      <li class="menu-list_item">
        <a class="item-link" href="#help">
          Help the shelter
        </a>
      </li>
      <li class="menu-list_item">
        <a class="item-link" href="#Contacts">
          Contacts
        </a>
      </li>
    </ul>
  </nav>
  <div class="menu-hidden"></div>
  <div class="burger-menu-block">
    <span class="burger-menu"></span>
  </div>
</header>; */
}
