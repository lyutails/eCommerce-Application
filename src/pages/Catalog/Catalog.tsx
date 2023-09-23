import { Link } from 'react-router-dom';
import style from './_catalog.module.scss';
import { useEffect, useState } from 'react';
import { GetParentCategory } from '../../api/getCategories';
import { Category, ProductVariant } from '@commercetools/platform-sdk';
import { useDispatch } from 'react-redux';
import { createCategory } from '../../store/reducers/categoryReducer';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import CatalogCategoryParalax from '../../components/CatalogCategoryParalax/CatalogCategoryParalax';
import { getBestsellers } from '../../api/getBestsellers';
import { Bestseller } from '../../components/Bestseller/Bestseller';

function CatalogPage(): JSX.Element {
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [allBestsellers, setAllBestsellers] = useState<ProductVariant[]>([]);
  const [sliceBestseller, setSliceBestseller] = useState<ProductVariant[]>([]);
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

  useEffect(() => {
    const bestsellersInterval = setInterval(() => {
      setSliceBestseller(
        allBestsellers.sort(() => Math.random() - 0.5).slice(0, 4)
      );
    }, 2000);
    return () => {
      clearInterval(bestsellersInterval);
    };
  }, [allBestsellers]);

  useEffect(() => {
    getBestsellers().then((data) => {
      const allResults = data.body.results;
      let product = [];
      product = allResults.map((item) => item.masterVariant);
      setAllBestsellers(product);
    });
  }, []);

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
          <div>
            <CatalogCategoryParalax />
          </div>
          <div className={style.catalog_categories}>
            {/* {allCategories.map((category) => {
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
            })} */}
          </div>
        </div>
        {/* <Link className={style.catalog_customize} to="/customize">
          <div className={`${style.catalog_advertisment} ${style.customize}`}>
            <div className={`${style.catalog_advertisment} ${style.customize}`}>
              <div className={style.catalog_advertisment_info}>
                <div className={style.catalog_glitch_container}>
                  <div className={style.catalog_advertisment_glitch}>
                    CUSTOMIZE
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
        </Link> */}
      </div>
      <div className={style.main_bestsellers}>
        {sliceBestseller.map((card) => {
          let productPrice = 0;
          let productDiscount;
          let ifProductDiscount = 0;
          card.prices
            ? (productPrice = card.prices[0].value.centAmount / 100)
            : 0;
          card.prices && card.prices[0].discounted?.value.centAmount
            ? ((ifProductDiscount =
                card.prices[0].discounted?.value.centAmount / 100),
              (productDiscount = `${ifProductDiscount.toFixed(2)}$`))
            : '';
          return (
            <div className={style.bestseller_card} key={card.key}>
              <div className={style.bestseller_title}>Bestseller</div>
              <Bestseller
                images={card?.images}
                sku={card?.sku ? card.sku : ''}
                prices={productPrice.toFixed(2)}
                discounted={productDiscount}
                idBestseller={card?.key}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default CatalogPage;
