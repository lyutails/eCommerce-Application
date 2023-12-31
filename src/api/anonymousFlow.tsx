import { PROJECT_KEY } from '../constants';
import {
  AnonymousAuthMiddlewareOptions,
  Client,
  ClientBuilder,
} from '@commercetools/sdk-client-v2';
import { httpMiddlewareOptions } from './clientBuilder';
import {
  Cart,
  ClientResponse,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { throwNewError } from '../utils/throwNewError';
import { myTokenCache } from './tockenCache';

export function anonymousFlowOptions(): AnonymousAuthMiddlewareOptions {
  if (typeof process.env.ANON_CLIENT_ID !== 'string') {
    throwNewError('no anon client id found');
  }

  if (typeof process.env.ANON_CLIENT_SECRET !== 'string') {
    throwNewError('no anon client secret found');
  }
  const options: AnonymousAuthMiddlewareOptions = {
    host: 'https://auth.us-central1.gcp.commercetools.com/',
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: process.env.ANON_CLIENT_ID,
      clientSecret: process.env.ANON_CLIENT_SECRET,
    },
    scopes: [
      'manage_customers:tycteam manage_my_quotes:tycteam view_categories:tycteam manage_my_profile:tycteam manage_customer_groups:tycteam manage_my_payments:tycteam introspect_oauth_tokens:tycteam view_orders:tycteam manage_my_quote_requests:tycteam create_anonymous_token:tycteam view_published_products:tycteam manage_my_shopping_lists:tycteam manage_my_orders:tycteam view_discount_codes:tycteam manage_my_business_units:tycteam view_cart_discounts:tycteam manage_api_clients:tycteam',
    ],
    fetch,
  };
  return options;
}

export function anonymousFlowClient(): Client {
  const anonymousClient = new ClientBuilder()
    .withAnonymousSessionFlow(anonymousFlowOptions())
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
  return anonymousClient;
}

export const anonymousSessionFlowTwo = async (): Promise<
  ClientResponse<Cart> | undefined
> => {
  const apiRootAnonymous = createApiBuilderFromCtpClient(
    anonymousFlowClient(),
    'https://auth.us-central1.gcp.commercetools.com/'
  ).withProjectKey({
    projectKey: PROJECT_KEY,
  });
  console.log(myTokenCache.get());
  try {
    const customer = await apiRootAnonymous
      .me()
      .carts()
      .post({
        body: {
          currency: 'USD',
        },
      })
      .execute();
    return customer;
  } catch (error) {
    console.error(error);
  }
};
