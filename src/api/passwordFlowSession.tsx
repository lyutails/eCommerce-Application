import { setAuthStatus } from '../store/reducers/userReducer';
import {
  ClientResponse,
  createApiBuilderFromCtpClient,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';
import {
  Client,
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
  TokenCache,
} from '@commercetools/sdk-client-v2';
import { Dispatch } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
// import createAuthMiddlewareForPasswordFlow from '@commercetools/sdk-client-v2/dist/declarations/src/sdk-middleware-auth/password-flow';
import { PROJECT_KEY } from '../constants';
import { httpMiddlewareOptions } from './clientBuilder';
import { NavigateFunction } from 'react-router-dom';
// import MyTokenCache from './tockenCache';

export interface IMyCustomerLoginDraft {
  email: string;
  password: string;
}

// const tokenCache = new MyTokenCache();

const authMiddlewareOptionsForPasswordFlow = (
  username: string,
  password: string
): PasswordAuthMiddlewareOptions => {
  if (typeof process.env.CLIENT_ID !== 'string') {
    throw new Error('no client id found');
  }
  if (typeof process.env.CLIENT_SECRET !== 'string') {
    throw new Error('no client id found');
  }
  const options: PasswordAuthMiddlewareOptions = {
    host: 'https://auth.us-central1.gcp.commercetools.com/',
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      user: {
        username,
        password,
      },
    },
    scopes: [
      'manage_customers:tycteam manage_my_quotes:tycteam view_categories:tycteam manage_my_profile:tycteam manage_customer_groups:tycteam manage_my_payments:tycteam manage_my_quote_requests:tycteam create_anonymous_token:tycteam view_published_products:tycteam manage_my_shopping_lists:tycteam manage_my_orders:tycteam view_discount_codes:tycteam manage_my_business_units:tycteam',
    ],
    // tokenCache: tokenCache,
    fetch,
  };
  return options;
};

export function loginUserCTPClient(username: string, password: string): Client {
  const ctpClient = new ClientBuilder()
    .withPasswordFlow(authMiddlewareOptionsForPasswordFlow(username, password))
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
  return ctpClient;
}

export const loginCustomerThroughMe = async (
  request: IMyCustomerLoginDraft,
  dispatch: Dispatch<AnyAction>,
  navigator: NavigateFunction
): Promise<ClientResponse<CustomerSignInResult> | undefined> => {
  const apiRoot = createApiBuilderFromCtpClient(
    loginUserCTPClient(request.email, request.password),
    'https://auth.us-central1.gcp.commercetools.com/'
  ).withProjectKey({
    projectKey: PROJECT_KEY,
  });
  try {
    const customer = await apiRoot
      .me()
      .login()
      .post({
        body: request,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .execute();
    dispatch(setAuthStatus(true));
    localStorage.setItem('isAuth', 'true');
    navigator('/');
    return customer;
  } catch (error) {
    console.log(error);
  }
};
