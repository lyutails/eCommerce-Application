import { ICustomerFields, ICustomerParam } from '../types/interfaces';
import { ctpClient } from './clientBuilder';
import {
  ClientResponse,
  CustomerPagedQueryResponse,
  Project,
  createApiBuilderFromCtpClient,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';

import { PROJECT_KEY } from '../constants';
import { GetCategories } from './getCategories';
import { getProducts } from './getProducts';

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

export const categories = GetCategories();

export const products = getProducts();

const customerDraftData = {
  email: 'johndFather@example.com',
  firstName: 'John',
  lastName: 'Doe',
  password: 'secret123',
  streetName: 'Stedman St',
  streetNumber: '10',
  postalCode: '99901',
  city: 'Ketchikan',
  state: 'AK',
  country: 'US',
  building: '5',
  apartment: '2346',
};

// const createCustomerDraft = (customerData: CustomerFields): CustomerParam => {
//   const { email, firstName, lastName, password } = customerData;
//   return {
//     email,
//     firstName,
//     lastName,
//     password,
//     addresses: [
//       {
//         streetName: streetName,
//         streetNumber: streetNumber,
//         postalCode: postalCode,
//         city: city,
//         state: state,
//         country: country,
//         building: building,
//         apartment: apartment,
//       },
//     ],
//   };
// };

export async function getAllCustomers(): Promise<
  ClientResponse<CustomerPagedQueryResponse>
> {
  try {
    const customers = await apiRoot.customers().get().execute();
    return customers;
  } catch {
    throw new Error('no customers found');
  }
}

export async function createCustomer(
  data: ICustomerFields
): Promise<ClientResponse<CustomerSignInResult>> {
  try {
    const customer = await apiRoot
      .me()
      .signup()
      .post({
        // body: createCustomerDraft(data),
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .execute();
    return customer;
  } catch {
    throw new Error('cannot create a customer me');
  }
}

export async function createCustomerTwo(
  data: ICustomerFields
): Promise<ClientResponse<CustomerSignInResult>> {
  try {
    const customer = await apiRoot
      .customers()
      .post({
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .execute();
    return customer;
  } catch {
    throw new Error('cannot create a customer');
  }
}
