import {
  Category,
  CategoryPagedQueryResponse,
  ClientResponse,
  ProductProjectionPagedQueryResponse,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';
import { throwNewError } from '../utils/throwNewError';

export async function GetCategories(): Promise<string[]> {
  try {
    const categories = await apiRoot.categories().get().execute();
    const categorisArray = categories.body.results;
    const categoryNamesArray = categorisArray.map((category) => category.name);
    const categoryNameKey = 'en-US';
    const categoryNameArray = categoryNamesArray.map(
      (catName) => catName[categoryNameKey]
    );
    return categoryNameArray;
  } catch {
    throwNewError('no categories found');
  }
}

export async function GetCategory(): Promise<ClientResponse<Category>> {
  try {
    const category = await apiRoot
      .categories()
      .withId({
        ID: '877113a4-f6f2-40df-acee-02bdf03f9977',
      })
      .get()
      .execute();

    return category;
  } catch {
    throwNewError('no category found');
  }
}

export async function GetParentCategory(): Promise<
  ClientResponse<CategoryPagedQueryResponse>
> {
  try {
    const categoriesAncestors = await apiRoot
      .categories()
      .get({
        queryArgs: {
          expand: ['ancestors[0]'],
        },
      })
      .execute();
    return categoriesAncestors;
  } catch {
    throwNewError('no category parent found');
  }
}

export async function returnProductsByCategoryKey(
  category: string
): Promise<Promise<ClientResponse<Category>>> {
  try {
    const byCategoryKey = apiRoot
      .categories()
      .withKey({ key: `${category}` })
      .get()
      .execute();
    return byCategoryKey;
  } catch {
    throwNewError('no products in category found');
  }
}

export async function getSubCategory(): Promise<
  ClientResponse<ProductProjectionPagedQueryResponse>
> {
  try {
    const subcategory = apiRoot
      .productProjections()
      .get({
        queryArgs: {
          where: `categories(id="${'877113a4-f6f2-40df-acee-02bdf03f9977'}")`,
        },
      })
      .execute();
    return subcategory;
  } catch {
    throwNewError('no subcategories found');
  }
}

export async function getSubtreeCategory(
  categoryId: string
): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
  try {
    const subtree = apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: `categories.id: subtree("${categoryId}")`,
        },
      })
      .execute();
    return subtree;
  } catch {
    throwNewError('no subtrees found');
  }
}
