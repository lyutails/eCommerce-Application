import { useParams } from 'react-router-dom';
import style from '../Product/_product.module.scss';

function ProductPage(): JSX.Element {
  const { id } = useParams();
  return (
    <div className={style.container}>
      <h2 className={style.title}>Product</h2>
    </div>
  );
}
export default ProductPage;
