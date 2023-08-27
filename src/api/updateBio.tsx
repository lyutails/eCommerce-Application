import { PROJECT_KEY } from '../constants';
import {
  ClientResponse,
  createApiBuilderFromCtpClient,
  Customer,
  CustomerSignInResult,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
// import { loginUserCTPClient } from './passwordFlowSession';
import { IMyCustomerLoginDraft } from '../types/interfaces';
import { tokenAdmin } from './adminBuilder';
import {
  Client,
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { httpMiddlewareOptions } from './clientBuilder';

if (typeof process.env.ADMIN_CLIENT_ID !== 'string') {
  throw new Error('no client id found');
}

if (typeof process.env.ADMIN_CLIENT_SECRET !== 'string') {
  throw new Error('no client id found');
}

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetch?: any;
} => {
  if (typeof process.env.ADMIN_CLIENT_ID !== 'string') {
    throw new Error('no client id found');
  }
  if (typeof process.env.ADMIN_CLIENT_SECRET !== 'string') {
    throw new Error('no client id found');
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

// export const updateCustomer = async (
//   data: MyCustomerUpdate,
//   refreshToken: string
// ): Promise<ClientResponse<Customer> | undefined> => {
//   //   const apiRoot = createApiBuilderFromCtpClient(
//   //     loginUserCTPClient(request.email, request.password),
//   //     'https://auth.us-central1.gcp.commercetools.com/'
//   //   ).withProjectKey({
//   //     projectKey: PROJECT_KEY,
//   //   });
//   const tokenInfo = await authClient.getTokenInfo(refreshToken);
//   const newAccessToken = tokenInfo.access_token;

//   const apiRoot = createApiBuilderFromCtpClient({
//     host: 'https://api.sphere.io',
//     oauthHost: 'https://auth.sphere.io',
//     projectKey: PROJECT_KEY,
//     credentials: {
//       clientId: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       refresh_token: refreshToken,
//     },
//   });

//   //   const tokenInfo = await tokenAdmin.getTokenInfo(refreshToken);
//   //   const newAccessToken = tokenInfo.access_token;

//   //   const apiRoot = createApiBuilderFromCtpClient({
//   //     host: 'https://auth.us-central1.gcp.commercetools.com',
//   //     oauthHost: 'https://auth.us-central1.gcp.commercetools.com',
//   //     projectKey: PROJECT_KEY,
//   //     credentials: {
//   //       clientId: process.env.CLIENT_ID,
//   //       clientSecret: process.env.CLIENT_SECRET,
//   //       refresh_token: refreshToken,
//   //     },
//   //   });

//   try {
//     const customer = await apiRoot
//       .me()
//       .post({
//         body: data,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//       .execute();
//     return customer;
//   } catch (error) {
//     console.log(error);
//   }
// };

// {
//     "version" : 1,
//     "actions" : [ {
//   "action": "setFirstName",
//   "firstName": "John"
//     } ]
//   }
