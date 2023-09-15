import { ctpClient } from './clientBuilder';
import {
  ClientResponse,
  Project,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

import { PROJECT_KEY } from '../constants';

export const apiRoot = createApiBuilderFromCtpClient(
  ctpClient,
  'https://auth.us-central1.gcp.commercetools.com/'
).withProjectKey({
  projectKey: PROJECT_KEY,
});

export const getProject = async (): Promise<ClientResponse<Project>> => {
  const api = await apiRoot.get().execute();
  return api;
};
