// const HOST = 'https://auth.us-central1.gcp.commercetools.com';
// const accessToken = 'oauth/token?grant_type=client_credentials';
// const viewProducts = 'view_products';
// const clientID = 'RsLm4scTNfDYdm76tjbYs0Hh';
// const clientSecret = 'q1b9hUuYCXvrBbjNQXX4vsIHbudzTSyD';

import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.us-central1.gcp.commercetools.com/oauth/token?grant_type=client_credentials',
  projectKey: 'tycteam',
  credentials: {
    clientId: 'RsLm4scTNfDYdm76tjbYs0Hh',
    clientSecret: 'q1b9hUuYCXvrBbjNQXX4vsIHbudzTSyD',
  },
  scopes: [
    'view_products:tycteam manage_my_quotes:tycteam view_categories:tycteam manage_my_business_units:tycteam manage_my_profile:tycteam manage_my_payments:tycteam manage_my_quote_requests:tycteam create_anonymous_token:tycteam view_published_products:tycteam manage_my_shopping_lists:tycteam manage_my_orders:tycteam',
  ],
  fetch,
};

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
