import {
  ClientResponse,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';
import { throwNewError } from '../utils/throwNewError';

export async function getBestsellers(): Promise<
  ClientResponse<ProductProjectionPagedSearchResponse>
> {
  try {
    const productsByColour = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          'filter.query': [`variants.attributes.bestseller:"true"`],
        },
      })
      .execute();
    return productsByColour;
  } catch {
    throwNewError('no product by attribute or filter found');
  }
}
