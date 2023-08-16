// const HOST = 'https://auth.us-central1.gcp.commercetools.com';
// const accessToken = 'oauth/token?grant_type=client_credentials';
// const viewProducts = 'view_products';
// const clientID = 'RsLm4scTNfDYdm76tjbYs0Hh';
// const clientSecret = 'q1b9hUuYCXvrBbjNQXX4vsIHbudzTSyD';

import {
  Client,
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
  TokenCache,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';
import SdkAuth from '@commercetools/sdk-auth';
import { PROJECT_KEY } from '../constants';

if (typeof process.env.CLIENT_ID !== 'string') {
  throw new Error('no client id found');
}

if (typeof process.env.CLIENT_SECRET !== 'string') {
  throw new Error('no client id found');
}

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.us-central1.gcp.commercetools.com',
  projectKey: PROJECT_KEY,
  credentials: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  },
  scopes: [
    'manage_customers:tycteam manage_my_quotes:tycteam view_categories:tycteam manage_my_profile:tycteam manage_customer_groups:tycteam manage_my_payments:tycteam manage_my_quote_requests:tycteam create_anonymous_token:tycteam view_published_products:tycteam manage_my_shopping_lists:tycteam manage_my_orders:tycteam view_discount_codes:tycteam manage_my_business_units:tycteam',
  ],
  fetch,
};

const authClient = new SdkAuth({
  host: 'https://auth.us-central1.gcp.commercetools.com/',
  projectKey: PROJECT_KEY,
  disableRefreshToken: false,
  credentials: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  },
  scopes: [
    'manage_customers:tycteam manage_my_quotes:tycteam view_categories:tycteam manage_my_profile:tycteam manage_customer_groups:tycteam manage_my_payments:tycteam manage_my_quote_requests:tycteam create_anonymous_token:tycteam view_published_products:tycteam manage_my_shopping_lists:tycteam manage_my_orders:tycteam view_discount_codes:tycteam manage_my_business_units:tycteam',
  ],

  fetch,
});

export type AuthAdmin = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
};

export const tokenCustomer = await authClient.clientCredentialsFlow();
// console.log(tokenCustomer);

// Configure httpMiddlewareOptions
export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.us-central1.gcp.commercetools.com',
  fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

// export const getAllProducts = async (): Promise<void> => {
//   try {
//     await fetch(`${HOST}${accessToken}`, {
//       method: 'POST',
//       headers: {
//         Authorization: `Basic ${clientID}:${clientSecret}`,
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     });
//   } catch (error) {
//     throw new Error('cannot find any products');
//   }
// };
