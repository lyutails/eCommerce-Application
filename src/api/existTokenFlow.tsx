import { PROJECT_KEY } from '../constants';
import {
  Cart,
  ClientResponse,
  createApiBuilderFromCtpClient,
  MyCartUpdate,
} from '@commercetools/platform-sdk';
import {
  Client,
  ClientBuilder,
  ExistingTokenMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { httpMiddlewareOptions } from './clientBuilder';

const options: ExistingTokenMiddlewareOptions = {
  force: true,
};

// const clientAnonymous = new ClientBuilder()
//   .withExistingTokenFlow(authorization, options)
//   .withHttpMiddleware(httpMiddlewareOptions)
//   .build();

// CREATE ANON'S CART
export const createAnonCart = async (
  authorization: string
): Promise<ClientResponse<Cart> | undefined> => {
  try {
    const apiRoot = createApiBuilderFromCtpClient(
      new ClientBuilder()
        .withExistingTokenFlow(`Bearer ${authorization}`, options)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build(),
      'https://auth.us-central1.gcp.commercetools.com/'
    ).withProjectKey({
      projectKey: PROJECT_KEY,
    });
    const cart = await apiRoot
      .me()
      .carts()
      .post({
        body: {
          currency: 'USD',
        },
      })
      .execute();
    return cart;
  } catch (error) {
    console.log(error);
  }
};

// UPDATE ANON'S CART
export const updateAnonCart = async (
  id: string,
  data: MyCartUpdate,
  authorization: string
): Promise<ClientResponse<Cart> | undefined> => {
  const apiRoot = createApiBuilderFromCtpClient(
    new ClientBuilder()
      .withExistingTokenFlow(`Bearer ${authorization}`, options)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build(),
    'https://auth.us-central1.gcp.commercetools.com/'
  ).withProjectKey({
    projectKey: PROJECT_KEY,
  });
  try {
    const cart = await apiRoot
      .me()
      .carts()
      .withId({
        ID: id,
      })
      .post({
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .execute();
    console.log(cart);
    return cart;
  } catch (error) {
    console.log(error);
  }
};
