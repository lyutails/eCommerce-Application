import { Dispatch } from 'react';
import { ctpClient } from './clientBuilder';
import {
  ApiRoot,
  CategoryPagedQueryResponse,
  ClientResponse,
  CustomerPagedQueryResponse,
  ProductPagedQueryResponse,
  Project,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { AnyAction } from 'redux';
import { PROJECT_KEY } from '../constants';
// import { setImage } from '@/store/counterSlice';

// Create apiRoot from the imported ClientBuilder and include your Project key
export const apiRoot = createApiBuilderFromCtpClient(
  ctpClient,
  'https://auth.us-central1.gcp.commercetools.com/'
).withProjectKey({
  projectKey: PROJECT_KEY,
});

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
export const getProject = async (): Promise<ClientResponse<Project>> => {
  const api = await apiRoot.get().execute();
  return api;
};

// Retrieve Project information and output the result to the log
// getProject().then(console.log).catch(console.error);

/* console.log(apiRoot.categories());

console.log(apiRoot.products());

console.log(apiRoot.customers().get()); */

let image = '';

export async function getAllProducts(
  dispatch: Dispatch<AnyAction>
): Promise<ClientResponse<ProductPagedQueryResponse>> {
  try {
    const products = await apiRoot.products().get().execute();
    const url = products.body.results[0].masterData.current.variants[0].images;
    url?.length ? (image = url[0].url) : console.log('error');
    console.log(image, '1');
    // dispatch(setImage(url));
    return products;
    // put data in store
  } catch {
    throw new Error('no products found');
  }
}

export async function getCategories(): Promise<
  ClientResponse<CategoryPagedQueryResponse>
> {
  try {
    const categories = await apiRoot.categories().get().execute();
    const categorisArray = await categories.body.results;
    const categoryNamesArray = categorisArray.map((category) => category.name);
    const categoryNameKey = 'en-US';
    const categoryName = categoryNamesArray.map(
      (catName) => catName[categoryNameKey]
    );
    console.log(categoryName);
    return categories;
  } catch {
    throw new Error('no categories found');
  }
}

export async function getAllCustomers(): Promise<
  ClientResponse<CustomerPagedQueryResponse>
> {
  try {
    const customers = await apiRoot.customers().get().execute();
    console.log(customers);
    return customers;
  } catch {
    throw new Error('no customers found');
  }
}

// console.log(getAllProducts());
// console.log(getAllProducts());
