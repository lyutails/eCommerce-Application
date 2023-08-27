import {
  getSubtreeCategory,
  returnProductsByCategoryKey,
} from '../../api/getCategories';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import style from '../Category/_category.module.scss';
import { ProductProjection, ProductVariant } from '@commercetools/platform-sdk';
import Card from './Card';
import {
  getProductProjectionsByKey,
  getProductProjectionsByVariantKey,
} from '../../api/getProducts';

function CategoryPage(): JSX.Element {
  // const productId = 15;
  // // console.log(getProductProjectionsById(productId));
  // const productKey = 'red-t-shirts';
  // console.log(getProductProjectionsByKey(productKey));
  const productVariantKey = 'red-love';
  console.log(getProductProjectionsByVariantKey(productVariantKey));
  const { category } = useParams();
  const [idCategory, setIdcategoty] = useState('');
  const [subtree, setSubtree] = useState<ProductProjection[]>([]);
  const [allCards, setAllCards] = useState<ProductVariant[]>([]);
  useEffect(() => {
    if (!category) {
      throw new Error(`no categories found`);
    }
    returnProductsByCategoryKey(category?.toLowerCase())
      .then((response) => {
        return response;
      })
      .then((response) => {
        setIdcategoty(response.body.id);
        // create function to get subcat
        getSubtreeCategory(response.body.id).then((data) => {
          const subtreeArray = data.body.results;
          setSubtree(subtreeArray);
          // console.log(subtreeArray);
          const allProductsArray: ProductVariant[][] = [];
          subtreeArray.map((item) => {
            allProductsArray.push(item.variants);
          });
          setAllCards(allProductsArray.flat());
        });
      });
  }, [category, idCategory]);
  function paintProducts(name: string): void {
    // console.log(subtree);
    subtree.map((data) => {
      if (name === data.name['en-US']) {
        setAllCards(data.variants);
        // console.log(data.variants, 'lalala');
      }
    });
  }
  return (
    <div className={style.category_wrapper}>
      <h2 className={style.category_title}>{category}</h2>
      <div className={style.category_categories}>
        {subtree.map((subCategory) => {
          return (
            <button
              onClick={(): void => paintProducts(subCategory.name['en-US'])}
              className={style.category_button}
              key={subCategory.name['en-US']}
            >
              {subCategory.name['en-US']}
            </button>
          );
        })}
      </div>
      <div className={style.catalog_categories}>
        {allCards.map((card) => {
          if (!card.key) {
            throw new Error('no card with such key found out there');
          }
          if (!card.prices) {
            throw new Error('no card prices found out there');
          }
          if (!card.prices[0].value) {
            throw new Error('no card value found out there');
          }
          // const { key } = card;
          if (!card.images) {
            throw new Error('no card with such key found out there');
          }
          // console.log(card.key);
          return (
            <Link
              to={`/category/${category}/${card.key}`}
              className={style.catalog_category}
              key={card.key}
            >
              <Card
                keyCard={card.key}
                images={card.images[0].url}
                prices={card.prices[0].value.centAmount}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default CategoryPage;
