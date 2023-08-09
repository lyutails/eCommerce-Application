import { tokenCustomer } from '../../src/api/clientBuilder';
import { tokenAdmin } from '../../src/api/adminBuilder';
import {
  apiRoot,
  createCustomer,
  createCustomerTwo,
  getAllCustomers,
  getAllProducts,
} from '../api/createClient';
// import { apiRoot } from '../../src/api/createClientAdmin';
import style from './_app.module.scss';
import AuthPage from '../pages/Auth/Auth';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
// import { useDispatch, useSelector } from 'react-redux';
// import { setImage } from '../store/counterSlice';

function App(): JSX.Element {
  return (
    <div>
      <Header />
      <AuthPage />
      <Footer />
    </div>
  );
}
export default App;
// console.log(apiRoot.products().get());
// console.log(getAllProducts);
// const dispatch = useDispatch();
// const url = getAllProducts(dispatch(setImage));
// const image = useSelector((state) => state);
// console.log(
//   url.then((response) => {
//     return response.body.results[0].masterData.current.variants[0].images;
//   })
// );
// url?.length ? console.log(url[0].url) : console.log('error');
// console.log(getAllCustomers());
// console.log(apiRoot.productProjections().get());
// console.log(apiRoot.customers().get());
// console.log(apiRoot.categories().get());
// console.log(tokenAdmin);
// console.log(tokenCustomer);

// <div>
//   <h1 className={style.title}>Hello!</h1>
//   <div className="pics">
//     <div className="pic"></div>
//   </div>
// </div>
