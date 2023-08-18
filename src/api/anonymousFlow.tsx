import { PROJECT_KEY } from '../constants';
import {
  AnonymousAuthMiddlewareOptions,
  ClientBuilder,
} from '@commercetools/sdk-client-v2';
import { httpMiddlewareOptions } from './clientBuilder';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

if (typeof process.env.CLIENT_ID !== 'string') {
  throw new Error('no client id found');
}

if (typeof process.env.CLIENT_SECRET !== 'string') {
  throw new Error('no client id found');
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
  .withLoggerMiddleware()
  .build();

export const apiRootAnonymous = createApiBuilderFromCtpClient(
  anonymousClient,
  'https://auth.us-central1.gcp.commercetools.com/'
).withProjectKey({
  projectKey: PROJECT_KEY,
});
