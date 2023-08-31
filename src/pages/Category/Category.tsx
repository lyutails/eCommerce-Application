/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  GetParentCategory,
  returnProductsByCategoryKey,
} from '../../api/getCategories';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import style from '../Category/_category.module.scss';
import { Category, ProductVariant } from '@commercetools/platform-sdk';
import Card from './Card';
import { filterByAttributes, getProductType } from '../../api/filterAttributes';
import {
  Brands,
  Colours,
  Sizes,
  SubCategories,
  SubcategoriesIDs,
} from '../../types/enums';

function CategoryPage(): JSX.Element {
  const allBrands = ['RSSchool', 'Logitech'];
  const sizesArray = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'universal'];
  const { category } = useParams();
  const [idCategory, setIdcategoty] = useState('');
  const [subtree, setSubtree] = useState<Category[]>([]);
  const [allCards, setAllCards] = useState<ProductVariant[]>([]);

  const [allColours, setAllColours] = useState<string[]>([]);
  // const [allSizes, setAllSizes] = useState<string[]>([]);
  const [bestseller, setBestseller] = useState<boolean>(false);
  const [priceSort, setPriceSort] = useState<boolean>(false);
  const [sale, setSale] = useState<boolean>(false);
  const [brandRSSchool, setBrandRSSchool] = useState({
    name: Brands.RSSchool,
    flag: false,
  });
  const [brandLogitech, setBrandLogitech] = useState({
    name: Brands.Logitech,
    flag: false,
  });
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
    id: SubcategoriesIDs.Mouses,
    flag: false,
  });
  const [subcategoryMousesPads, setSubcategoryMousesPads] = useState({
    id: SubcategoriesIDs.MousePads,
    flag: false,
  });
  const [subcategoryTShirts, setSubcategoryTShirts] = useState({
    id: SubcategoriesIDs.TShirts,
    flag: false,
  });
  const [subcategoryHoodies, setSubcategoryHoodies] = useState({
    id: SubcategoriesIDs.Hoodies,
    flag: false,
  });
  const [subcategoryCap, setSubcategoryCap] = useState({
    id: SubcategoriesIDs.Caps,
    flag: false,
  });
  const [subcategoryMugs, setSubcategoryMugs] = useState({
    id: SubcategoriesIDs.Mugs,
    flag: false,
  });
  const [subcategoryNotepad, setSubcategoryNotepad] = useState({
    id: SubcategoriesIDs.Notepads,
    flag: false,
  });
  const [subcategoryStickerPack, setSubcategoryStickerPack] = useState({
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
  const [sizeFilterUniversal, setSizeFilterUniversal] = useState({
    name: Sizes.universal,
    flag: false,
  });

  useEffect(() => {
    getProductType().then((response) => {
      const productTypeResponse = response.body.attributes;
      productTypeResponse?.forEach((data) => {
        if (data.name === 'color') {
          if (data.type.name === 'enum') {
            const coloursEnum = data.type['values'];
            const colours = coloursEnum.map((data) => data['key']);
            setAllColours(colours);
          }
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
        let querySizesString = '';
        const queryBestsellerString = `"true", "false"`;
        const subtrees = `subtree("${idCategory}")`;
        const queryStringAllColours = `"red", "black", "white"`;
        const queryStringAllSizes = `"xs", "s", "m", "l", "xl", "xxl", "xxl", "universal"`;
        const querySale = `"true", "false"`;
        const queryStringAllBrands = `"RSSchool", "Logitech"`;
        const queryStringPriceASC = `price asc`;
        const queryStringPriceDESC = `price desc`;
        filterByAttributes(
          queryStringAllColours,
          subtrees,
          querySizesString === '' && category === 'Clothes'
            ? (querySizesString = queryStringAllSizes)
            : querySizesString === '' && category !== 'Clothes'
            ? (querySizesString = `"no"`)
            : querySizesString,
          queryBestsellerString,
          querySale,
          queryStringAllBrands,
          priceSort ? queryStringPriceASC : queryStringPriceDESC
        ).then((response) => {
          const subtreeArray = response.body.results;
          const allSubTreeArray = subtreeArray.map((item) => {
            return item.masterVariant;
          });
          setAllCards(allSubTreeArray);
        });
      });
  }, [category, idCategory]);

  function createQueryColourString(): string {
    let queryColoursString = '';
    const coloursArray = [
      colourFilterRed,
      colourFilterBlack,
      colourFilterWhite,
    ];
    coloursArray.forEach((colourItem) => {
      if (colourItem.flag) {
        if (queryColoursString === '') {
          queryColoursString = queryColoursString + `"${colourItem.name}"`;
        } else {
          queryColoursString = queryColoursString + `, "${colourItem.name}"`;
        }
      }
    });
    return queryColoursString;
  }

  function createQuerySizeString(): string {
    setAllSizes([]);
    let querySizesString = '';
    const sizesArray = [
      sizeFilterXS,
      sizeFilterS,
      sizeFilterM,
      sizeFilterL,
      sizeFilterXL,
      sizeFilterXXL,
      sizeFilterXXXL,
      sizeFilterUniversal,
    ];
    sizesArray.forEach((sizeItem) => {
      if (sizeItem.flag) {
        allSizes.push(sizeItem.name);
        if (querySizesString === '') {
          querySizesString = querySizesString + `"${sizeItem.name}"`;
        } else {
          querySizesString = querySizesString + `, "${sizeItem.name}"`;
        }
      }
    });
    return querySizesString;
  }

  function createQuerySubtreeString(): string {
    let querySubtreesString = '';
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
    return querySubtreesString;
  }

  function createQueryBrand(): string {
    let queryBrands = '';
    const brandsArray = [brandRSSchool, brandLogitech];
    brandsArray.forEach((brand) => {
      if (brand.flag) {
        if (queryBrands === '') {
          queryBrands = queryBrands + `"${brand.name}"`;
        } else {
          queryBrands = queryBrands + `, "${brand.name}"`;
        }
      }
    });
    return queryBrands;
  }

  function filter(): void {
    let queryColoursString = createQueryColourString();
    let querySizesString = createQuerySizeString();
    let querySubtreesString = createQuerySubtreeString();
    let queryBrandString = createQueryBrand();
    let queryBestsellerString = '';
    const subtrees = `subtree("${idCategory}")`;
    const queryStringAllBrands = '"RSSchool", "Logitech"';
    const queryStringAllColours = `"red", "black", "white"`;
    const queryStringAllSizes = `"xs", "s", "m", "l", "xl", "xxl", "xxl", "universal"`;
    let querySale = '';
    const queryStringPriceASC = `price asc`;
    const queryStringPriceDESC = `price desc`;

    filterByAttributes(
      queryColoursString === ''
        ? (queryColoursString = queryStringAllColours)
        : queryColoursString,
      querySubtreesString === ''
        ? (querySubtreesString = subtrees)
        : querySubtreesString,
      querySizesString === '' && category === 'Clothes'
        ? (querySizesString = queryStringAllSizes)
        : querySizesString === '' && category !== 'Clothes'
        ? (querySizesString = `"no"`)
        : querySizesString,
      bestseller === false
        ? (queryBestsellerString = `"true", "false"`)
        : (queryBestsellerString = `"true"`),
      sale === false ? (querySale = `"true", "false"`) : (querySale = `"true"`),
      queryBrandString === ''
        ? (queryBrandString = queryStringAllBrands)
        : queryBrandString,
      priceSort ? queryStringPriceASC : queryStringPriceDESC
    ).then((response) => {
      const parentCategory = response.body.results;
      let master: ProductVariant[] = [];
      if (
        querySizesString === queryStringAllSizes ||
        querySizesString === '"no"'
      ) {
        master = parentCategory.map((item) => item.masterVariant);
        setAllCards(master);
      } else {
        parentCategory.forEach((item) => master.push(...item.variants));
        const sortedVariantsArray: ProductVariant[][] = [];
        allSizes.forEach((data) => {
          const sortedVariant = master.filter((variant) => {
            const sizeAttribute = variant.attributes?.find(
              (sizeQuery) => sizeQuery.name === 'size'
            );
            if (sizeAttribute?.value['key'] === data) {
              console.log(variant);
              return variant;
            }
          });
          sortedVariantsArray.push(sortedVariant);
        });
        setAllCards(sortedVariantsArray.flat());
      }
    });
  }

  function onChangePriceSort(): void {
    setPriceSort(!priceSort);
  }

  function onChangeBestseller(): void {
    setBestseller(!bestseller);
  }

  function onChangeSale(): void {
    setSale(!sale);
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

  function onChangeBrand(brand: string): void {
    switch (brand) {
      case Brands.RSSchool:
        setBrandRSSchool({
          name: Brands.RSSchool,
          flag: !brandRSSchool.flag,
        });
        break;
      case Brands.Logitech:
        setBrandLogitech({
          name: Brands.Logitech,
          flag: !brandLogitech.flag,
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
      case Sizes.universal:
        setSizeFilterUniversal({
          name: Sizes.universal,
          flag: !sizeFilterUniversal.flag,
        });
        break;
    }
  }

  function onChangeSubcategory(subCategory: string): void {
    switch (subCategory) {
      case SubCategories.Mouses:
        setSubcategoryMouses({
          id: SubcategoriesIDs.Mouses,
          flag: !subcategoryMouses.flag,
        });
        break;
      case SubCategories.MousePads:
        setSubcategoryMousesPads({
          id: SubcategoriesIDs.MousePads,
          flag: !subcategoryMousesPads.flag,
        });
        break;
      case SubCategories.TShirts:
        setSubcategoryTShirts({
          id: SubcategoriesIDs.TShirts,
          flag: !subcategoryTShirts.flag,
        });
        break;
      case SubCategories.Hoodies:
        setSubcategoryHoodies({
          id: SubcategoriesIDs.Hoodies,
          flag: !subcategoryHoodies.flag,
        });
        break;
      case SubCategories.Caps:
        setSubcategoryCap({
          id: SubcategoriesIDs.Caps,
          flag: !subcategoryCap.flag,
        });
        break;
      case SubCategories.Mugs:
        setSubcategoryMugs({
          id: SubcategoriesIDs.Mugs,
          flag: !subcategoryMugs.flag,
        });
        break;
      case SubCategories.Notepads:
        setSubcategoryNotepad({
          id: SubcategoriesIDs.Notepads,
          flag: !subcategoryNotepad.flag,
        });
        break;
      case SubCategories.Stickers:
        setSubcategoryStickerPack({
          id: SubcategoriesIDs.Stickers,
          flag: !subcategoryStickerPack.flag,
        });
        break;
    }
  }

  return (
    <div className={style.category}>
      <div className={style.category_wrapper}>
        <h2 className={style.category_title}>{category}</h2>
        <div className={style.category_filters}>
          <div className={style.category_filters_pricesort}>
            <div className={style.pricesort_wrapper}>
              <input
                name="filterColor"
                type="checkbox"
                className={style.pricesort_input}
                id="price-sort"
                onChange={(): void => {
                  onChangePriceSort();
                  // filter();
                }}
              />
              <label htmlFor="price-sort" className={style.pricesort_label}>
                <div className={style.day_night_cont}>
                  <span className={style.the_sun}></span>
                  <div className={style.the_moon}>
                    <span className={style.moon_inside}></span>
                  </div>
                </div>
                <div className={style.switch}>
                  <div className={style.button}>
                    <div className={style.b_inside}></div>
                  </div>
                </div>
              </label>
            </div>
          </div>
          <div className={style.category_categories}>
            {subtree.map((subCategory) => {
              return (
                <div key={subCategory.name['en-US']}>
                  <input
                    name="filterColor"
                    type="checkbox"
                    id={subCategory.name['en-US']}
                    onChange={(): void => {
                      onChangeSubcategory(subCategory.name['en-US']);
                      filter();
                    }}
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
                    onChange={(): void => {
                      onChangeColour(colour);
                      // filter();
                    }}
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
            {category === 'Clothes' &&
              sizesArray.map((size) => {
                return (
                  <div
                    key={size}
                    className={
                      (size === 'universal' &&
                        subcategoryTShirts.flag &&
                        !subcategoryCap.flag) ||
                      (size === 'universal' &&
                        subcategoryHoodies.flag &&
                        !subcategoryCap.flag) ||
                      (size !== 'universal' &&
                        subcategoryCap.flag &&
                        !subcategoryHoodies.flag &&
                        !subcategoryTShirts.flag)
                        ? style.category_filter_size_universal
                        : ''
                    }
                  >
                    <input
                      name="filterSize"
                      type="checkbox"
                      className={style.size_input}
                      id={size}
                      onChange={(): void => {
                        onChangeSize(size);
                        // filter();
                      }}
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
            <div>
              <input
                name="filterBestseller"
                type="checkbox"
                className={style.bestseller_input}
                id="bestseller"
                onChange={(): void => {
                  onChangeBestseller();
                  // filter();
                }}
              />
              <label
                htmlFor="bestseller"
                className={style.category_filters_bestseller}
              >
                bestseller
              </label>
            </div>
          </div>
          <div className={style.category_filters_sale}>
            <div>
              <input
                name="filterSale"
                type="checkbox"
                className={style.sale_input}
                id="sale"
                onChange={(): void => {
                  onChangeSale();
                  // filter();
                }}
              />
              <label htmlFor="sale" className={style.category_filters_sale}>
                sale
              </label>
            </div>
          </div>
          <div className={style.category_filters_search}>
            <div>
              <input
                name="filterSearch"
                type="text"
                className={style.category_search_input}
                // id={bestseller}
                placeholder="search"
                // onChange={(): void => onChangeSale(sale)}
              />
            </div>
          </div>
          <div className={style.category_price_range_slider}>
            <div className={style.category_range_value}>
              <input
                type="text"
                className={style.category_price_input}
                id="amount"
                readOnly
                // onChange={(): void => onChangeSale(sale)}
              />
            </div>
            <div
              id="category_slider_range"
              className={style.category_range_bar}
            ></div>
          </div>
          <div className={style.category_filters_brand}>
            {allBrands.map((brand) => {
              return (
                <div key={brand} className={style.category_colours_wrapper}>
                  <input
                    name="filterColor"
                    type="checkbox"
                    // className={style.colour_input}
                    id={brand}
                    onChange={(): void => {
                      onChangeBrand(brand);
                      // filter();
                    }}
                  />
                  <label
                    htmlFor={brand}
                    className={style[`category_filters_${brand}`]}
                  >
                    {brand}
                  </label>
                </div>
              );
            })}
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
