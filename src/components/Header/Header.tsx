import '../../style/variables.scss';
import style from './_header.module.scss';
import { logo } from './logo';
import { Link } from 'react-router-dom';

const cartCounter = 0;
const walletCost = 0;

function Header(): JSX.Element {
  return (
    <div className={style.header}>
      <div className={style.header_wrapper}>
        <Link className={style.logo} to="/">
          {logo}
        </Link>
        <div className={style.header_categories}>
          <ul className={style.header_menu}>
            <li className={style.header_menu_item}>
              <Link to="/">Main</Link>
            </li>
            <li className={style.header_menu_item}>
              <Link to="/catalog">Catalog</Link>
            </li>
            <li className={style.header_menu_item}>
              <Link to="/customize">Customize</Link>
            </li>
            <li className={style.header_menu_item}>
              <Link to="/about-us">About Us</Link>
            </li>
            <li className={style.header_menu_item}>
              <Link to="/cart" className={style.header_cart}>
                <span className={style.header_cart_counter}>{`${cartCounter}`}</span>
              </Link>
            </li>
            <li className={`${style.header_menu_item} ${style.sum}`}>{`${walletCost}`}$</li>
            <li className={style.header_menu_item}>
              <Link to="/profile">LogIn</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Header;