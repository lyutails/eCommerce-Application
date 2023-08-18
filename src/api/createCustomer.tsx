import { IMyCustomerDraft } from '../types/interfaces';
import {
  ClientResponse,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { NavigateFunction } from 'react-router-dom';
import { AnyAction, Dispatch } from 'redux';
import { apiRoot } from './createClient';
import { loginCustomerThroughMe } from './passwordFlowSession';

export async function createCustomerMe(
  data: IMyCustomerDraft,
  dispatch: Dispatch<AnyAction>,
  navigator: NavigateFunction
): Promise<ClientResponse<CustomerSignInResult> | undefined> {
  try {
    const customer = await apiRoot
      .me()
      .signup()
      .post({
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .execute();
    loginCustomerThroughMe(data, dispatch, navigator);
    return customer;
  } catch {
    console.log('cannot create customer');
    /* logic from api here if error */
  }
}

export const customerOne = {
  email: 'johnIanaTestAddress@example.com',
  firstName: 'Iana',
  lastName: 'Belousova',
  password: 'snmthjs',
  addresses: [
    {
      streetName: 'Hhdjlzld',
      streetNumber: '45',
      postalCode: '30100',
      city: 'hbcbjisne',
      country: 'usa',
    },
    {
      streetName: 'PPPPPPPP',
      streetNumber: '45',
      postalCode: '30100',
      city: 'PPPPPPP',
      country: 'canada',
    },
  ],
  defaultShippingAddress: 0,
  defaultBillingAddress: 1,
};
