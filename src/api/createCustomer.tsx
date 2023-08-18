import {
  BaseAddress,
  ClientResponse,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { NavigateFunction } from 'react-router-dom';
import { AnyAction, Dispatch } from 'redux';
import { apiRoot } from './createClient';
import { loginCustomerThroughMe } from './passwordFlowSession';

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

// export async function createCustomer(
//   data: ICustomerFields
// ): Promise<ClientResponse<CustomerSignInResult>> {
//   try {
//     const customer = await apiRoot
//       .customers()
//       .post({
//         body: data,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//       .execute();
//     return customer;
//   } catch {
//     throw new Error('cannot create a customer');
//   }
// }

export interface IMyCustomerDraft {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
  addresses: BaseAddress[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

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
    // logic from api here if error
  }
}

export interface IMyCustomerLoginDraft {
  email: string;
  password: string;
}

// export async function loginCustomer(
//   data: IMyCustomerLoginDraft
// ): Promise<ClientResponse<CustomerSignInResult>> {
//   try {
//     const customer = await apiRoot
//       .me()
//       .login()
//       .post({
//         body: data,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//       .execute();
//     // console.log(customer);
//     return customer;
//   } catch {
//     throw new Error('cannot login a me customer');
//     // logic from api here if error
//   }
// }

const customerOne = {
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

// {
//   "email": "johnIanaTestAddress@example.com",
//   "firstName": "Iana",
//   "lastName": "Belousova",
//   "password": "snmthjs",
//   "addresses": [
//     {
//       "streetName": "Hhdjlzld",
//       "streetNumber": "45",
//       "postalCode": "30100",
//       "city": "hbcbjisne",
//       "country": "usa"
//     },
//     {
//       "streetName": "PPPPPPPP",
//       "streetNumber": "45",
//       "postalCode": "30100",
//       "city": "PPPPPPP",
//       "country": "canada"
//     }
//   ],
//   "defaultShippingAddress": 0,
//   "defaultBillingAddress": 1
// }
