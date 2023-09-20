import {
  ClientResponse,
  ProductProjectionPagedSearchResponse,
  ProductType,
} from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';
import { apiRoot as apiRootAdmin } from './createClientAdmin';

export async function filterByAttributes(
  colour: string,
  subtrees: string,
  size: string,
  bestseller: string,
  sale: string,
  brand: string,
  sortpricename: string | string[],
  search: string,
  fuzzylevel: number,
  priceRangeStart: string,
  priceRangeFinish: string,
  limit: number,
  offset: number,
  winter: string
): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
  try {
    const productsByColour = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          sort: sortpricename,
          limit: Number(`${limit}`),
          'text.en-us': `${search}`,
          fuzzy: true,
          fuzzyLevel: Number(`${fuzzylevel}`),
          offset: Number(`${limit}`) * Number(`${offset}`),
          'filter.query': [
            `categories.id: ${subtrees}`,
            `variants.attributes.color.key:${colour}`,
            `variants.attributes.size.key:${size}`,
            `variants.attributes.bestseller:${bestseller}`,
            `variants.attributes.sale:${sale}`,
            `variants.attributes.winter:${winter}`,
            `variants.attributes.brand.key:${brand}`,
            `variants.price.centAmount:range (${priceRangeStart} to ${priceRangeFinish})`,
          ],
        },
      })
      .execute();
    return productsByColour;
  } catch {
    throw new Error('no product by attribute or filter found');
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

export async function getProductTypeSizeAttribute(): Promise<
  ClientResponse<ProductType>
> {
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
