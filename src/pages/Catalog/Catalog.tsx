import { Link } from 'react-router-dom';
import style from './_catalog.module.scss';
import { useEffect, useState } from 'react';
import {
  GetCategories,
  GetCategory,
  GetParentCategory,
  getSubCategory,
  getSubtreeCategory,
  returnProductsByCategoryKey,
} from '../../api/getCategories';
import { Category, ClientResponse } from '@commercetools/platform-sdk';

function CatalogPage(): JSX.Element {
  /* const category = useSelector((state: ICategoryState) => state.category); */
  // const [allCategories, setAllCategories] = useState<string[]>([]);
  // useEffect(() => {
  //   GetCategories().then((response) => {
  //     setAllCategories(response);
  //   });
  // }, []);
  // const [particularCategories, setParticularCategory] = useState<string[]>([]);
  // useEffect(() => {
  //   GetCategory().then((response) => {
  //     setAllCategories(response);
  //   });
  // }, []);
  // console.log(GetCategory());
  // console.log(GetCategories());
  // console.log(GetParentCategory());
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  useEffect(() => {
    GetParentCategory().then((response) => {
      const parentCategory = response.body.results;
      const onlyWithoutAncestors = parentCategory.filter(
        (data) => data.ancestors.length === 0
      );
      setAllCategories(onlyWithoutAncestors);
    });
  }, []);
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
                  {category.name['en-US']}
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
        <div className={style.catalog_slider}>
          <div className={`${style.catalog_arrow} ${style.left}`}></div>
          <div className={style.catalog_slide}>
            <div className={`${style.catalog_slide_pic} ${style.one}`}></div>
          </div>
          <div className={style.catalog_slide}>
            <div className={`${style.catalog_slide_pic} ${style.two}`}></div>
          </div>
          <div className={style.catalog_slide}>
            <div className={`${style.catalog_slide_pic} ${style.three}`}></div>
          </div>
          <div className={style.catalog_slide}>
            <div className={`${style.catalog_slide_pic} ${style.four}`}></div>
          </div>
          <div className={`${style.catalog_arrow} ${style.right}`}></div>
        </div>
      </div>
    </div>
  );
}
export default CatalogPage;
