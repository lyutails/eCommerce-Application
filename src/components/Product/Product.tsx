import style from './_product.module.scss';

function Product(): JSX.Element {
  return (
    <div className={style.container}>
      <h2 className={style.title}>Product</h2>
    </div>
  );
}
export default Product;
