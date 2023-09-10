import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { apiRoot } from './createClientAdmin';
import { throwNewError } from '../utils/throwNewError';

export async function getCustomerById(customerId: {
  ID: string;
}): Promise<ClientResponse<Customer>> {
  try {
    const customer = await apiRoot
      .customers()
      .withId(customerId)
      .get()
      .execute();
    return customer;
  } catch {
    throwNewError('cannot get a customer by id');
  }
}
