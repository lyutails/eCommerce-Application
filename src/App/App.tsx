// import { tokenCustomer } from '../../src/api/clientBuilder';
// import { tokenAdmin } from '../../src/api/adminBuilder';
// import { apiRoot } from '../../src/api/createClientAdmin';
import { checkEmail } from '../pages/Auth/verify';
// import { getCategories } from '../api/createClient';
import style from './_app.module.scss';
import AuthPage from '../pages/Auth/Auth';
import RegistrationPage from '../pages/Registration/Registration';
// import Input from '../components/Input/Input';
// import { email, password } from '../components/Input/input-data';
// import { useDispatch, useSelector } from 'react-redux';
// import { setImage } from '../store/counterSlice';
import { Link, useNavigate } from 'react-router-dom';
import React, { ChangeEvent, MouseEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';

function App(): JSX.Element {
  return (
    <div>
      <AuthPage />
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
