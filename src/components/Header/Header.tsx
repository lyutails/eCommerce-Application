import '../../style/variables.scss';
import style from './_header.module.scss';
import { logo } from './logo';
import { Link } from 'react-router-dom';

const cartCounter = 0;
const walletCost = 0;

function Header(): JSX.Element {
  const filter = {
    filter:
      'drop-shadow(0 0 5px $glow-green) drop-shadow(0 0 10px $glow-green)',
  };
  return (
    <div className={style.header}>
      <div className={style.header_wrapper}>
        <a className={style.logo} style={filter} href="http://localhost:3001/">
          {logo}
        </a>
        <div className={style.header_categories}>
          <ul className={style.list}>
            <li className={style.main}>
              <Link to="/">Main</Link>
            </li>
            <li className={style.customize}>
              <Link to="/customize">Customize</Link>
            </li>
            <li className={style.aboutus}>
              <Link to="/about-us">About Us</Link>
            </li>
            <li className={style.cart}>
              <span className={style.cart_counter}>{`${cartCounter}`}</span>
            </li>
            <li className={style.sum}>{`${walletCost}`}$</li>
            <li className={style.login}>
              <Link to="/Authorization">LogIn</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Header;
