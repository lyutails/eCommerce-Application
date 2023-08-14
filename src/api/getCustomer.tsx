import {
  ClientResponse,
  CustomerPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { apiRoot } from './createClientAdmin';

// const emailUser = 'TashaOneMore@example.com';

export async function getCustomer(
  emailUser: string
): Promise<ClientResponse<CustomerPagedQueryResponse>> {
  try {
    const customers = await apiRoot.customers().get().execute();
    const customersArray = customers.body.results;
    const customersEmailsArray = customersArray.filter(
      (email) => email.email === emailUser
    );
    console.log(customersEmailsArray);
    return customers;
  } catch {
    throw new Error('cannot get a customer');
  }
}
