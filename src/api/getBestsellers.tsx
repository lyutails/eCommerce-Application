// import {
//   ClientResponse,
//   ProductProjectionPagedSearchResponse,
//   ProductType,
// } from '@commercetools/platform-sdk';
// import { apiRoot } from './createClient';
// import { apiRoot as apiRootAdmin } from './createClientAdmin';
// import { throwNewError } from '../utils/throwNewError';

// export async function getBestsellers(): Promise<
//   ClientResponse<ProductProjectionPagedSearchResponse>
// > {
//   try {
//     const allProductsArray = await apiRoot
//       .productProjections()
//       .search()
//       .get()
//       .execute()
//       .then((response) => response.body.results);
//     const bestseller = allProductsArray.map((data) => {
//       console.log(data);
//     });
//     // return bestsellers;
//   } catch {
//     throwNewError('no bestsellers found');
//   }
// }
