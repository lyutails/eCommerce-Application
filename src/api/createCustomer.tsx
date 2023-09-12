import { IMyCustomerDraft } from '../types/interfaces';
import {
  ClientResponse,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';
import { loginCustomerThroughReg } from './passwordFlowSession';
import { AnyAction, Dispatch } from 'redux';
import { loginAnonUser } from './existTokenFlow';
import { IAnonymousCartData } from '../pages/Registration/Registration';

export async function createCustomerMe(
  data: IMyCustomerDraft,
  setSuccessfulMessage: React.Dispatch<React.SetStateAction<boolean>>,
  anonymousCartData: IAnonymousCartData,
  dispatch: Dispatch<AnyAction>
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
    if (anonymousCartData.anonymousID) {
      loginAnonUser(anonymousCartData.anonymousAccessToken, data, dispatch);
    } else {
      loginCustomerThroughReg(data, setSuccessfulMessage);
    }

    return customer;
  } catch {
    console.log('cannot create customer');
  }
}
