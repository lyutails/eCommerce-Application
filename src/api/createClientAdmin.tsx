import { ctpClient } from './adminBuilder';
import {
  ApiRoot,
  ClientResponse,
  ProductPagedQueryResponse,
  Project,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

// Create apiRoot from the imported ClientBuilder and include your Project key
export const apiRoot = createApiBuilderFromCtpClient(
  ctpClient,
  'https://auth.us-central1.gcp.commercetools.com/'
).withProjectKey({
  projectKey: 'tycteam',
});

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
export const getProject = async (): Promise<ClientResponse<Project>> => {
  const api = await apiRoot.get().execute();
  return api;
};

// Retrieve Project information and output the result to the log
getProject().then(console.log).catch(console.error);

console.log(apiRoot.products());

export const getAllProducts = async (): Promise<
  ClientResponse<ProductPagedQueryResponse>
> => {
  const products = await apiRoot.products().get().execute();
  console.log(products);
  return products;
};
