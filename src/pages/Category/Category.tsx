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
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
  ProductVariant,
} from '@commercetools/platform-sdk';
import Card from './Card';
import {
  getProductProjectionsByKey,
  getProductProjectionsByVariantKey,
} from '../../api/getProducts';
import { filterByColour } from '../../api/filterColour';

function CategoryPage(): JSX.Element {
  // const productVariantKey = 't-shirt-bug';
  // console.log(getProductProjectionsByKey(productVariantKey), 'lalala');
  const { category } = useParams();
  const [idCategory, setIdcategoty] = useState('');
  const [subtree, setSubtree] = useState<Category[]>([]);
  const [allCards, setAllCards] = useState<ProductVariant[]>([]);
  const [allProducts, setAllProducts] = useState<ProductProjection[]>([]);
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
        });
        // create function to get subcat
        getSubtreeCategory(response.body.id).then((data) => {
          const subtreeArray = data.body.results;
          const allSubTreeArray = subtreeArray.map((item) => {
            return item.masterVariant;
          });
          setAllProducts(subtreeArray);
          setAllCards(allSubTreeArray);
          // const allProductsArray: ProductVariant[][] = [];
          // subtreeArray.map((item) => {
          //   allProductsArray.push(item);
          // });
          // setAllCards(subtreeArray);
        });
      });
  }, [category, idCategory]);

  function paintProducts(name: string): void {
    subtree.map((data) => {
      // console.log(allProducts);
      if (name === data.name['en-US']) {
        console.log(allProducts);
        const variantsProducts: ProductVariant[] = [];
        allProducts.forEach((item) => {
          if (item.categories[0].id === data.id) {
            console.log(item.variants);
            variantsProducts.push(...item.variants);
          }
        });
        console.log(variantsProducts);
        setAllCards(variantsProducts);
        // console.log(data.variants, 'lalala');
      }
    });
  }

  const [allVariants, setAllVariants] = useState<ProductVariant[]>([]);

  useEffect(() => {
    filterByColour().then((response) => {
      const parentCategory = response.body.results;
      // setAllVariants(parentCategory);
    });
  }, []);
  console.log(allVariants, 'variants');

  return (
    <div className={style.category_wrapper}>
      <h2 className={style.category_title}>{category}</h2>
      <div className={style.category_filters_color}>
        <button
          onClick={(): void => {
            const productVariant = filterByColour();
            console.log(productVariant);
            setAllCards(allVariants);
          }}
          className={style.category_filters_red}
        ></button>
        <button className={style.category_filters_black}></button>
        <button className={style.category_filters_discount}>discount</button>
      </div>
      <div className={style.category_categories}>
        {subtree.map((subCategory) => {
          // console.log(subCategory);
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
          console.log(card);
          return (
            <Link
              to={`/category/${category}/${card.key}`}
              className={style.category_card}
              key={card.key}
            >
              <Card
                keyCard={card.key ? card.key : ''}
                images={card.images && card.images[0].url}
                prices={
                  card.prices && card.prices[0].value
                    ? card.prices[0].value.centAmount
                    : 0
                }
                discounted={
                  card.prices && card.prices[0].discounted?.value.centAmount
                    ? card.prices[0].discounted?.value.centAmount
                    : ''
                }
                sku={card.sku ? card.sku : ''}
                brand={''}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default CategoryPage;
