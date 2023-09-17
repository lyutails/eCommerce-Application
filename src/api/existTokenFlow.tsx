import { PROJECT_KEY } from '../constants';
import {
  Cart,
  ClientResponse,
  createApiBuilderFromCtpClient,
  CustomerSignInResult,
  DiscountCodePagedQueryResponse,
  MyCartUpdate,
} from '@commercetools/platform-sdk';
import {
  ClientBuilder,
  ExistingTokenMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { httpMiddlewareOptions } from './clientBuilder';
import { IMyCartUpdate, IMyCustomerLoginDraft } from '../types/interfaces';
import { setAuthStatus } from '../store/reducers/userReducer';
import { AnyAction, Dispatch } from 'redux';

const options: ExistingTokenMiddlewareOptions = {
  force: true,
};

export const createAnonCart = async (
  authorization: string
): Promise<ClientResponse<Cart> | undefined> => {
  try {
    const apiRoot = createApiBuilderFromCtpClient(
      new ClientBuilder()
        .withExistingTokenFlow(`Bearer ${authorization}`, options)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build(),
      'https://auth.us-central1.gcp.commercetools.com/'
    ).withProjectKey({
      projectKey: PROJECT_KEY,
    });
    const cart = await apiRoot
      .me()
      .carts()
      .post({
        body: {
          currency: 'USD',
        },
      })
      .execute();
    return cart;
  } catch (error) {
    console.log(error);
  }
};

export const getAnonCart = async (
  authorization: string
): Promise<ClientResponse<Cart> | undefined> => {
  const apiRoot = createApiBuilderFromCtpClient(
    new ClientBuilder()
      .withExistingTokenFlow(`Bearer ${authorization}`, options)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build(),
    'https://auth.us-central1.gcp.commercetools.com/'
  ).withProjectKey({
    projectKey: PROJECT_KEY,
  });
  try {
    const cart = await apiRoot.me().activeCart().get().execute();
    return cart;
  } catch (error) {
    console.log('error');
  }
};

export const updateCart = async (
  id: string,
  data: IMyCartUpdate,
  authorization: string
): Promise<ClientResponse<Cart> | undefined> => {
  const apiRoot = createApiBuilderFromCtpClient(
    new ClientBuilder()
      .withExistingTokenFlow(`Bearer ${authorization}`, options)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build(),
    'https://auth.us-central1.gcp.commercetools.com/'
  ).withProjectKey({
    projectKey: PROJECT_KEY,
  });
  try {
    const cart = await apiRoot
      .me()
      .carts()
      .withId({
        ID: id,
      })
      .post({
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .execute();
    console.log(cart);
    return cart;
  } catch (error) {
    console.log(error);
  }
};

// LOGIN
export const loginAnonUser = async (
  authorization: string,
  request: IMyCustomerLoginDraft,
  dispatch: Dispatch<AnyAction>,
  setSuccessfulMessage: React.Dispatch<React.SetStateAction<boolean>>
): Promise<ClientResponse<CustomerSignInResult> | undefined> => {
  try {
    const apiRoot = createApiBuilderFromCtpClient(
      new ClientBuilder()
        .withExistingTokenFlow(`Bearer ${authorization}`, options)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build(),
      'https://auth.us-central1.gcp.commercetools.com/'
    ).withProjectKey({
      projectKey: PROJECT_KEY,
    });
    const cart = await apiRoot
      .me()
      .login()
      .post({
        body: request,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .execute();
    setSuccessfulMessage(true);
    return cart;
  } catch (error) {
    console.log(error);
  }
};

// GET DISCOUNT CODES
export const getDiscountCodes = async (
  authorization: string
): Promise<ClientResponse<DiscountCodePagedQueryResponse> | undefined> => {
  try {
    const apiRoot = createApiBuilderFromCtpClient(
      new ClientBuilder()
        .withExistingTokenFlow(`Bearer ${authorization}`, options)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build(),
      'https://auth.us-central1.gcp.commercetools.com/'
    ).withProjectKey({
      projectKey: PROJECT_KEY,
    });
    const codes = await apiRoot.discountCodes().get().execute();
    return codes;
  } catch (error) {
    console.log(error);
  }
};
