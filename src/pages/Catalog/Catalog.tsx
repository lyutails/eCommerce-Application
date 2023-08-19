import { Link } from 'react-router-dom';
import style from './_catalog.module.scss';
import { useEffect, useState } from 'react';
import { GetCategories } from '../../api/getCategories';

function CatalogPage(): JSX.Element {
  /* const category = useSelector((state: ICategoryState) => state.category); */
  const [allCategories, setAllCategories] = useState<string[]>([]);
  useEffect(() => {
    GetCategories().then((response) => {
      setAllCategories(response);
    });
  }, []);
  return (
    <div className={style.catalog}>
      <div className={style.catalog_wrapper}>
        <div className={style.catalog_categories_block}>
          <h1 className={style.catalog_title}>
            Awesome RSSchool Merch Categories
          </h1>
          <div className={style.catalog_categories}>
            {allCategories.map((category) => {
              return (
                <Link
                  to={category}
                  className={style.catalog_category}
                  key={category}
                >
                  {category}
                </Link>
              );
            })}
          </div>
        </div>
        <div className={style.catalog_advertisment}>
          your advertisment can be here ^^
        </div>
        <div className={style.catalog_slider}>
          <div className={`${style.catalog_arrow} ${style.left}`}></div>
          <div className={style.catalog_slide}>slider product</div>
          <div className={style.catalog_slide}>slider product</div>
          <div className={style.catalog_slide}>slider product</div>
          <div className={style.catalog_slide}>slider product</div>
          <div className={`${style.catalog_arrow} ${style.right}`}></div>
        </div>
      </div>
    </div>
  );
}
export default CatalogPage;
