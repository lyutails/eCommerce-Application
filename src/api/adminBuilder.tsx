import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  // ClientResponse,
} from '@commercetools/sdk-client-v2';
import SdkAuth from '@commercetools/sdk-auth';
import fetch from 'node-fetch';
import { PROJECT_KEY } from '../constants';
// import {
//   ApiRoot,
//   Project,
//   createApiBuilderFromCtpClient,
// } from '@commercetools/platform-sdk';

if (typeof process.env.ADMIN_CLIENT_ID !== 'string') {
  throw new Error('no client id found');
}

if (typeof process.env.ADMIN_CLIENT_SECRET !== 'string') {
  throw new Error('no client id found');
}

// Configure authMiddlewareOptions
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

const authClient = new SdkAuth({
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

export type AuthAdmin = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
};

export const tokenAdmin = await authClient.clientCredentialsFlow();

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.us-central1.gcp.commercetools.com',
  fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const customerToken = async (
  username: string,
  password: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
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
