import {
  ProductPagedQueryResponse,
  ClientResponse,
} from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';

export async function getProducts(): Promise<
  ClientResponse<ProductPagedQueryResponse>
> {
  try {
    const products = await apiRoot.products().get().execute();
    /* const url = products.body.results[0].masterData.current.variants[0].images;
    url?.length ? (image = url[0].url) : console.log('error'); */
    return products;
  } catch {
    throw new Error('no products found');
  }
}
