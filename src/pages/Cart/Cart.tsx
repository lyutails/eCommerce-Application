import style from './_cart.module.scss';

function Cart(): JSX.Element {
  return (
    <div className={style.container}>
      <h2 className={style.title}>Your cart, dear customer</h2>
    </div>
  );
}
export default Cart;
