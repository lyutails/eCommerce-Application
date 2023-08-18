import { useQuery } from '@apollo/client/react';
import { GRAPHQL_TARGETS } from '../../node_modules/@commercetools-frontend/constants';
import FetchCategoriesQuery from './fetch-categories.ctp.graphql';
import style from '../pages/Main/_main.module.scss';

export const Categories = (): JSX.Element => {
  const { data } = useQuery(FetchCategoriesQuery, {
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });
  // console.log(data, 'lalala');
  return (
    <div className={style.main_categories}>
      {data.map((category: string) => {
        return (
          <div className={style.main_category} key={category}>
            {category}
          </div>
        );
      })}
    </div>
  );
};
// console.log('lalala');
