import style from './_cart.module.scss';

function CartPage(): JSX.Element {
  return (
    <div className={style.container}>
      <h2 className={style.title}>Your cart, dear customer</h2>
    </div>
  );
}
export default CartPage;
