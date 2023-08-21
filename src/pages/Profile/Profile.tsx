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
  const customerId = useSelector((state: IRootState) => state.user.customerId);
  const localId = localStorage.getItem('customerId');
  const refreshToken = localStorage.getItem('refreshToken');

  const handleLogOut = (): void => {
    localStorage.removeItem('customerId');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('isAuth');
    dispatch(setAuthStatus(false));
    navigate('/');
  };

  useEffect(() => {
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
  }, [customerId, dispatch, navigate, refreshToken]);
  dispatch(createCustomerId(localId));

  return (
    <div className={style.profile} data-testid="profile-component">
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

/*   "email": "ianatestAPI@example.com",
  "firstName": "Лфенф",
  "lastName": "ывапаувас",
  "password": "fshHJKL2365" */
