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
import { getProducts } from '../../api/getProducts';

function CategoryPage(): JSX.Element {
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
          console.log(subtreeArray);
          const allProductsArray: ProductVariant[][] = [];
          subtreeArray.map((item) => {
            allProductsArray.push(item.variants);
          });
          setAllCards(allProductsArray.flat());
        });
      });
  }, [category, idCategory]);
  function paintProducts(name: string): void {
    console.log(subtree);
    subtree.map((data) => {
      if (name === data.name['en-US']) {
        setAllCards(data.variants);
        console.log(data.variants, 'lalala');
      }
    });
  }
  return (
    <div className={style.container}>
      <h2 className={style.title}>{category}</h2>
      <div className={style.catalog_categories}>
        {subtree.map((subCategory) => {
          return (
            <button
              onClick={(): void => paintProducts(subCategory.name['en-US'])}
              className={style.catalog_category}
              key={subCategory.name['en-US']}
            >
              {subCategory.name['en-US']}
            </button>
          );
        })}
      </div>
      {/* <div className={style.catalog_categories}>
        {allCards.map((card) => {
          return (
            <Link
              to={card.key}
              className={style.catalog_category}
              key={card.key}
            >
              {card.key}
            </Link>
          );
        })}
      </div> */}
    </div>
  );
}
export default CategoryPage;

{
  /* <div className={style.containerMenu}>
                    {menuList.map((item, index) => {
                        const {id, idx, img, name, description, price, weight} = item;
                        return(
                            <Link to = {/products/${id}} key= {index}>
                            <Card
                                idx = {idx}
                                id={id}
                                img={img}
                                name ={name}
                                description ={description}
                                price ={price}
                                weight ={weight}
                            />
                            </Link>
                        );
                    })}
                </div> */
}
