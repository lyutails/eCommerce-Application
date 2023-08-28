import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  createCustomerId,
  setAuthStatus,
} from '../../store/reducers/userReducer';
import style from '../Profile/_profile.module.scss';
import { IPersonalState, IRootState } from '../../types/interfaces';
import { getCustomerById } from '../../api/getCustomer';
import { useEffect, useState } from 'react';
import { refreshTokenFlow } from '../../api/adminBuilder';
import ButtonForm from '../../components/shared/ButtonForm/Button';
import UpdateIcon from '../../../public/assets/icons/update.svg';
import PasswordModal from '../../components/PasswordModal/PasswordModal';
import EmailModal from '../../components/EmailModal/EmailModal';
import BioModal from '../../components/BioModal/BioModal';
import PlusIcon from '../../../public/assets/icons/addplus.svg';
import {
  changeStatusAddress,
  changeStatusPersonal,
} from '../../store/reducers/personalReducer';
import { parseDate } from '../../utils/parseDate';
import { AddressDraft } from '@commercetools/platform-sdk';

interface IPersonalData {
  [key: string]: string | undefined;
}

function ProfilePage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [version, setVersion] = useState(1);
  const [addressShip, setAddressShip] = useState<AddressDraft | null>(null);
  const [addressBill, setAddressBill] = useState<AddressDraft | null>(null);
  const [personal, setPersonal] = useState<IPersonalData | null>(null);
  const [clickedBioUpdate, setClickedBioUpdate] = useState(false);
  const [clickedEmailUpdate, setClickedEmailUpdate] = useState(false);
  const [clickedPasswordUpdate, setClickedPasswordUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const clickedPersonal = useSelector(
    (state: IPersonalState) => state.personal.information
  );
  const clickedAddress = useSelector(
    (state: IPersonalState) => state.personal.addresses
  );
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
        .then(() => {
          getCustomerById({ ID: customerId }).then((response) => {
            setPersonal({
              firstname: response.body.firstName,
              lastname: response.body.lastName,
              birthday: response.body.dateOfBirth
                ? parseDate(response.body.dateOfBirth)
                : '',
              email: response.body.email,
              password: response.body.password,
            });
            // response.body.firstName && setFirstname(response.body.firstName);
            // response.body.lastName && setLastname(response.body.lastName);
            // response.body.dateOfBirth &&
            //   setBirthday(parseDate(response.body.dateOfBirth));
            // response.body.email && setEmail(response.body.email);
            // response.body.password && setPassword(response.body.password);
            response.body.version && setVersion(response.body.version);
            setAddressShip(response.body.addresses[0]);
            if (response.body.addresses[1]) {
              setAddressBill(response.body.addresses[1]);
            }
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
              localStorage.setItem('clickedPersonal', 'true');
              localStorage.setItem('clickedAddress', 'false');
              dispatch(changeStatusPersonal(true));
              dispatch(changeStatusAddress(false));
              // setClickedPersonal(true);
              // setClickedAddress(false);
            }}
            classNames={style.profile_button}
          >
            Personal information
          </ButtonForm>
          <ButtonForm
            onClick={(): void => {
              localStorage.setItem('clickedAddress', 'true');
              localStorage.setItem('clickedPersonal', 'false');
              dispatch(changeStatusPersonal(false));
              dispatch(changeStatusAddress(true));
              // setClickedPersonal(false);
              // setClickedAddress(true);
            }}
            classNames={style.profile_button}
          >
            Addresses
          </ButtonForm>
        </div>
        <div className={style.profile_info}>
          <div className={style.profile_info_top}>
            <div className={style.profile_info_title}>
              <h2 className={style.profile_title}>
                {clickedPersonal ? 'Personal information' : 'Addresses'}
              </h2>
              <p className={style.profile_describe}>
                Here you can view and edit your details
              </p>
            </div>
            <div className={style.profile_bottom}>
              <ButtonForm
                classNames={style.profile_logout}
                onClick={handleLogOut}
              >
                log out
              </ButtonForm>
            </div>
          </div>
          <div
            className={
              clickedPersonal
                ? `${style.profile_personal} ${style.visible}`
                : `${style.profile_personal} ${style.hidden}`
            }
          >
            <div className={style.profile_personal_info}>
              <div className={style.profile_personal_bio}>
                <div className={style.profile_personal_text}>
                  <ul className={style.profile_personal_list}>
                    <li className={style.profile_personal_item}>
                      <h4 className={style.profile_personal_title}>
                        Firstname
                      </h4>
                      <p className={style.profile_personal_describe}>
                        {personal ? personal.firstname : ''}
                      </p>
                    </li>
                    <li className={style.profile_personal_item}>
                      <h4 className={style.profile_personal_title}>Lastname</h4>
                      <p className={style.profile_personal_describe}>
                        {personal ? personal.lastname : ''}
                      </p>
                    </li>
                    <li className={style.profile_personal_item}>
                      <h4 className={style.profile_personal_title}>
                        Date of birth
                      </h4>
                      <p className={style.profile_personal_describe}>
                        {personal ? personal.birthday : ''}
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
                  <p className={style.profile_personal_describe}>
                    {personal ? personal.email : ''}
                  </p>
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
                  <p className={style.profile_personal_describe}>
                    {personal ? personal.password : ''}
                  </p>
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
            <div className={style.profile_address_card}>
              <div className={style.profile_address_add}>
                <img
                  className={style.profile_address_add_img}
                  src={PlusIcon}
                  alt="Add address"
                />
                <p className={style.profile_address_add_title}>
                  Add new address
                </p>
              </div>
            </div>
            <div className={style.profile_address_card}>
              <div className={style.profile_address_add}>
                <span>Shipping address</span>
                <p>
                  <b>Street:</b> {addressShip?.streetName}
                </p>
                <p>
                  <b>Building:</b> {addressShip?.building}
                </p>
                {addressShip?.apartment && (
                  <p>
                    <b>Apartment:</b> {addressShip?.apartment}
                  </p>
                )}

                <p>
                  <b>City:</b> {addressShip?.city}
                </p>
                <p>
                  <b>Postal:</b> {addressShip?.postalCode}
                </p>
                <p>
                  <b>Country:</b> {addressShip?.country}
                </p>
              </div>
            </div>
            {addressBill && (
              <div className={style.profile_address_card}>
                <div className={style.profile_address_add}>
                  <span>Shipping address</span>
                  <p>
                    <b>Street:</b> {addressBill?.streetName}
                  </p>
                  <p>
                    <b>Building:</b> {addressBill?.building}
                  </p>
                  {addressBill?.apartment && (
                    <p>
                      <b>Apartment:</b> {addressBill?.apartment}
                    </p>
                  )}
                  <p>
                    <b>City:</b> {addressBill?.city}
                  </p>
                  <p>
                    <b>Postal:</b> {addressBill?.postalCode}
                  </p>
                  addressBill
                  <p>
                    <b>Country:</b> {addressBill?.country}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
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
          firstnameField={personal?.firstname ?? ''}
          lastnameField={personal?.lastname ?? ''}
          birthdayField={personal?.birthday ?? ''}
          onClick={(): void => {
            setClickedBioUpdate(false);
            setShowModal(false);
          }}
          modalClass={clickedBioUpdate ? style.visible : style.hidden}
        />
        <EmailModal
          emailField={personal?.email ?? ''}
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

// "yanatestprofile@mail.com"
// "2327Ybv!"
