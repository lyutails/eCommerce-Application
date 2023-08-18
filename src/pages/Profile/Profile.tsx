import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  createCustomerId,
  setAuthStatus,
} from '../../store/reducers/userReducer';
import style from '../Profile/_profile.module.scss';
import { IRootState } from '../../types/interfaces';
import { getCustomerById } from '../../api/getCustomer';
import { useEffect, useState } from 'react';
import { refreshTokenFlow } from '../../api/adminBuilder';

function ProfilePage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');

  const localId = localStorage.getItem('customerId');
  const refreshToken = localStorage.getItem('refreshToken');
  const checkRefreshToken = (): void => {
    dispatch(setAuthStatus(false));
    navigate('/login');
    localStorage.removeItem('customerId');
    localStorage.removeItem('isAuth');
  };

  if (!refreshToken) {
    checkRefreshToken();
  } else {
    refreshTokenFlow(refreshToken)
      .then(() =>
        getCustomerById({ ID: customerId }).then((response) => {
          response.body.firstName && setFirstname(response.body.firstName);
          response.body.lastName && setLastname(response.body.lastName);
        })
      )
      .catch(() => {
        checkRefreshToken();
        localStorage.removeItem('refreshToken');
      });
  }
  dispatch(createCustomerId(localId));
  const customerId = useSelector((state: IRootState) => state.user.customerId);

  const handleLogOut = (): void => {
    localStorage.setItem('isAuth', 'false');
    dispatch(setAuthStatus(false));
    navigate('/');
  };

  return (
    <div className={style.profile}>
      <h2 className={style.title}>
        Hello, {firstname} {lastname}
      </h2>
      <button className={style.profile_button} onClick={handleLogOut}>
        log out
      </button>
    </div>
  );
}
export default ProfilePage;

//   "email": "ianatestAPI@example.com",
//   "firstName": "Лфенф",
//   "lastName": "ывапаувас",
//   "password": "fshHJKL2365"
