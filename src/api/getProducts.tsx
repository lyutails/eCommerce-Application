import {
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';
import { throwNewError } from '../utils/throwNewError';

export async function getProducts(): Promise<ProductProjection[]> {
  try {
    const productsProjection = await apiRoot
      .productProjections()
      .get()
      .execute();
    const totalProductsCount = productsProjection.body.results;

    return totalProductsCount;
  } catch {
    throwNewError('no products found');
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
    throwNewError('no products found with the specified key');
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
    throwNewError('no product variant by key found');
  }
}
