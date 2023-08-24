import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';

export async function getProducts(): Promise<ProductProjection[]> {
  try {
    // const products = await apiRoot.products().get().execute();
    /* const url = products.body.results[0].masterData.current.variants[0].images;
    url?.length ? (image = url[0].url) : console.log('error'); */

    const productsProjection = await apiRoot
      .productProjections()
      .search()
      .get()
      .execute();

    const totalProductsAmount = productsProjection.body.results.length;
    const totalProductsCount = productsProjection.body.results;

    return totalProductsCount;
  } catch {
    throw new Error('no products found');
  }
}
