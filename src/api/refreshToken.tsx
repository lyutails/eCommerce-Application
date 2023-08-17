import { PROJECT_KEY } from '../constants';
import {
  Client,
  ClientBuilder,
  RefreshAuthMiddlewareOptions,
  TokenCache,
} from '@commercetools/sdk-client-v2';
import { httpMiddlewareOptions } from './clientBuilder';
import {
  ClientRequest,
  ClientResponse,
  createApiBuilderFromCtpClient,
  CustomerPagedQueryResponse,
} from '@commercetools/platform-sdk';
import MyTokenCache from './tockenCache';

const authMiddlewareOptionsForRefreshTokenFlow = (
  refreshToken: string
): RefreshAuthMiddlewareOptions => {
  if (typeof process.env.CLIENT_ID !== 'string') {
    throw new Error('no client id found refresh token flow');
  }
  if (typeof process.env.CLIENT_SECRET !== 'string') {
    throw new Error('no client id found refresh token flow');
  }

  if (typeof MyTokenCache !== 'string') {
    throw new Error('no client id found refresh token flow');
  }
  const options: RefreshAuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    refreshToken: refreshToken,
    // tokenCache: MyTokenCache,
    // scopes: [
    //   'manage_customers:tycteam manage_my_quotes:tycteam view_categories:tycteam view_customer_groups:tycteam manage_my_profile:tycteam manage_customer_groups:tycteam manage_my_payments:tycteam create_anonymous_token:tycteam view_published_products:tycteam manage_my_shopping_lists:tycteam view_discount_codes:tycteam manage_my_business_units:tycteam anonymous_id:1b78b195-1221-4949-be5b-55e969fa9b52 manage_my_quote_requests:tycteam view_customers:tycteam manage_my_orders:tycteam',
    // ],
    fetch,
  };

  return options;
};

export function refreshUserCTPClient(refreshToken: string): Client {
  const ctpClient = new ClientBuilder()
    .withRefreshTokenFlow(
      authMiddlewareOptionsForRefreshTokenFlow(refreshToken)
    )
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
  return ctpClient;
}

export const refreshTokenSession = async (
  token: string
): Promise<ClientResponse<CustomerPagedQueryResponse>> => {
  const apiRoot = createApiBuilderFromCtpClient(
    refreshUserCTPClient(token),
    'https://auth.us-central1.gcp.commercetools.com/'
  ).withProjectKey({
    projectKey: PROJECT_KEY,
  });
  try {
    const customer = apiRoot.customers().get().execute();
    return customer;
  } catch {
    throw new Error('fkehvnl;kr./');
  }
};
