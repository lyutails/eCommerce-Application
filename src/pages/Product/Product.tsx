import { getProductProjectionsByVariantKey } from '../../api/getProducts';
import { useParams } from 'react-router-dom';
import style from '../Product/_product.module.scss';
import { useEffect, useState } from 'react';
import { ProductProjection, ProductVariant } from '@commercetools/platform-sdk';

interface IDataProduct {
  name: string;
  description: string;
  images: object[];
  price: number;
  sale: number;
  color: string;
  size: string;
  brand: string;
}

function ProductPage(): JSX.Element {
  const { id } = useParams();
  const [dataProduct, setDataProduct] = useState<IDataProduct>({
    name: '',
    description: '',
    images: [],
    price: 0,
    sale: 0,
    color: '',
    size: '',
    brand: '',
  });

  function creatingQueryForMaster(product: ProductProjection): void {
    const intermediateProduct: IDataProduct = {
      name: '',
      description: '',
      images: [],
      price: 0,
      sale: 0,
      color: '',
      size: '',
      brand: '',
    };
    product.name ? (intermediateProduct.name = product.name['en-US']) : '';

    product.description
      ? (intermediateProduct.description = product.description['en-US'])
      : '';

    product.masterVariant.images
      ? (intermediateProduct.images = product.masterVariant.images)
      : [];

    product.masterVariant.prices
      ? (intermediateProduct.price =
          product.masterVariant.prices[0].value.centAmount / 100)
      : 0;

    product.masterVariant.prices &&
    product.masterVariant.prices[0].discounted?.value.centAmount
      ? (intermediateProduct.sale =
          product.masterVariant.prices[0].discounted?.value.centAmount / 100)
      : 0;

    const colorProduct = product.masterVariant.attributes?.filter(
      (item) => item.name === 'color'
    );
    colorProduct?.length
      ? (intermediateProduct.color = colorProduct[0].value['key'])
      : '';

    const sizeProduct = product.masterVariant.attributes?.filter(
      (item) => item.name === 'size'
    );
    sizeProduct?.length
      ? (intermediateProduct.size = sizeProduct[0].value['key'])
      : '';
    setDataProduct(intermediateProduct);
  }

  function creatingQueryForVariant(
    product: ProductProjection,
    variant: ProductVariant
  ): void {
    const intermediateProduct: IDataProduct = {
      name: '',
      description: '',
      images: [],
      price: 0,
      sale: 0,
      color: '',
      size: '',
      brand: '',
    };
    variant.sku ? (intermediateProduct.name = variant.sku) : '';

    product.description
      ? (intermediateProduct.description = product.description['en-US'])
      : '';

    variant.images ? (intermediateProduct.images = variant.images) : [];

    variant.prices
      ? (intermediateProduct.price = variant.prices[0].value.centAmount / 100)
      : 0;

    variant.prices && variant.prices[0].discounted?.value.centAmount
      ? (intermediateProduct.sale =
          variant.prices[0].discounted?.value.centAmount / 100)
      : 0;

    const colorProduct = variant.attributes?.filter(
      (item) => item.name === 'color'
    );
    colorProduct?.length
      ? (intermediateProduct.color = colorProduct[0].value['key'])
      : '';

    const sizeProduct = product.masterVariant.attributes?.filter(
      (item) => item.name === 'size'
    );
    sizeProduct?.length
      ? (intermediateProduct.size = sizeProduct[0].value['key'])
      : '';
    setDataProduct(intermediateProduct);
  }

  useEffect(() => {
    id &&
      getProductProjectionsByVariantKey(id).then((response) => {
        const productObtained = response.body.results[0];

        if (productObtained.masterVariant.key === id) {
          creatingQueryForMaster(productObtained);
        } else {
          const variant = productObtained.variants.find(
            (data) => data.key && data.key === id
          );
          variant && creatingQueryForVariant(productObtained, variant);
        }
      });
  }, [id]);

  return (
    <div className={style.container}>
      <h2 className={style.title}>Product</h2>
    </div>
  );
}
export default ProductPage;
