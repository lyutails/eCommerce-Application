import { apiRoot } from './createClient';
import { useDispatch } from 'react-redux';
import { createCategory } from '../store/reducers/categoryReducer';

export async function GetCategories(): Promise<string[]> {
  try {
    const categories = await apiRoot.categories().get().execute();
    const categorisArray = categories.body.results;
    const categoryNamesArray = categorisArray.map((category) => category.name);
    const categoryNameKey = 'en-US';
    const categoryNameArray = categoryNamesArray.map(
      (catName) => catName[categoryNameKey]
    );
    console.log(categoryNameArray);
    const dispatch = useDispatch();
    dispatch(createCategory(categoryNameArray));
    return categoryNameArray;
  } catch {
    throw new Error('no categories found');
  }
}
