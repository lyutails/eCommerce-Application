/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  GetParentCategory,
  returnProductsByCategoryKey,
} from '../../api/getCategories';
import {
  AriaAttributes,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import style from '../Category/_category.module.scss';
import {
  Category,
  MyCartUpdate,
  ProductProjection,
  ProductVariant,
} from '@commercetools/platform-sdk';

import { filterByAttributes, getProductType } from '../../api/filterAttributes';
import {
  Brands,
  Colours,
  Sizes,
  SubCategories,
  SubcategoriesIDs,
} from '../../types/enums';
import Card from '../../components/Card/Card';
import { throwNewError } from '../../utils/throwNewError';
import { useDispatch, useSelector } from 'react-redux';
import { ICartState, IRootState } from '../../types/interfaces';
import {
  changeAnonymousCart,
  changeUserCart,
  setCartItems,
  setCartPrice,
  setCartPriceDiscount,
  setCartQuantity,
} from '../../store/reducers/cartReducer';
import { updateCart } from '../../api/existTokenFlow';
import { refreshTokenFlow } from '../../api/adminBuilder';

import '../../../global.d.ts';
import ReactSlider from 'react-slider';
// const { ReactSlider } = require('react-slider');

const pageLimit = 8;
const productsForSearchClothes = 'Cap Hoodie T-Shirt';
const productsForSearchPC = 'Mouse Pad';
const productsForSearchSouvenirs = 'Mug Notepad';
const productsForSearchStickers = 'Sticker';
const allBrands = ['RSSchool', 'Logitech'];
const sizesArray = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'universal'];
function CategoryPage(): JSX.Element {
  const dispatch = useDispatch();
  const { anonymousCart, userCart } = useSelector(
    (state: ICartState) => state.cart
  );
  const { customerId, customerRefreshToken, accessToken } = useSelector(
    (state: IRootState) => state.user
  );
  const isAuth = useSelector((state: IRootState) => state.user.isAuth);

  const { category } = useParams();
  const { query } = useParams();

  const [idCategory, setIdcategoty] = useState('');
  const [subtree, setSubtree] = useState<Category[]>([]);
  const [allCards, setAllCards] = useState<ProductVariant[]>([]);
  const [allColours, setAllColours] = useState<string[]>([]);
  const [bestseller, setBestseller] = useState<boolean>(false);
  const [priceSort, setPriceSort] = useState<boolean>(false);
  const [nameSort, setNameSort] = useState<boolean>(false);
  const [sale, setSale] = useState<boolean>(false);
  const [winter, setWinter] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState('');
  // const [searchPriceStart, setSearchPriceStart] = useState('');
  // const [searchPriceFinish, setSearchPriceFinish] = useState('');
  const [count, setCount] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [isSubtreeChecked, setIsSubtreeChecked] = useState(false);
  const [nameIsChecked, setNameIsChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [maxPage, setMaxPage] = useState(1);
  const [allParents, setAllParents] = useState<ProductProjection[]>([]);
  const [priceSliderValue, setPriceSliderValue] = useState<number[]>([0, 100]);
  const [isPaginationNumberAnimPlaying, setIsPaginationNumberAnimPlaying] =
    useState(false);
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

  const updateCustomerCart = (updateAnonCartData: MyCartUpdate): void => {
    if (!isAuth) {
      refreshTokenFlow(anonymousCart.anonymousRefreshToken).then((response) => {
        updateCart(
          anonymousCart.cartID,
          updateAnonCartData,
          response.access_token
        ).then((updatedCart) => {
          if (updatedCart) {
            dispatch(setCartItems(updatedCart?.body.lineItems));
            dispatch(
              changeAnonymousCart({
                versionAnonCart: updatedCart.body.version,
              })
            );
            dispatch(setCartQuantity(updatedCart?.body.totalLineItemQuantity));
            dispatch(
              setCartPriceDiscount(updatedCart?.body.totalPrice.centAmount)
            );
            let totalPrice = 0;
            updatedCart?.body.lineItems.map((item) => {
              if (item) {
                totalPrice += item.price.value.centAmount * item.quantity;
              }
              return totalPrice;
            });
            dispatch(setCartPrice(totalPrice));
          }
        });
      });
    } else {
      refreshTokenFlow(customerRefreshToken).then((response) => {
        updateCart(
          userCart.userCartId,
          updateAnonCartData,
          response.access_token
        ).then((updatedCart) => {
          if (updatedCart) {
            dispatch(setCartItems(updatedCart?.body.lineItems));
            dispatch(
              changeUserCart({
                versionUserCart: updatedCart.body.version,
              })
            );
            dispatch(setCartQuantity(updatedCart?.body.totalLineItemQuantity));
            dispatch(
              setCartPriceDiscount(updatedCart?.body.totalPrice.centAmount)
            );
            let totalPrice = 0;
            updatedCart?.body.lineItems.map((item) => {
              if (item) {
                totalPrice += item.price.value.centAmount * item.quantity;
              }
              return totalPrice;
            });
            dispatch(setCartPrice(totalPrice));
          }
        });
      });
    }
  };

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
  }, [dispatch]);

  useEffect(() => {
    if (!category) {
      throwNewError(`no categories found`);
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
        const priceDESC = 'price desc';
        const nameASC = 'name.en-us asc';
        const queryStringPriceNameSort = [`${priceDESC}`, `${nameASC}`];
        // const queryStringPriceRangeStart = `0`;
        // const queryStringPriceRangeFinish = `*`;
        const queryStringPriceRangeStart = String(+priceSliderValue[0] * 100);
        const queryStringPriceRangeFinish = String(+priceSliderValue[1] * 100);
        let fuzzylevel = 0;
        const queryLimitStart = 8;
        const queryOffsetStart = 0;
        const winterSale = `"true", "false"`;

        switch (searchValue.length) {
          case 1:
            fuzzylevel = 0;
            break;
          case 2:
            fuzzylevel = 0;
            break;
          case 3:
            fuzzylevel = 1;
            break;
          case 4:
            fuzzylevel = 1;
            break;
          case 5:
            fuzzylevel = 1;
            break;
          default:
            fuzzylevel = 2;
        }

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
          queryStringPriceNameSort,
          searchValue === '' && category === 'Clothes'
            ? productsForSearchClothes
            : searchValue === '' && category === 'PC'
            ? productsForSearchPC
            : searchValue === '' && category === 'Souvenirs'
            ? productsForSearchSouvenirs
            : searchValue === '' && category === 'Stickers'
            ? productsForSearchStickers
            : searchValue,
          fuzzylevel,
          queryStringPriceRangeStart,
          queryStringPriceRangeFinish,
          queryLimitStart,
          queryOffsetStart,
          winterSale
        ).then((response) => {
          const subtreeArray = response.body.results;
          const allSubTreeArray = subtreeArray.map((item) => {
            return item.masterVariant;
          });
          setAllCards(allSubTreeArray);
        });
      });
  }, [
    category,
    idCategory,
    priceSliderValue,
    productsForSearchClothes,
    productsForSearchPC,
    productsForSearchSouvenirs,
    productsForSearchStickers,
    searchValue,
  ]);

  const createQueryColourString = useCallback((): string => {
    const coloursArray = [
      colourFilterRed,
      colourFilterBlack,
      colourFilterWhite,
    ];
    const filteredColour = coloursArray.filter((colour) => colour.flag);
    const filteredColourName = filteredColour.map((colour) => colour.name);
    const queryColoursString = filteredColourName
      .map((name) => `"${name}"`)
      .join(',');
    return queryColoursString;
  }, [colourFilterBlack, colourFilterRed, colourFilterWhite]);

  const allSizes = useMemo(() => {
    const arrayOfSizes = [
      sizeFilterXS,
      sizeFilterS,
      sizeFilterM,
      sizeFilterL,
      sizeFilterXL,
      sizeFilterXXL,
      sizeFilterXXXL,
      sizeFilterUniversal,
    ];
    const filteredSize = arrayOfSizes.filter((size) => size.flag);
    return filteredSize.map((size) => size.name);
  }, [
    sizeFilterL,
    sizeFilterM,
    sizeFilterS,
    sizeFilterUniversal,
    sizeFilterXL,
    sizeFilterXS,
    sizeFilterXXL,
    sizeFilterXXXL,
  ]);
  const querySizesQueryString = allSizes.map((name) => `"${name}"`).join(',');

  const createQuerySubtreeString = useCallback((): string => {
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
    const filteredSubtree = subtreesArray.filter((subtree) => subtree.flag);
    const filteredSubtreeName = filteredSubtree.map((subtree) => subtree.id);
    const querySubtreesString = filteredSubtreeName
      .map((name) => `"${name}"`)
      .join(',');
    return querySubtreesString;
  }, [
    subcategoryCap,
    subcategoryHoodies,
    subcategoryMouses,
    subcategoryMousesPads,
    subcategoryMugs,
    subcategoryNotepad,
    subcategoryStickerPack,
    subcategoryTShirts,
  ]);

  const createQueryBrand = useCallback((): string => {
    const brandsArray = [brandRSSchool, brandLogitech];
    const filteredBrand = brandsArray.filter((brand) => brand.flag);
    const filteredBrandName = filteredBrand.map((brand) => brand.name);
    const queryBrands = filteredBrandName.map((name) => `"${name}"`).join(',');
    return queryBrands;
  }, [brandLogitech, brandRSSchool]);

  useEffect(() => {
    if (count) {
      const priceDESC = 'price desc';
      const priceASC = 'price asc';
      const nameASC = 'name.en-us asc';
      const nameDESC = 'name.en-us desc';

      let queryStringPriceNameSort = [`${priceDESC}`, `${nameASC}`];

      if (priceSort === false && nameSort === false) {
        queryStringPriceNameSort = [`${priceDESC}`, `${nameASC}`];
      }
      if (priceSort === true && nameSort === false) {
        queryStringPriceNameSort = [`${priceASC}`, `${nameASC}`];
      }
      if (priceSort === true && nameSort === true) {
        queryStringPriceNameSort = [`${priceASC}`, `${nameDESC}`];
      }
      if (priceSort === false && nameSort === true) {
        queryStringPriceNameSort = [`${priceDESC}`, `${nameDESC}`];
      }

      let querySubtreesString = createQuerySubtreeString();
      const subtrees = `subtree("${idCategory}")`;
      querySubtreesString || (querySubtreesString = subtrees);

      const queryStringAllColours = `"red", "black", "white"`;
      let queryColoursString = createQueryColourString();
      queryColoursString || (queryColoursString = queryStringAllColours);

      const queryStringAllSizes = `"xs", "s", "m", "l", "xl", "xxl", "xxl", "universal"`;
      let querySizesString = querySizesQueryString;
      querySizesString === '' && category === 'Clothes'
        ? (querySizesString = queryStringAllSizes)
        : querySizesString === '' && category !== 'Clothes'
        ? (querySizesString = `"no"`)
        : querySizesString;

      let queryBestsellerString = '';
      bestseller === false
        ? (queryBestsellerString = `"true", "false"`)
        : (queryBestsellerString = `"true"`);

      let querySale = '';
      sale === false ? (querySale = `"true", "false"`) : (querySale = `"true"`);

      let winterSale = '';
      winter === false
        ? (winterSale = `"true", "false"`)
        : (winterSale = `"true"`);

      let queryBrandString = createQueryBrand();
      const queryStringAllBrands = '"RSSchool", "Logitech"';
      queryBrandString === ''
        ? (queryBrandString = queryStringAllBrands)
        : queryBrandString;

      const queryPriceRangeStart = String(+priceSliderValue[0] * 100);
      const queryPriceRangeFinish = String(+priceSliderValue[1] * 100);
      // searchPriceStart === ''
      //   ? queryPriceRangeStart
      //   : (queryPriceRangeStart = String(+priceSliderValue[0] * 100)),
      //   searchPriceFinish === ''
      //     ? queryPriceRangeFinish
      //     : (queryPriceRangeFinish = String(+priceSliderValue[1] * 100));

      let querySearchValue = '';
      searchValue === '' && category === 'Clothes'
        ? (querySearchValue = productsForSearchClothes)
        : searchValue === '' && category === 'PC'
        ? (querySearchValue = productsForSearchPC)
        : searchValue === '' && category === 'Souvenirs'
        ? (querySearchValue = productsForSearchSouvenirs)
        : searchValue === '' && category === 'Stickers'
        ? (querySearchValue = productsForSearchStickers)
        : searchValue;

      let fuzzylevel = 0;

      if (searchValue.length > 5) {
        fuzzylevel = 2;
      }
      if (searchValue.length === 3) {
        fuzzylevel = 1;
      }
      if (searchValue.length === 4) {
        fuzzylevel = 1;
      }
      if (searchValue.length === 5) {
        fuzzylevel = 1;
      }
      if (searchValue.length === 1 || searchValue.length === 2) {
        fuzzylevel = 0;
      }

      const queryLimit =
        querySizesString === queryStringAllSizes || querySizesString === `"no"`
          ? pageLimit
          : 100;

      const queryOffset =
        querySizesString === queryStringAllSizes || querySizesString === `"no"`
          ? currentOffset
          : 0;

      /* const queryURL = `/catalog/${category}/priceNameSort=${queryStringPriceNameSort};category.id=${querySubtreesString};color=${queryColoursString};size=${querySizesString};bestseller=${queryBestsellerString};sale=${querySale};brand=${queryBrandString};pricesearchstart=${queryPriceRangeStart};pricesearchfinish=${queryPriceRangeFinish}`;

      const urlQuery = query ? query : '';
      const queryURLArray = urlQuery.split(';'); */

      filterByAttributes(
        queryColoursString,
        querySubtreesString,
        querySizesString,
        queryBestsellerString,
        querySale,
        queryBrandString,
        queryStringPriceNameSort,
        querySearchValue,
        fuzzylevel,
        queryPriceRangeStart,
        queryPriceRangeFinish,
        queryLimit,
        queryOffset,
        winterSale
      )
        .then((response) => {
          const parentCategory = response.body.results;
          setAllParents(response.body.results);
          let master: ProductVariant[] = [];
          if (
            querySizesString === queryStringAllSizes ||
            querySizesString === `"no"`
          ) {
            // MASTERS
            master = parentCategory.map((item) => item.masterVariant);
            setAllCards(master);
            filterByAttributes(
              queryColoursString,
              querySubtreesString,
              querySizesString,
              queryBestsellerString,
              querySale,
              queryBrandString,
              queryStringPriceNameSort,
              querySearchValue,
              fuzzylevel,
              queryPriceRangeStart,
              queryPriceRangeFinish,
              100,
              0,
              winterSale
            ).then((response) => {
              const parentResults = response.body.results;
              const maxPageParent = Math.ceil(parentResults.length / pageLimit);
              setMaxPage(maxPageParent);
            });
          } else {
            parentCategory.forEach((item) => master.push(...item.variants));
            const sortedVariantsArray: ProductVariant[][] = [];
            allSizes.forEach((data) => {
              const sortedVariant = master.filter((variant) => {
                const sizeAttribute = variant.attributes?.find(
                  (sizeQuery) => sizeQuery.name === 'size'
                );
                if (sizeAttribute?.value['key'] === data) {
                  return variant;
                }
              });
              sortedVariantsArray.push(sortedVariant);
            });
            const filteredVariantsPrices = sortedVariantsArray.flat();
            const priceNameOne = [`${priceASC}`, `${nameASC}`];
            const priceNameTwo = [`${priceDESC}`, `${nameDESC}`];
            const priceNameThree = [`${priceDESC}`, `${nameASC}`];
            const priceNameFour = [`${priceDESC}`, `${nameDESC}`];
            if (
              queryStringPriceNameSort === priceNameOne ||
              queryStringPriceNameSort === priceNameTwo
            ) {
              filteredVariantsPrices.sort(
                (a: ProductVariant, b: ProductVariant): number => {
                  if (!a.prices || !b.prices) {
                    throwNewError('no category prices found');
                  }
                  return (
                    a.prices[0].value.centAmount - b.prices[0].value.centAmount
                  );
                }
              );
            }
            if (
              queryStringPriceNameSort === priceNameThree ||
              queryStringPriceNameSort === priceNameFour
            ) {
              filteredVariantsPrices.sort(
                (a: ProductVariant, b: ProductVariant): number => {
                  if (!a.prices || !b.prices) {
                    throwNewError('no category variant prices found');
                  }
                  return (
                    b.prices[0].value.centAmount - a.prices[0].value.centAmount
                  );
                }
              );
            }
            let pageVariants = filteredVariantsPrices.slice(0, pageLimit);
            const maxPageChild = Math.ceil(
              filteredVariantsPrices.length / pageLimit
            );
            setMaxPage(maxPageChild);
            if (currentOffset === 0) {
              pageVariants = filteredVariantsPrices.slice(0, pageLimit);
            }
            if (currentOffset >= 1 || currentOffset < maxPageChild - 1) {
              const firstNumberSlice = pageLimit * currentOffset;
              const lastNumberSlice = pageLimit * (currentOffset + 1);
              pageVariants = filteredVariantsPrices.slice(
                firstNumberSlice,
                lastNumberSlice
              );
            }
            // VARIANTS
            setAllCards(pageVariants);
          }
        })
        .catch(() => {
          setCount(false);
        });
    }
  }, [
    allSizes,
    bestseller,
    category,
    count,
    createQueryBrand,
    createQueryColourString,
    createQuerySubtreeString,
    idCategory,
    priceSort,
    querySizesQueryString,
    sale,
    searchValue,
    currentPage,
    currentOffset,
    winter,
    query,
    nameSort,
    priceSliderValue,
  ]);

  // let searchCharacter = 0;
  // const searchPlaceholderText = 'search for...';
  // const speed = 180;
  // function typeSearch(placeholder: string): void {
  //   placeholder += searchPlaceholderText.charAt(searchCharacter);
  //   searchCharacter++;
  //   setTimeout(typeSearch, speed);
  // }

  const AnimatedInput = ({
    placeholder: passedPlaceholder = '',
    ...passedProps
  }): JSX.Element => {
    const [placeholder, setPlaceholder] = useState(
      passedPlaceholder.slice(0, 0)
    );
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setPlaceholder(passedPlaceholder.slice(0, placeholderIndex));
        if (placeholderIndex + 1 > passedPlaceholder.length) {
          setPlaceholderIndex(0);
        } else {
          setPlaceholderIndex(placeholderIndex + 1);
        }
      }, 240);
      return () => {
        clearInterval(interval);
      };
    }, [passedPlaceholder, placeholderIndex]);

    return <input {...passedProps} placeholder={placeholder} />;
  };

  function onChangeBestseller(): void {
    setBestseller(!bestseller);
  }

  function onChangeSale(): void {
    setSale(!sale);
  }

  function onChangeWinterSale(): void {
    setWinter(!winter);
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

  const [
    searchInputPlaceholderVisibility,
    setSearchInputPlaceholderVisibility,
  ] = useState(false);

  return (
    <div className={style.category}>
      <div className={style.category_wrapper}>
        <div className={style.breadcrumbs_search}>
          <div className={style.breadcrumbs}>
            <span className={style.breadcrumbs_symbol}></span>
            <Link to={'/'} className={style.breadcrumbs_link}>
              Main
            </Link>
            <span className={style.breadcrumbs_symbol}></span>
            <Link to={'/catalog'} className={style.breadcrumbs_link}>
              Catalog
            </Link>
            <span className={style.breadcrumbs_symbol}></span>
            {category}
          </div>
          <div className={style.category_filters_search}>
            <input
              className={style.category_real_search_input}
              onChange={(e): void => {
                setSearchValue(e.target.value);
              }}
              onFocus={(): void => setSearchInputPlaceholderVisibility(true)}
              onBlur={(): void => setSearchInputPlaceholderVisibility(false)}
            ></input>
            <AnimatedInput
              name="filterSearch"
              type="text"
              className={style.category_search_input}
              placeholder={
                searchInputPlaceholderVisibility ? '' : 'Search For...'
              }
            />
          </div>
        </div>
        <div className={style.category_filters_cards_wrapper}>
          <div className={style.category_filters}>
            <div className={style.category_categories}>
              <div className={style.category_subtree_divider}></div>
              {subtree.map((subCategory) => {
                return (
                  <div key={subCategory.name['en-US']}>
                    <input
                      name="filterColor"
                      type="checkbox"
                      id={subCategory.name['en-US']}
                      onChange={(): void => {
                        setIsSubtreeChecked(isSubtreeChecked ? false : true);
                        onChangeSubcategory(subCategory.name['en-US']);
                      }}
                    />
                    <label
                      htmlFor={subCategory.name['en-US']}
                      className={
                        isSubtreeChecked
                          ? `${style.category_filters_category}`
                          : style.category_filters_category
                      }
                    >
                      {subCategory.name['en-US']}
                    </label>
                  </div>
                );
              })}
            </div>
            <div className={style.category_pricename_divider}></div>
            <div className={style.pricesort_wrapper}>
              <input
                name="filterPriceSort"
                type="checkbox"
                className={style.pricesort_input}
                id="price-sort"
                onChange={(): void => {
                  setIsChecked(isChecked ? false : true);
                  setPriceSort(!priceSort);
                }}
              />
              <div className={style.pricesort_switch}>
                <div
                  className={
                    isChecked
                      ? `${style.pricesort_button} ${style.pricesort_button_move}`
                      : style.pricesort_button
                  }
                ></div>
                <label
                  htmlFor="price-sort"
                  className={style.pricesort_label}
                ></label>
              </div>
            </div>
            <div className={style.pricesort_wrapper}>
              <input
                name="filterNameSort"
                type="checkbox"
                className={style.pricesort_input}
                id="name-sort"
                onChange={(): void => {
                  setNameIsChecked(nameIsChecked ? false : true);
                  setNameSort(!nameSort);
                }}
              />
              <div className={style.namesort_switch}>
                <div
                  className={
                    nameIsChecked
                      ? `${style.pricesort_button} ${style.namesort_button_move}`
                      : style.pricesort_button
                  }
                ></div>
                <label
                  htmlFor="name-sort"
                  className={style.namesort_ascdesc_label}
                ></label>
              </div>
            </div>
            <div className={style.category_colour_divider}></div>
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
            <div className={style.category_sizes_divider}></div>
            <div className={style.category_filters_sizes}>
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
              <input
                name="filterBestseller"
                type="checkbox"
                className={style.bestseller_input}
                id="bestseller"
                onChange={(): void => {
                  onChangeBestseller();
                }}
              />
              <label
                htmlFor="bestseller"
                className={style.category_bestseller_label}
              >
                Bestseller
              </label>
            </div>
            <div className={style.category_filters_sales}>
              <div className={style.category_filters_sale}>
                <div>
                  <input
                    name="filterSale"
                    type="checkbox"
                    className={style.sale_input}
                    id="sale"
                    onChange={(): void => {
                      onChangeSale();
                    }}
                  />
                  <label
                    htmlFor="sale"
                    className={style.category_filters_sale_red}
                  >
                    Red Sale
                  </label>
                </div>
              </div>
              <div className={style.category_filters_sale}>
                <div>
                  <input
                    name="filterSale"
                    type="checkbox"
                    className={style.sale_input}
                    id="winter_sale"
                    onChange={(): void => {
                      onChangeWinterSale();
                    }}
                  />
                  <label
                    htmlFor="winter_sale"
                    className={style.category_filters_sale_winter}
                  >
                    Winter Sale
                  </label>
                </div>
              </div>
            </div>
            <div className={style.priceslider_values}>
              <div className={style.priceslider_value_one}>
                $ start: {priceSliderValue[0]}
              </div>
              <div className={style.priceslider_value_two}>
                $ finish: {priceSliderValue[1]}
              </div>
            </div>
            <ReactSlider
              className={style.horizontal_slider}
              thumbClassName={style.slider_thumb}
              trackClassName={style.slider_track}
              defaultValue={[0, 100]}
              min={0}
              max={100}
              // renderThumb={(props: number[], state) => (
              //   <div {...props}>{state.valueNow}</div>
              // )}
              onChange={(value: number[], index: number): void => {
                setPriceSliderValue(value);
              }}
            />
            <div className={style.category_filters_brand}>
              {allBrands.map((brand) => {
                return (
                  <div key={brand} className={style.category_brands_wrapper}>
                    <input
                      name="filterColor"
                      type="checkbox"
                      id={brand}
                      onChange={(): void => {
                        onChangeBrand(brand);
                      }}
                    />
                    <label
                      htmlFor={brand}
                      className={style[`category_filters_${brand}`]}
                    ></label>
                  </div>
                );
              })}
            </div>
            <button
              onClick={(): void => {
                window.location.reload();
              }}
              className={style.category_reset_button}
            >
              Reset Filters
            </button>
          </div>
          <div className={style.category_pagination_customize}>
            <div className={style.category_cards_pagination}>
              <div className={style.category_pagination}>
                <div className={style.category_cards_background_top}></div>
                <div className={style.category_cards_wrapper}>
                  {allCards.map((card) => {
                    const updateAnonCartData = {
                      version: !isAuth
                        ? anonymousCart.versionAnonCart
                        : userCart.versionUserCart,
                      actions: [
                        {
                          action: 'addLineItem',
                          sku: card.sku,
                          quantity: 1,
                        },
                      ],
                    };
                    let productPrice = 0;
                    let productDiscount;
                    let ifProductDiscount = 0;
                    card.prices
                      ? (productPrice = card.prices[0].value.centAmount / 100)
                      : 0;

                    const variantDescription = allParents.find(
                      (parent) => parent.key && card.key?.startsWith(parent.key)
                    );
                    card.prices && card.prices[0].discounted?.value.centAmount
                      ? ((ifProductDiscount =
                          card.prices[0].discounted?.value.centAmount / 100),
                        (productDiscount = `${ifProductDiscount.toFixed(2)}$`))
                      : '';
                    return (
                      <div key={card.key} className={style.category_whole_card}>
                        <button
                          className={style.category_to_cart}
                          onClick={(): void =>
                            updateCustomerCart(updateAnonCartData)
                          }
                        >
                          to Cart
                        </button>
                        <Link
                          to={`/category/${category}/${card.key}`}
                          className={style.category_card}
                          key={card.key}
                        >
                          <Card
                            description={
                              variantDescription?.description
                                ? variantDescription?.description['en-US']
                                : ' '
                            }
                            keyCard={card.key ? card.key : ''}
                            images={card.images}
                            prices={productPrice.toFixed(2)}
                            discounted={productDiscount}
                            sku={card.sku ? card.sku : ''}
                          />
                        </Link>
                      </div>
                    );
                  })}
                </div>
                <div className={style.category_cards_background_bottom}></div>
                <div className={style.category_pagination_buttons}>
                  <button
                    className={`${style.category_pagination_button} ${style.previous}`}
                    onClick={(): void => {
                      setIsPaginationNumberAnimPlaying(true);
                      currentPage > 1
                        ? setCurrentPage(currentPage - 1)
                        : setCurrentPage(1);
                      currentOffset > 0
                        ? setCurrentOffset(currentOffset - 1)
                        : setCurrentOffset(0);
                    }}
                  ></button>
                  <div
                    className={`${style.category_pagination_number} ${style.current}`}
                  >
                    {currentPage}
                  </div>
                  <button
                    className={`${style.category_pagination_button} ${style.next}`}
                    onClick={(): void => {
                      setIsPaginationNumberAnimPlaying(true);
                      currentPage !== maxPage
                        ? setCurrentPage(currentPage + 1)
                        : setCurrentPage(maxPage);
                      currentOffset !== maxPage - 1
                        ? setCurrentOffset(currentOffset + 1)
                        : setCurrentOffset(maxPage - 1);
                    }}
                  ></button>
                  <div className={style.category_number_circle}></div>
                  <div className={style.category_inner_circle_wrapper}>
                    <div
                      className={`${style.category_number_inner_circle} ${
                        isPaginationNumberAnimPlaying ? style.anim : ''
                      }`}
                      onAnimationEnd={(): void => {
                        setIsPaginationNumberAnimPlaying(false);
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.category_cybersloth}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CategoryPage;
