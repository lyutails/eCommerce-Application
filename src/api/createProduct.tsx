import { PROJECT_KEY } from '../constants';
import { throwNewError } from '../utils/throwNewError';
import {
  ClientResponse,
  createApiBuilderFromCtpClient,
  Product,
  ProductDraft,
} from '@commercetools/platform-sdk';
import {
  AuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

export const productData: ProductDraft = {
  productType: {
    typeId: 'product-type',
    id: '24f510c3-f334-4099-94e2-d6224a8eb919',
  },
  categories: [
    {
      typeId: 'category',
      id: 'c25d082f-09b6-4f4a-a844-84c52b9c7044',
    },
  ],
  name: {
    // here we put name
    en: 'Product Test',
  },
  slug: {
    // here we put some slug
    'en-US': 'Product Test',
  },
  masterVariant: {
    // here we put sku
    sku: 'SKU-1',
    prices: [
      {
        value: {
          currencyCode: 'USD',
          // here we put price
          centAmount: 4200,
        },
      },
    ],
    images: [
      {
        // image
        url: 'https://images.unsplash.com/photo-1604725333736-1f962a6218d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2004&q=80',
        label: 'Product Image',
        dimensions: {
          w: 1000,
          h: 1000,
        },
      },
    ],
  },
  variants: [
    {
      images: [
        {
          //image
          url: 'https://i0.wp.com/picjumbo.com/wp-content/uploads/man-looking-into-the-distance-on-top-of-the-mountain-free-photo.jpg?w=2210&quality=70',
          label: 'Variant Image',
          dimensions: {
            w: 1000,
            h: 1000,
          },
        },
      ],
    },
  ],
};

if (typeof process.env.ADMIN_CLIENT_ID !== 'string') {
  throwNewError('no admin client id found');
}

if (typeof process.env.ADMIN_CLIENT_SECRET !== 'string') {
  throwNewError('no admin client secret found');
}

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.us-central1.gcp.commercetools.com',
  projectKey: PROJECT_KEY,
  credentials: {
    clientId: process.env.ADMIN_CLIENT_ID,
    clientSecret: process.env.ADMIN_CLIENT_SECRET,
  },
  scopes: ['manage_project:tycteam manage_api_clients:tycteam'],
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://auth.us-central1.gcp.commercetools.com',
  fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  //.withLoggerMiddleware() // Include middleware for logging
  .build();

export const createCustomeProduct = async (
  data: ProductDraft
): Promise<ClientResponse<Product> | undefined> => {
  const apiRoot = await createApiBuilderFromCtpClient(
    ctpClient,
    'https://auth.us-central1.gcp.commercetools.com'
  ).withProjectKey({
    projectKey: PROJECT_KEY,
  });
  try {
    const product = apiRoot
      .products()
      .post({
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .execute();
    return product;
  } catch (error) {
    console.error(error);
  }
};
