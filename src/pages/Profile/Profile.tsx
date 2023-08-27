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
import ButtonForm from '../../components/shared/ButtonForm/Button';
import UpdateIcon from '../../../public/assets/icons/update.svg';
import PasswordModal from '../../components/PasswordModal/PasswordModal';
import EmailModal from '../../components/EmailModal/EmailModal';
import BioModal from '../../components/BioModal/BioModal';

function ProfilePage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [version, setVersion] = useState(1);
  const [clickedPersonal, setClickedPersonal] = useState(true);
  const [clickedAddress, setClickedAddress] = useState(false);
  const [clickedBioUpdate, setClickedBioUpdate] = useState(false);
  const [clickedEmailUpdate, setClickedEmailUpdate] = useState(false);
  const [clickedPasswordUpdate, setClickedPasswordUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
        .then((response) => {
          getCustomerById({ ID: customerId }).then((response) => {
            response.body.firstName && setFirstname(response.body.firstName);
            response.body.lastName && setLastname(response.body.lastName);
            response.body.dateOfBirth && setBirthday(response.body.dateOfBirth);
            response.body.email && setEmail(response.body.email);
            response.body.password && setPassword(response.body.password);
            response.body.version && setVersion(response.body.version);
          });
        })
        .catch(() => {
          checkRefreshToken();
          localStorage.removeItem('refreshToken');
        });
    }
  }, [customerId, dispatch, navigate, refreshToken]);
  dispatch(createCustomerId(localId));

  return (
    <div className={style.profile} data-testid="profile-component">
      <div className={style.profile_top}>
        <div className={style.profile_menu}>
          <ButtonForm
            onClick={(): void => {
              setClickedPersonal(true);
              setClickedAddress(false);
            }}
            classNames={style.profile_button}
          >
            Personal information
          </ButtonForm>
          <ButtonForm
            onClick={(): void => {
              setClickedPersonal(false);
              setClickedAddress(true);
            }}
            classNames={style.profile_button}
          >
            Addresses
          </ButtonForm>
        </div>
        <div className={style.profile_info}>
          <div
            className={
              clickedPersonal
                ? `${style.profile_personal} ${style.visible}`
                : `${style.profile_personal} ${style.hidden}`
            }
          >
            <h2 className={style.profile_title}>Personal information</h2>
            <p className={style.profile_describe}>
              Here you can view and edit your details
            </p>
            <div className={style.profile_personal_info}>
              <div className={style.profile_personal_bio}>
                <div className={style.profile_personal_text}>
                  <ul className={style.profile_personal_list}>
                    <li className={style.profile_personal_item}>
                      <h4 className={style.profile_personal_title}>
                        Firstname
                      </h4>
                      <p className={style.profile_personal_describe}>
                        {firstname}
                      </p>
                    </li>
                    <li className={style.profile_personal_item}>
                      <h4 className={style.profile_personal_title}>Lastname</h4>
                      <p className={style.profile_personal_describe}>
                        {lastname}
                      </p>
                    </li>
                    <li className={style.profile_personal_item}>
                      <h4 className={style.profile_personal_title}>
                        Date of birth
                      </h4>
                      <p className={style.profile_personal_describe}>
                        {birthday}
                      </p>
                    </li>
                  </ul>
                </div>
                <ButtonForm
                  onClick={(): void => {
                    setClickedBioUpdate(true);
                    setShowModal(true);
                  }}
                  classNames={style.profile_update}
                >
                  <img
                    className={style.profile_update_img}
                    src={UpdateIcon}
                    alt="Pencil update"
                  />
                  Update
                </ButtonForm>
              </div>
              <div className={style.profile_personal_mail}>
                <div className={style.profile_personal_text}>
                  <h4 className={style.profile_personal_title}>Your E-mail</h4>
                  <p className={style.profile_personal_describe}>{email}</p>
                </div>
                <ButtonForm
                  onClick={(): void => {
                    setClickedEmailUpdate(true);
                    setShowModal(true);
                  }}
                  classNames={style.profile_update}
                >
                  <img
                    className={style.profile_update_img}
                    src={UpdateIcon}
                    alt="Pencil update"
                  />
                  Update
                </ButtonForm>
              </div>
              <div className={style.profile_personal_password}>
                <div className={style.profile_personal_text}>
                  <h4 className={style.profile_personal_title}>
                    Your password
                  </h4>
                  <p className={style.profile_personal_describe}>{password}</p>
                </div>
                <ButtonForm
                  onClick={(): void => {
                    setClickedPasswordUpdate(true);
                    setShowModal(true);
                  }}
                  classNames={style.profile_update}
                >
                  <img
                    className={style.profile_update_img}
                    src={UpdateIcon}
                    alt="Pencil update"
                  />
                  Update
                </ButtonForm>
              </div>
            </div>
          </div>
          <div
            className={
              clickedAddress
                ? `${style.profile_address} ${style.visible}`
                : `${style.profile_address} ${style.hidden}`
            }
          >
            addresses
          </div>
        </div>
      </div>
      <div className={style.profile_bottom}>
        <ButtonForm classNames={style.profile_logout} onClick={handleLogOut}>
          log out
        </ButtonForm>
      </div>
      <div
        className={
          showModal
            ? `${style.profile_modal} ${style.visible}`
            : `${style.profile_modal} ${style.hidden}`
        }
      >
        <BioModal
          token={refreshToken ? refreshToken : ''}
          version={version}
          firstnameField={firstname}
          lastnameField={lastname}
          birthdayField={birthday}
          onClick={(): void => {
            setClickedBioUpdate(false);
            setShowModal(false);
          }}
          modalClass={clickedBioUpdate ? style.visible : style.hidden}
        />
        <EmailModal
          emailField={email}
          onClick={(): void => {
            setClickedEmailUpdate(false);
            setShowModal(false);
          }}
          modalClass={clickedEmailUpdate ? style.visible : style.hidden}
        />
        <PasswordModal
          onClick={(): void => {
            setClickedPasswordUpdate(false);
            setShowModal(false);
          }}
          modalClass={clickedPasswordUpdate ? style.visible : style.hidden}
        />
      </div>
    </div>
  );
}
export default ProfilePage;

/*   "email": "ianatestAPI@example.com",
  "firstName": "Лфенф",
  "lastName": "ывапаувас",
  "password": "fshHJKL2365" */

// "email": 'hi@ya.ru';
// "password": "2327Ybv!"
