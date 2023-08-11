import {
  CategoryPagedQueryResponse,
  ClientResponse,
} from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';
import { useDispatch } from 'react-redux';
import { createCategory } from '../store/reducers/categoryReducer';

export async function GetCategories(): Promise<
  ClientResponse<CategoryPagedQueryResponse>
> {
  try {
    const categories = await apiRoot.categories().get().execute();
    const categorisArray = categories.body.results;
    const categoryNamesArray = categorisArray.map((category) => category.name);
    // console.log(categoryNamesArray);
    const categoryNameKey = 'en-US';
    const categoryNameArray = categoryNamesArray.map(
      (catName) => catName[categoryNameKey]
    );
    console.log(categoryNameArray);
    const dispatch = useDispatch();
    dispatch(createCategory(categoryNameArray));
    return categories;
  } catch {
    throw new Error('no categories found');
  }
}
