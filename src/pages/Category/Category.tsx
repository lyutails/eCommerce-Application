/* eslint-disable jsx-a11y/label-has-associated-control */
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
import { filterByColour, getProductType } from '../../api/filterColour';
import {
  Colours,
  Sizes,
  SubCategories,
  SubcategoriesIDs,
} from '../../types/enums';

function CategoryPage(): JSX.Element {
  // const productVariantKey = 't-shirt-bug';
  // console.log(getProductProjectionsByKey(productVariantKey), 'lalala');
  const { category } = useParams();
  const [idCategory, setIdcategoty] = useState('');
  const [subtree, setSubtree] = useState<Category[]>([]);
  const [allCards, setAllCards] = useState<ProductVariant[]>([]);
  const [allProducts, setAllProducts] = useState<ProductProjection[]>([]);
  const [allVariants, setAllVariants] = useState<ProductVariant[]>([]);
  const [allColours, setAllColours] = useState<string[]>([]);
  const [allSizes, setAllSizes] = useState<string[]>([]);
  const [bestseller, setBestseller] = useState<string>('false');
  const [sale, setSale] = useState<string>('false');
  const [colourFilterRed, setColourFilterRed] = useState({
    name: Colours.red,
    flag: false,
  });
  const [colourFilterBlack, setColourFilterBlack] = useState({
    name: Colours.black,
    flag: false,
  });
  const [colourFilterWhite, setColourFilterWhite] = useState({
    name: Colours.white,
    flag: false,
  });
  const [subcategoryMouses, setSubcategoryMouses] = useState({
    name: SubCategories.Mouses,
    id: SubcategoriesIDs.Mouses,
    flag: false,
  });
  const [subcategoryMousesPads, setSubcategoryMousesPads] = useState({
    name: SubCategories.MousePads,
    id: SubcategoriesIDs.MousePads,
    flag: false,
  });
  const [subcategoryTShirts, setSubcategoryTShirts] = useState({
    name: SubCategories.TShirts,
    id: SubcategoriesIDs.TShirts,
    flag: false,
  });
  const [subcategoryHoodies, setSubcategoryHoodies] = useState({
    name: SubCategories.Hoodies,
    id: SubcategoriesIDs.Hoodies,
    flag: false,
  });
  const [subcategoryCap, setSubcategoryCap] = useState({
    name: SubCategories.Caps,
    id: SubcategoriesIDs.Caps,
    flag: false,
  });
  const [subcategoryMugs, setSubcategoryMugs] = useState({
    name: SubCategories.Mugs,
    id: SubcategoriesIDs.Mugs,
    flag: false,
  });
  const [subcategoryNotepad, setSubcategoryNotepad] = useState({
    name: SubCategories.Notepads,
    id: SubcategoriesIDs.Notepads,
    flag: false,
  });
  const [subcategoryStickerPack, setSubcategoryStickerPack] = useState({
    name: SubCategories.Stickers,
    id: SubcategoriesIDs.Stickers,
    flag: false,
  });
  const [sizeFilterXS, setSizeFilterXS] = useState({
    name: Sizes.xs,
    flag: false,
  });
  const [sizeFilterS, setSizeFilterS] = useState({
    name: Sizes.s,
    flag: false,
  });
  const [sizeFilterM, setSizeFilterM] = useState({
    name: Sizes.m,
    flag: false,
  });
  const [sizeFilterL, setSizeFilterL] = useState({
    name: Sizes.l,
    flag: false,
  });
  const [sizeFilterXL, setSizeFilterXL] = useState({
    name: Sizes.xl,
    flag: false,
  });
  const [sizeFilterXXL, setSizeFilterXXL] = useState({
    name: Sizes.xxl,
    flag: false,
  });
  const [sizeFilterXXXL, setSizeFilterXXXL] = useState({
    name: Sizes.xxxl,
    flag: false,
  });

  useEffect(() => {
    getProductType().then((response) => {
      const productTypeResponse = response.body.attributes;
      const productTypeColour = productTypeResponse?.filter((data) => {
        if (data.name === 'color') {
          if (data.type.name === 'enum') {
            const coloursEnum = data.type['values'];
            const colours = coloursEnum.map((data) => data['key']);
            console.log(colours);
            setAllColours(colours);
          }
        }
      });
    });
  }, []);

  useEffect(() => {
    getProductType().then((response) => {
      const productTypeResponse = response.body.attributes;
      console.log(productTypeResponse);
      const productTypeSize = productTypeResponse?.filter((data) => {
        if (data.name === 'size') {
          if (data.type.name === 'enum') {
            const sizesEnum = data.type['values'];
            const sizes = sizesEnum.map((data) => data['key']);
            console.log(sizes);
            setAllSizes(sizes);
          }
        }
      });
    });
  }, []);

  useEffect(() => {
    getProductType().then((response) => {
      const productTypeResponse = response.body.attributes;
      console.log(productTypeResponse);
      const productTypeBestseller = productTypeResponse?.filter((data) => {
        if (data.name === 'bestseller') {
          const bestseller = data.name;
          console.log(bestseller);
          setBestseller(bestseller);
        }
      });
    });
  }, []);

  useEffect(() => {
    getProductType().then((response) => {
      const productTypeResponse = response.body.attributes;
      console.log(productTypeResponse);
      const productTypeSale = productTypeResponse?.filter((data) => {
        if (data.name === 'sale' || data.name === 'base_sale') {
          const sale = data.name;
          console.log(sale);
          setSale(sale);
        }
      });
    });
  }, []);

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

  function filter(): void {
    const coloursArray = [
      colourFilterRed,
      colourFilterBlack,
      colourFilterWhite,
    ];
    let queryColoursString = '';
    coloursArray.forEach((colourItem) => {
      if (colourItem.flag) {
        if (queryColoursString === '') {
          queryColoursString = queryColoursString + `"${colourItem.name}"`;
        } else {
          queryColoursString = queryColoursString + `, "${colourItem.name}"`;
        }
      }
    });
    const sizesArray = [
      sizeFilterXS,
      sizeFilterS,
      sizeFilterM,
      sizeFilterL,
      sizeFilterXL,
      sizeFilterXXL,
      sizeFilterXXXL,
    ];
    let querySizesString = '';
    sizesArray.forEach((sizeItem) => {
      if (sizeItem.flag) {
        if (querySizesString === '') {
          querySizesString = querySizesString + `"${sizeItem.name}"`;
        } else {
          querySizesString = querySizesString + `, "${sizeItem.name}"`;
        }
      }
    });
    const subtreesArray = [
      subcategoryTShirts,
      subcategoryMouses,
      subcategoryMousesPads,
      subcategoryHoodies,
      subcategoryCap,
      subcategoryMugs,
      subcategoryNotepad,
      subcategoryStickerPack,
    ];
    let querySubtreesString = '';
    subtreesArray.forEach((subtreeItem) => {
      if (subtreeItem.flag) {
        if (querySubtreesString === '') {
          querySubtreesString =
            querySubtreesString + `subtree("${subtreeItem.id}")`;
        } else {
          querySubtreesString =
            querySubtreesString + `, subtree("${subtreeItem.id}")`;
        }
      }
    });
    const subtrees = `subtree("${idCategory}")`;
    console.log(querySubtreesString);
    // const size = `subtree("${idCategory}")`;
    const queryStringAllColours = `"red", "black", "white"`;
    const queryStringAllSizes = `"xs", "s", "m", "l", "xl", "xxl", "xxl"`;
    // `subtree("${idCategory}")`
    console.log(queryColoursString, querySubtreesString);
    filterByColour(
      queryColoursString === ''
        ? (queryColoursString = queryStringAllColours)
        : queryColoursString,
      querySubtreesString === ''
        ? (querySubtreesString = subtrees)
        : querySubtreesString,
      querySizesString === ''
        ? (querySizesString = queryStringAllSizes)
        : querySizesString
    ).then((response) => {
      const parentCategory = response.body.results;
      console.log(parentCategory);
      const master = parentCategory.map((item) => item.masterVariant);
      setAllVariants(master);
      setAllCards(master);
    });
  }

  function onChangeColour(colour: string): void {
    switch (colour) {
      case Colours.red:
        setColourFilterRed({ name: Colours.red, flag: !colourFilterRed.flag });
        break;
      case Colours.black:
        setColourFilterBlack({
          name: Colours.black,
          flag: !colourFilterBlack.flag,
        });
        break;
      case Colours.white:
        setColourFilterWhite({
          name: Colours.white,
          flag: !colourFilterWhite.flag,
        });
        break;
    }
  }

  function onChangeSize(size: string): void {
    switch (size) {
      case Sizes.xs:
        setSizeFilterXS({ name: Sizes.xs, flag: !sizeFilterXS.flag });
        break;
      case Sizes.s:
        setSizeFilterS({
          name: Sizes.s,
          flag: !sizeFilterS.flag,
        });
        break;
      case Sizes.m:
        setSizeFilterM({
          name: Sizes.m,
          flag: !sizeFilterM.flag,
        });
        break;
      case Sizes.l:
        setSizeFilterL({
          name: Sizes.l,
          flag: !sizeFilterL.flag,
        });
        break;
      case Sizes.xl:
        setSizeFilterXL({
          name: Sizes.xl,
          flag: !sizeFilterXL.flag,
        });
        break;
      case Sizes.xxl:
        setSizeFilterXXL({
          name: Sizes.xxl,
          flag: !sizeFilterXXL.flag,
        });
        break;
      case Sizes.xxxl:
        setSizeFilterXXXL({
          name: Sizes.xxxl,
          flag: !sizeFilterXXXL.flag,
        });
        break;
    }
  }

  function onChangeSubcategory(subCategory: string): void {
    switch (subCategory) {
      case SubCategories.Mouses:
        setSubcategoryMouses({
          name: SubCategories.Mouses,
          id: SubcategoriesIDs.Mouses,
          flag: !subcategoryMouses.flag,
        });
        break;
      case SubCategories.MousePads:
        setSubcategoryMousesPads({
          name: SubCategories.MousePads,
          id: SubcategoriesIDs.MousePads,
          flag: !subcategoryMousesPads.flag,
        });
        break;
      case SubCategories.TShirts:
        setSubcategoryTShirts({
          name: SubCategories.TShirts,
          id: SubcategoriesIDs.TShirts,
          flag: !subcategoryTShirts.flag,
        });
        break;
      case SubCategories.Hoodies:
        setSubcategoryHoodies({
          name: SubCategories.Hoodies,
          id: SubcategoriesIDs.Hoodies,
          flag: !subcategoryHoodies.flag,
        });
        break;
      case SubCategories.Caps:
        setSubcategoryCap({
          name: SubCategories.Caps,
          id: SubcategoriesIDs.Caps,
          flag: !subcategoryCap.flag,
        });
        break;
      case SubCategories.Mugs:
        setSubcategoryMugs({
          name: SubCategories.Mugs,
          id: SubcategoriesIDs.Mugs,
          flag: !subcategoryMugs.flag,
        });
        break;
      case SubCategories.Notepads:
        setSubcategoryNotepad({
          name: SubCategories.Notepads,
          id: SubcategoriesIDs.Notepads,
          flag: !subcategoryNotepad.flag,
        });
        break;
      case SubCategories.Stickers:
        setSubcategoryStickerPack({
          name: SubCategories.Stickers,
          id: SubcategoriesIDs.Stickers,
          flag: !subcategoryStickerPack.flag,
        });
        break;
    }
  }
  console.log(allSizes);

  return (
    <div className={style.category}>
      <div className={style.category_wrapper}>
        <h2 className={style.category_title}>{category}</h2>
        <div className={style.category_categories}>
          {subtree.map((subCategory) => {
            return (
              <div key={subCategory.name['en-US']}>
                <input
                  name="filterColor"
                  type="checkbox"
                  id={subCategory.name['en-US']}
                  onChange={(): void =>
                    onChangeSubcategory(subCategory.name['en-US'])
                  }
                />
                <label
                  htmlFor={subCategory.name['en-US']}
                  className={style.category_filters_category}
                >
                  {subCategory.name['en-US']}
                </label>
              </div>
            );
          })}
        </div>
        <div className={style.category_filters_color}>
          {allColours.map((colour) => {
            return (
              <div key={colour} className={style.category_colours_wrapper}>
                <input
                  name="filterColor"
                  type="checkbox"
                  className={style.colour_input}
                  id={colour}
                  onChange={(): void => onChangeColour(colour)}
                />
                <label
                  htmlFor={colour}
                  className={style[`category_filters_${colour}`]}
                ></label>
              </div>
            );
          })}
        </div>
        <div className={style.category_filters_size}>
          {allSizes.map((size) => {
            return (
              <div key={size}>
                <input
                  name="filterSize"
                  type="checkbox"
                  className={style.size_input}
                  id={size}
                  onChange={(): void => onChangeSize(size)}
                />
                <label
                  htmlFor={size}
                  className={style[`category_filters_${size}`]}
                >
                  {size}
                </label>
              </div>
            );
          })}
        </div>
        <div className={style.category_filters_bestseller}>
          <div key={bestseller}>
            <input
              name="filterBestseller"
              type="checkbox"
              className={style.bestseller_input}
              id={bestseller}
              // onChange={(): void => onChangeBestseller(bestseller)}
            />
            <label
              htmlFor={bestseller}
              className={style.category_filters_bestseller}
            >
              {bestseller}
            </label>
          </div>
        </div>
        <div className={style.category_filters_sale}>
          <div key={sale}>
            <input
              name="filterSale"
              type="checkbox"
              className={style.sale_input}
              id={bestseller}
              // onChange={(): void => onChangeSale(sale)}
            />
            <label htmlFor={sale} className={style.category_filters_sale}>
              sale
            </label>
          </div>
        </div>
        <div className={style.category_cards_wrapper}>
          {allCards.map((card) => {
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
                      ? `${card.prices[0].discounted?.value.centAmount}$`
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
      <button
        className={style.category_filter_button}
        onClick={(): void => filter()}
      >
        Filter
      </button>
    </div>
  );
}
export default CategoryPage;
