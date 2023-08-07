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
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.us-central1.gcp.commercetools.com',
  projectKey: 'tycteam',
  credentials: {
    clientId: 'pGNr9S65n3Q9wLRDKGyla3SM',
    clientSecret: '9nk3d8zlMyu1WciXuRXSn64H5MNmLMIq',
  },
  scopes: ['manage_project:tycteam manage_api_clients:tycteam'],
  fetch,
};

const authClient = new SdkAuth({
  host: 'https://auth.us-central1.gcp.commercetools.com/',
  projectKey: 'tycteam',
  disableRefreshToken: false,
  credentials: {
    clientId: 'pGNr9S65n3Q9wLRDKGyla3SM',
    clientSecret: '9nk3d8zlMyu1WciXuRXSn64H5MNmLMIq',
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
console.log(tokenAdmin);

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
