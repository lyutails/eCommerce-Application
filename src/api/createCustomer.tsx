import {
  ClientResponse,
  CustomerPagedQueryResponse,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';

export interface ICustomerFields {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  building: string;
  apartment: string;
}

export async function createCustomer(
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

// const emailUser = 'TashaOneMore@example.com';

export async function getCustomer(
  emailUser: string
): Promise<ClientResponse<CustomerPagedQueryResponse>> {
  try {
    const customer = await apiRoot.customers().get().execute();
    const customersArray = customer.body.results;
    const customersEmailsArray = customersArray.filter(
      (email) => email.email === emailUser
    );
    console.log(customersEmailsArray);
    return customer;
  } catch {
    throw new Error('cannot get a customer');
  }
}
