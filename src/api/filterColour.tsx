import {
  ClientResponse,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';

export async function filterByColour(): Promise<
  ClientResponse<ProductProjectionPagedSearchResponse>
> {
  try {
    const productsByColor = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          facet: ['variants.attributes.color'],
          'filter.query': ['variants.attributes.color.key:"red"'],
        },
      })
      .execute();
    return productsByColor;
  } catch {
    throw new Error('no product variant by key found');
  }
}

// 'categories.id:subtree{"00b71d4b-d8b0-463c-9561-23017777d0eb"}',
