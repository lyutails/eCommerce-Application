import {
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';

export async function getProducts(): Promise<ProductProjection[]> {
  try {
    const productsProjection = await apiRoot
      .productProjections()
      .get()
      .execute();
    const totalProductsCount = productsProjection.body.results;

    return totalProductsCount;
  } catch {
    throw new Error('no products found');
  }
}

export async function getProductProjectionsByKey(
  productKey: string
): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
  try {
    const productByIdKey = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: `key: "${productKey}"`,
        },
      })
      .execute();
    return productByIdKey;
  } catch (error) {
    throw new Error('No products found with the specified key');
  }
}

export async function getProductProjectionsByVariantKey(
  variantKey: string
): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
  try {
    const productByVariantKey = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          'filter.query': [`variants.key: "${variantKey}"`],
        },
      })
      .execute();
    return productByVariantKey;
  } catch {
    throw new Error('no product variant by key found');
  }
}
