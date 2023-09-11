import { IMyCustomerDraft } from '../types/interfaces';
import {
  ClientResponse,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';
import { loginCustomerThroughReg } from './passwordFlowSession';

export async function createCustomerMe(
  data: IMyCustomerDraft,
  setSuccessfulMessage: React.Dispatch<React.SetStateAction<boolean>>
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
    loginCustomerThroughReg(data, setSuccessfulMessage);
    return customer;
  } catch {
    console.log('cannot create customer');
  }
}
