import { Link } from 'react-router-dom';
import style from './_catalog.module.scss';
import { useEffect, useState } from 'react';
import { GetParentCategory } from '../../api/getCategories';
import { Category } from '@commercetools/platform-sdk';
import { useDispatch } from 'react-redux';
import { createCategory } from '../../store/reducers/categoryReducer';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

function CatalogPage(): JSX.Element {
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    trackPromise(GetParentCategory()).then((response) => {
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

  const { promiseInProgress } = usePromiseTracker();

  return (
    <div className={style.catalog} data-testid="catalog-component">
      <div className={style.spinner}>
        {promiseInProgress === true ? (
          <div className={style.spinner_container}>
            <div className={style.spinner_wrapper}>
              <div className={style.spinner_text}>Loading...</div>
              <div className={style.spinner_icon}></div>
            </div>
            <div className={style.spinner_overlay}></div>
          </div>
        ) : null}
      </div>
      <div className={style.catalog_wrapper}>
        <div className={style.catalog_categories_block}>
          <h1 className={style.catalog_title}>
            Awesome RSSchool Merch Categories
          </h1>
          <div className={style.catalog_categories}>
            {allCategories.map((category) => {
              if (category.name['en-US'] !== 'Custom') {
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
              }
            })}
          </div>
        </div>
        <Link className={style.catalog_customize} to="/customize">
          <div className={`${style.catalog_advertisment} ${style.customize}`}>
            <div className={`${style.catalog_advertisment} ${style.customize}`}>
              <div className={style.catalog_advertisment_info}>
                <div className={style.catalog_glitch_container}>
                  <div className={style.catalog_advertisment_glitch}>
                    {/* <div className={style.catalog_advertisment_title}>CUSTOMIZE</div> */}
                    CUSTOMIZE
                    {/* <div className={style.catalog_advertisment_title}>CUSTOMIZE</div> */}
                  </div>
                </div>
                <div className={style.catalog_advertisment_text}>
                  Pick and CUSTOMIZE RSSchool MERCHBAR&apos;s cool products by
                  your own with RSSchool amazing merch... have fun \o/
                </div>
              </div>
              <div className={style.catalog_sloth_right}></div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
export default CatalogPage;
