import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  // ClientResponse,
} from '@commercetools/sdk-client-v2';
// import SdkAuth from '@commercetools/sdk-auth';
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
    clientId: 'r7yIlKEOYGCMaDPRP-gRsQ_Y',
    clientSecret: 'ENd3xTEs-ovyG01fAgZEB9AE3AB9qMT5',
  },
  scopes: [
    'manage_project:tycteam manage_api_clients:tycteam view_audit_log:tycteam',
  ],
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.us-central1.gcp.commercetools.com',
  fetch,
};

// const authClient = new SdkAuth({
//   host: 'https://auth.us-central1.gcp.commercetools.com/',
//   projectKey: 'tycteam',
//   disableRefreshToken: false,
//   credentials: {
//     clientId: 'RsLm4scTNfDYdm76tjbYs0Hh',
//     clientSecret: 'q1b9hUuYCXvrBbjNQXX4vsIHbudzTSyD',
//   },
//   scopes: [
//     'manage_project:tycteam',
//     'view_audit_log:tycteam',
//     'manage_api_clients:tycteam',
//   ],
//   fetch,
// });

// export type AuthAdmin = {
//   access_token: string;
//   token_type: string;
//   expires_in: number;
//   scope: string;
// };

// const token = await authClient
//   .withClientCredentialsFlow({
//     scopes: [
//       'manage_project:tycteam',
//       'view_audit_log:tycteam',
//       'manage_api_clients:tycteam',
//     ],
//   })
//   .then((response: { string: AuthAdmin }) => {
//     console.log(response);
//   });
// console.log(token);

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

// export const getApiRoot: () => ApiRoot = () => {
//   return createApiBuilderFromCtpClient(ctpClient);
// };
