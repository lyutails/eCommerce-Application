import {
  ClientResponse,
  Customer,
  CustomerPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { apiRoot } from './createClientAdmin';

// const emailUser = 'TashaOneMore@example.com';

export async function getCustomerById(customerId: {
  ID: string;
}): Promise<ClientResponse<Customer>> {
  try {
    const customer = await apiRoot
      .customers()
      .withId(customerId)
      .get()
      .execute();
    // const customersArray = customers.body.results;
    // const customersEmailsArray = customersArray.filter(
    //   (email) => email.email === emailUser
    // );
    // console.log(customersEmailsArray);
    return customer;
  } catch {
    throw new Error('cannot get a customer');
  }
}
