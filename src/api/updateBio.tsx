import { PROJECT_KEY } from '../constants';
import {
  ClientResponse,
  createApiBuilderFromCtpClient,
  Customer,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
import {
  Client,
  ClientBuilder,
  RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { httpMiddlewareOptions } from './clientBuilder';
import { throwNewError } from '../utils/throwNewError';

export function loginUserCTPClient(
  token: RefreshAuthMiddlewareOptions
): Client {
  const ctpClient = new ClientBuilder()
    .withRefreshTokenFlow(token)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
  return ctpClient;
}

const authMiddlewareOptionsForPasswordFlow = (
  refreshToken: string
): {
  host: string;
  projectKey: string;
  credentials: {
    clientId: string;
    clientSecret: string;
  };
  refreshToken: string;
  scopes: string[];
} => {
  if (typeof process.env.ADMIN_CLIENT_ID !== 'string') {
    throwNewError('no client id found');
  }
  if (typeof process.env.ADMIN_CLIENT_SECRET !== 'string') {
    throwNewError('no client secret found');
  }
  const options = {
    host: 'https://auth.us-central1.gcp.commercetools.com/',
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: process.env.ADMIN_CLIENT_ID,
      clientSecret: process.env.ADMIN_CLIENT_SECRET,
    },
    refreshToken: refreshToken,
    scopes: [
      'manage_customers:tycteam manage_my_quotes:tycteam view_categories:tycteam manage_my_profile:tycteam manage_customer_groups:tycteam manage_my_payments:tycteam manage_my_quote_requests:tycteam create_anonymous_token:tycteam view_published_products:tycteam manage_my_shopping_lists:tycteam manage_my_orders:tycteam view_discount_codes:tycteam manage_my_business_units:tycteam',
    ],
    fetch,
  };
  return options;
};

export const updateCustomer = async (
  refreshToken: string,
  data: MyCustomerUpdate
): Promise<ClientResponse<Customer> | undefined> => {
  const apiRoot = createApiBuilderFromCtpClient(
    loginUserCTPClient(authMiddlewareOptionsForPasswordFlow(refreshToken)),
    'https://auth.us-central1.gcp.commercetools.com/'
  ).withProjectKey({
    projectKey: PROJECT_KEY,
  });
  try {
    const customer = await apiRoot
      .me()
      .post({
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .execute();
    return customer;
  } catch (error) {
    console.log(error);
  }
};
