import {
  GetParentCategory,
  getSubtreeCategory,
  returnProductsByCategoryKey,
} from '../../api/getCategories';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import style from '../Category/_category.module.scss';
import {
  Category,
  ProductProjection,
  ProductVariant,
} from '@commercetools/platform-sdk';
import Card from './Card';
import {
  getProductProjectionsByKey,
  getProductProjectionsByVariantKey,
} from '../../api/getProducts';

function CategoryPage(): JSX.Element {
  const productVariantKey = 't-shirt-bug';
  console.log(getProductProjectionsByKey(productVariantKey), 'lalala');
  const { category } = useParams();
  const [idCategory, setIdcategoty] = useState('');
  const [subtree, setSubtree] = useState<Category[]>([]);
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
        const categoryId = response.body.id;
        setIdcategoty(response.body.id);
        GetParentCategory().then((response) => {
          const bodyResults = response.body.results;
          const onlyWithAncestors = bodyResults.filter((data) => {
            return data.ancestors.length && data.ancestors[0].id === categoryId;
          });
          setSubtree(onlyWithAncestors);
          console.log(onlyWithAncestors);
        });
        // create function to get subcat
        getSubtreeCategory(response.body.id).then((data) => {
          console.log(data);
          // const subtreeArray = data.body.results;
          // setSubtree(subtreeArray);
          // const allProductsArray: ProductVariant[][] = [];
          // subtreeArray.map((item) => {
          //   allProductsArray.push(item.variants);
          // });
          // setAllCards(allProductsArray.flat());
        });
      });
  }, [category, idCategory]);

  function paintProducts(name: string): void {
    // console.log(subtree);
    subtree.map((data) => {
      console.log(data);
      // if (name === data.name['en-US']) {
      //   setAllCards(data.variants);
      //   // console.log(data.variants, 'lalala');
      // }
    });
  }
  return (
    <div className={style.category_wrapper}>
      <h2 className={style.category_title}>{category}</h2>
      <div className={style.category_categories}>
        {subtree.map((subCategory) => {
          console.log(subCategory);
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
      <div className={style.category_cards_wrapper}>
        {allCards.map((card) => {
          if (!card.key) {
            throw new Error('no card with such key found out there');
          }
          if (!card.prices) {
            throw new Error('no card prices found out there');
          }
          if (!card.prices[0].value) {
            throw new Error('no prices value found out there');
          }
          // const { key } = card;
          if (!card.images) {
            throw new Error('no card images found out there');
          }
          if (!card.sku) {
            throw new Error('no card images found out there');
          }
          const brandItem = card.attributes?.map(
            (item): string =>
              item.name === 'brand' && item.value && String(item.value)
          );
          const brandName = brandItem?.find((item) => item);
          return (
            <Link
              to={`/category/${category}/${card.key}`}
              className={style.category_card}
              key={card.key}
            >
              <Card
                keyCard={card.key}
                images={card.images[0].url}
                prices={card.prices[0].value.centAmount}
                discounted={
                  card.prices[0].discounted?.value.centAmount
                    ? card.prices[0].discounted?.value.centAmount
                    : ''
                }
                sku={card.sku}
                brand={brandName}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default CategoryPage;
