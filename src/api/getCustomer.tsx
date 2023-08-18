import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { apiRoot } from './createClientAdmin';

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
    throw new Error('cannot get a customer');
  }
}
