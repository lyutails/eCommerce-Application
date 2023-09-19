import {
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
  ProductType,
} from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';
import { apiRoot as apiRootAdmin } from './createClientAdmin';
import { throwNewError } from '../utils/throwNewError';

export async function getBestsellers(): Promise<ProductProjection[]> {
  try {
    const allProductsArray = await apiRoot
      .productProjections()
      .search()
      .get()
      .execute()
      .then((response) => response.body.results);
    return allProductsArray;
  } catch {
    throwNewError('no bestsellers found');
  }
}
