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
  sortprice: string,
  // search: string
  priceRangeStart: string,
  priceRangeFinish: string
): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
  try {
    const productsByColour = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          sort: `${sortprice}`,
          limit: 8,
          // 'text.en-us': '',
          fuzzy: true,
          fuzzyLevel: 1,
          offset: 8 * 0,
          // priceCurrency: 'USD',
          // filter: 'variants.scopedPriceDiscounted:true',
          // filter: [`variants.scopedPriceDiscounted:"true"`],
          'filter.query': [
            // `categories.id: subtree("877113a4-f6f2-40df-acee-02bdf03f9977")`,
            // `categories.id: subtree("00b71d4b-d8b0-463c-9561-23017777d0eb"), subtree("e19653dc-8b6f-4784-8df2-d8bde2262d28")`,
            `categories.id: ${subtrees}`,
            `variants.attributes.color.key:${colour}`,
            `variants.attributes.size.key:${size}`,
            `variants.attributes.bestseller:${bestseller}`,
            `variants.attributes.sale:${sale}`,
            `variants.attributes.brand.key:${brand}`,
            `variants.price.centAmount:range (${priceRangeStart} to ${priceRangeFinish})`,
            // `variants.scopedPriceDiscounted:"true"`,
          ],
        },
      })
      .execute();
    return productsByColour;
  } catch {
    console.log('no product by attribute found');
    throw new Error('no product by attribute found');
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

// window.apiRootAdmin = apiRootAdmin;

// export async function filterBySize(
//   colour: string
// ): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
//   try {
//     const productsByColour = await apiRoot
//       .productProjections()
//       .search()
//       .get({
//         queryArgs: {
//           facet: ['variants.attributes.color'],
//           'filter.query': [`variants.attributes.size.key:"${size}"`],
//         },
//       })
//       .execute();
//     return productsByColour;
//   } catch {
//     throw new Error('no product variant by key found');
//   }
// }
