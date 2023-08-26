import {
  Category,
  CategoryPagedQueryResponse,
  ClientResponse,
} from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';

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
    throw new Error('no categories found');
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

    // console.log(category);

    return category;
  } catch {
    throw new Error('no categories found');
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
          expand: ['ancestors'],
        },
      })
      .execute();

    return categoriesAncestors;
  } catch {
    throw new Error('no categories found');
  }
}

// const returnProductsByCategoryKey = (productKey: string) => {
//   return apiRoot
//     .categories()
//     .withKey({ key: productKey })
//     .get()
//     .execute();
// };
