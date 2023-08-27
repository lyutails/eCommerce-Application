import {
  ClientResponse,
  Product,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';

export async function getProducts(): Promise<ProductProjection[]> {
  try {
    // const products = await apiRoot.products().get().execute();
    /* const url = products.body.results[0].masterData.current.variants[0].images;
    url?.length ? (image = url[0].url) : console.log('error'); */

    const productsProjection = await apiRoot
      .productProjections()
      .get({
        // queryArgs: { where: `categories(id="${categoryId}")` },
      })
      .execute();

    const totalProductsAmount = productsProjection.body.results.length;
    const totalProductsCount = productsProjection.body.results;

    console.log(totalProductsCount);
    return totalProductsCount;
  } catch {
    throw new Error('no products found');
  }
}

// export async function returnProductByKey(
//   productKey: string
// ): Promise<ClientResponse<Product>> {
//   try {
//     const productByKey = await apiRoot
//       .products()
//       .withKey({
//         key: `${productKey}`,
//       })
//       .get()
//       .execute();
//     return productByKey;
//   } catch {
//     throw new Error('no product by key found');
//   }
// }

// export async function returnProductById(
//   productId: string
// ): Promise<ClientResponse<Product>> {
//   try {
//     const productByKey = await apiRoot
//       .products()
//       .withId({
//         ID: `${productId}`,
//       })
//       .get()
//       .execute();
//     return productByKey;
//   } catch {
//     throw new Error('no product by id found');
//   }
// }

// export async function getProductProjectionsById(
//   productId: number
// ): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
//   try {
//     const productById = apiRoot
//       .productProjections()
//       .search()
//       .get({
//         queryArgs: {
//           filter: `ID: ${productId}`,
//         },
//       })
//       .execute();
//     return productById;
//   } catch {
//     throw new Error('no subtrees found');
//   }
// }

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
  productVariantKey: string
): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
  try {
    const productByIdKey = apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: `variants.key: "${productVariantKey}"`,
        },
      })
      .execute();
    return productByIdKey;
  } catch {
    throw new Error('no product variant by key found');
  }
}
