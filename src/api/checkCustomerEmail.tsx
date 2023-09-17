import {
  ClientResponse,
  CustomerPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { apiRoot } from './createClientAdmin';
import { throwNewError } from '../utils/throwNewError';

export async function checkCustomerEmail(
  emailUser: string
): Promise<ClientResponse<CustomerPagedQueryResponse>> {
  try {
    const customers = await apiRoot.customers().get().execute();
    const customersArray = customers.body.results;
    const customersEmailsArray = customersArray.filter(
      (email) => email.email === emailUser
    );
    return customers;
  } catch {
    throwNewError('cannot get a customer by email');
  }
}
