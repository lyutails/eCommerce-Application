import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthStatus } from '../../store/reducers/userReducer';
import style from '../Profile/_profile.module.scss';

function ProfilePage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handelLogOut = (): void => {
    localStorage.setItem('isAuth', 'false');
    dispatch(setAuthStatus(false));
    navigate('/');
  };
  const LastName = 'Лфенф';
  return (
    <div className={style.profile}>
      <h2 className={style.title}>Hello,{LastName}</h2>
      <button className={style.profile_button} onClick={handelLogOut}>
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
