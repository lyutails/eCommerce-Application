import { Link } from 'react-router-dom';
import style from './_catalog.module.scss';
import { useEffect, useState } from 'react';
import { GetParentCategory } from '../../api/getCategories';
import { Category } from '@commercetools/platform-sdk';
import { useDispatch } from 'react-redux';
import { createCategory } from '../../store/reducers/categoryReducer';

function CatalogPage(): JSX.Element {
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    GetParentCategory().then((response) => {
      const parentCategory = response.body.results;
      const onlyWithoutAncestors = parentCategory.filter(
        (data) => data.ancestors.length === 0
      );
      setAllCategories(onlyWithoutAncestors);
      const subCategories = onlyWithoutAncestors.map(
        (categoryItem) => categoryItem?.name['en-US']
      );
      dispatch(createCategory(subCategories));
    });
  }, [dispatch]);
  return (
    <div className={style.catalog} data-testid="catalog-component">
      <div className={style.catalog_wrapper}>
        <div className={style.catalog_categories_block}>
          <h1 className={style.catalog_title}>
            Awesome RSSchool Merch Categories
          </h1>
          <div className={style.catalog_categories}>
            {allCategories.map((category) => {
              return (
                <Link
                  to={category.name['en-US']}
                  className={style.catalog_category}
                  key={category.name['en-US']}
                >
                  <div className={style.catalog_category_title}>
                    {category.name['en-US']}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <Link to="/customize">
          <div className={`${style.catalog_advertisment} ${style.customize}`}>
            <div className={style.catalog_sloth_left}></div>
            <div className={style.catalog_advertisment_text}>
              Pick and CUSTOMIZE RSSchool MERCHBAR&apos;s cool products by your
              own with RSSchool amazing merch... have fun \o/
            </div>
            <div className={style.catalog_sloth_right}></div>
          </div>
        </Link>
      </div>
    </div>
  );
}
export default CatalogPage;
