import { IMyCustomerDraft } from '../types/interfaces';
import {
  ClientResponse,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';
import { AnyAction, Dispatch } from 'redux';
import { loginAnonUser } from './existTokenFlow';

export async function createCustomerMe(
  data: IMyCustomerDraft,
  accessToken: string,
  dispatch: Dispatch<AnyAction>,
  setSuccessfulMessage: React.Dispatch<React.SetStateAction<boolean>>,
  setUnsuccessfulMessage: React.Dispatch<React.SetStateAction<boolean>>
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
    loginAnonUser(accessToken, data, dispatch, setSuccessfulMessage);
    return customer;
  } catch {
    setUnsuccessfulMessage(true);
    console.log('cannot create customer');
  }
}
