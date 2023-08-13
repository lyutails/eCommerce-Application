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
