import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import SdkAuth from '@commercetools/sdk-auth';
import fetch from 'node-fetch';
import { PROJECT_KEY } from '../constants';
import { throwNewError } from '../utils/throwNewError';
import { IRefreshTokenData } from '../types/interfaces';

if (typeof process.env.ADMIN_CLIENT_ID !== 'string') {
  throwNewError('no admin client id found');
}

if (typeof process.env.ADMIN_CLIENT_SECRET !== 'string') {
  throwNewError('no admin client secret found');
}

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.us-central1.gcp.commercetools.com',
  projectKey: PROJECT_KEY,
  credentials: {
    clientId: process.env.ADMIN_CLIENT_ID,
    clientSecret: process.env.ADMIN_CLIENT_SECRET,
  },
  scopes: ['manage_project:tycteam manage_api_clients:tycteam'],
  fetch,
};

export const authClient = new SdkAuth({
  host: 'https://auth.us-central1.gcp.commercetools.com/',
  projectKey: PROJECT_KEY,
  disableRefreshToken: false,
  credentials: {
    clientId: process.env.ADMIN_CLIENT_ID,
    clientSecret: process.env.ADMIN_CLIENT_SECRET,
  },
  scopes: ['manage_project:tycteam manage_api_clients:tycteam'],
  fetch,
});

export const tokenAdmin = authClient.clientCredentialsFlow();
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.us-central1.gcp.commercetools.com',
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

export const getCustomerToken = async (
  username: string,
  password: string
): Promise<IRefreshTokenData> => {
  const customer = await authClient.customerPasswordFlow(
    {
      username,
      password,
    },
    {
      disableRefreshToken: false,
    }
  );
  return customer;
};

export const refreshTokenFlow = async (
  token: string
): Promise<IRefreshTokenData> => {
  const customer = await authClient.refreshTokenFlow(token);
  return customer;
};

export const anonymousSessionFlow = async (
  id?: string
): Promise<IRefreshTokenData> => {
  let customer;
  if (id) {
    customer = authClient.anonymousFlow(id);
  } else {
    customer = authClient.anonymousFlow();
  }
  return customer;
};
