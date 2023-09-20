import { PROJECT_KEY } from '../constants';
import {
  Client,
  ClientBuilder,
  RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { httpMiddlewareOptions } from './clientBuilder';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { throwNewError } from '../utils/throwNewError';

// i don't need that

const authMiddlewareOptionsForRefreshTokenFlow = (
  refreshToken: string
): RefreshAuthMiddlewareOptions => {
  if (typeof process.env.ADMIN_CLIENT_ID !== 'string') {
    throwNewError('no client id found');
  }
  if (typeof process.env.ADMIN_CLIENT_SECRET !== 'string') {
    throwNewError('no client secret found');
  }

  const options: RefreshAuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: process.env.ADMIN_CLIENT_ID,
      clientSecret: process.env.ADMIN_CLIENT_SECRET,
    },
    refreshToken: refreshToken,
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
    /* .withLoggerMiddleware() */
    .build();
  return ctpClient;
}

export const refreshTokenSession = async (token: string): Promise<void> => {
  const apiRoot = createApiBuilderFromCtpClient(
    refreshUserCTPClient(token),
    'https://auth.us-central1.gcp.commercetools.com/'
  ).withProjectKey({
    projectKey: PROJECT_KEY,
  });
};
