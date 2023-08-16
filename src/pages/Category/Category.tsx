import { useParams } from 'react-router-dom';
import style from '../Category/_category.module.scss';

function Category(): JSX.Element {
  const { category } = useParams();
  return (
    <div className={style.container}>
      <h2 className={style.title}>{category}</h2>
    </div>
  );
}
export default Category;
