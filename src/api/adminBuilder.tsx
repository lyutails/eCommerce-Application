import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  // ClientResponse,
} from '@commercetools/sdk-client-v2';
import SdkAuth from '@commercetools/sdk-auth';
import fetch from 'node-fetch';
// import {
//   ApiRoot,
//   Project,
//   createApiBuilderFromCtpClient,
// } from '@commercetools/platform-sdk';

// Configure authMiddlewareOptions
export const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.us-central1.gcp.commercetools.com/',
  projectKey: 'tycteam',
  credentials: {
    clientId: 'zqlceifwdjqdiKjoYsMlFBL7',
    clientSecret: 'n1JGoAhk1Bl4_G1xyhT3O6axP2KdA8Hi',
  },
  scopes: ['manage_project:tycteam'],
  fetch,
};

const authClient = new SdkAuth({
  host: 'https://auth.us-central1.gcp.commercetools.com/',
  projectKey: 'tycteam',
  disableRefreshToken: false,
  credentials: {
    clientId: 'zqlceifwdjqdiKjoYsMlFBL7',
    clientSecret: 'n1JGoAhk1Bl4_G1xyhT3O6axP2KdA8Hi',
  },
  scopes: ['manage_project:tycteam'],
  fetch,
});

export type AuthAdmin = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
};

export const tokenAdmin = await authClient.clientCredentialsFlow();
console.log(tokenAdmin);

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.us-central1.gcp.commercetools.com',
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
