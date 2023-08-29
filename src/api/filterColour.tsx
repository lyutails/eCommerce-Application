import {
  ClientResponse,
  ProductProjectionPagedSearchResponse,
  ProductType,
} from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';
import { apiRoot as apiRootAdmin } from './createClientAdmin';

export async function filterByColour(
  colour: string
): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
  try {
    const productsByColour = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          facet: ['variants.attributes.color'],
          'filter.query': [`variants.attributes.color.key:"${colour}"`],
        },
      })
      .execute();
    return productsByColour;
  } catch {
    throw new Error('no product variant by key found');
  }
}

export async function getProductType(): Promise<ClientResponse<ProductType>> {
  try {
    const productType = await apiRootAdmin
      .productTypes()
      .withKey({ key: 't-shirt' })
      .get()
      .execute();
    return productType;
  } catch {
    throw new Error('no product type found');
  }
}

// window.apiRootAdmin = apiRootAdmin;
