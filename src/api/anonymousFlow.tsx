import { PROJECT_KEY } from '../constants';
import {
  AnonymousAuthMiddlewareOptions,
  ClientBuilder,
} from '@commercetools/sdk-client-v2';
import { httpMiddlewareOptions } from './clientBuilder';
import {
  Cart,
  ClientResponse,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { throwNewError } from '../utils/throwNewError';

if (typeof process.env.CLIENT_ID !== 'string') {
  throwNewError('no client id found');
}

if (typeof process.env.CLIENT_SECRET !== 'string') {
  throwNewError('no client secret found');
}

const options: AnonymousAuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
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

const anonymousClient = new ClientBuilder()
  .withAnonymousSessionFlow(options)
  .withHttpMiddleware(httpMiddlewareOptions)
  /* .withLoggerMiddleware() */
  .build();

export const createAnonymousCart = async (
  id?: string
): Promise<ClientResponse<Cart> | undefined> => {
  const apiRootAnonymous = createApiBuilderFromCtpClient(
    anonymousClient,
    'https://auth.us-central1.gcp.commercetools.com/'
  ).withProjectKey({
    projectKey: PROJECT_KEY,
  });
  try {
    const customer = await apiRootAnonymous
      .me()
      .carts()
      .post({
        body: {
          currency: 'USD',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .execute();
    return customer;
  } catch {
    throwNewError('no anon customer found');
    // console.error('no anon customer');
  }
};
