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
import { parseDateToWeb } from '../../utils/parseDate';
import { AddressDraft } from '@commercetools/platform-sdk';
import TrashIcon from '../../../public/assets/icons/trash.svg';
import AddressModal from '../../components/AddressModal/AddressModal';
import { updatePassword } from '../../api/changePassword';

export interface IPersonalData {
  [key: string]: string | undefined;
}

interface IAddressesData {
  shippingAddressIds: string[] | undefined;
  billingAddressIds: string[] | undefined;
  defaultBillingAddressId: string | undefined;
  defaultShippingAddressId: string | undefined;
}

export interface IAddressesCardData {
  addressInfo: AddressDraft;
  statusAddress: {
    [key: string]: boolean;
  };
}

interface IAddressesClickedData {
  [key: string]: boolean;
}

function ProfilePage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [version, setVersion] = useState(1);
  const [bio, setBio] = useState<IPersonalData | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState<string | undefined>('');
  const [clickedBioUpdate, setClickedBioUpdate] = useState(false);
  const [clickedEmailUpdate, setClickedEmailUpdate] = useState(false);
  const [clickedPasswordUpdate, setClickedPasswordUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [clickedAddressesUpdate, setClickedAddressesUpdate] = useState(false);
  const [addressCardData, setAddressCardData] =
    useState<IAddressesCardData | null>(null);
  const [addressStore, setAddressStore] = useState<AddressDraft[] | []>([]);
  const [addresses, setAddresses] = useState<IAddressesData | null>(null);

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
            response.body.version && setVersion(response.body.version);
            setBio({
              firstname: response.body.firstName,
              lastname: response.body.lastName,
              birthday: response.body.dateOfBirth
                ? parseDateToWeb(response.body.dateOfBirth)
                : '',
            });
            setEmail(response.body.email);
            setPassword(response.body.password);
            setAddresses({
              shippingAddressIds: response.body.shippingAddressIds,
              billingAddressIds: response.body.billingAddressIds,
              defaultBillingAddressId: response.body.defaultBillingAddressId,
              defaultShippingAddressId: response.body.defaultShippingAddressId,
            });
            setAddressStore(response.body.addresses);
          });
        })
        .catch(() => {
          checkRefreshToken();
          localStorage.removeItem('refreshToken');
        });
    }
  }, [customerId, dispatch, navigate, refreshToken]);
  dispatch(createCustomerId(localId));

  const addressCard = addressStore.map((address, i) => {
    return (
      <div key={i} className={`${style.profile_address_card} card_${i}}`}>
        <div className={style.profile_address_top}>
          <span className={style.profile_address_type}>
            {addresses?.shippingAddressIds?.includes(address.id as string)
              ? 'Shipping address'
              : addresses?.billingAddressIds?.includes(address.id as string)
              ? 'Billing address'
              : addresses?.billingAddressIds?.includes(address.id as string) &&
                addresses?.shippingAddressIds?.includes(address.id as string)
              ? 'Shipping and Billing address'
              : ''}
          </span>
          <h3
            className={style.profile_address_name}
          >{`${bio?.firstname} ${bio?.lastname}`}</h3>
          <div className={style.profile_address_fields}>
            <p className={style.profile_address_item}>
              <b>Street:</b> {address?.streetName}
            </p>
            <p className={style.profile_address_item}>
              <b>Building:</b> {address?.building}
            </p>
            {address?.apartment && (
              <p className={style.profile_address_item}>
                <b>Apartment:</b> {address?.apartment}
              </p>
            )}
            <p className={style.profile_address_item}>
              <b>City:</b> {address?.city}
            </p>
            <p className={style.profile_address_item}>
              <b>Postal:</b> {address?.postalCode}
            </p>
            <p className={style.profile_address_item}>
              <b>Country:</b> {address?.country}
            </p>
          </div>
          {addresses?.defaultShippingAddressId === (address.id as string) ||
            (addresses?.defaultBillingAddressId === (address.id as string) && (
              <div className={style.profile_address_default}>
                <p
                  className={
                    addresses?.defaultShippingAddressId ===
                    (address.id as string)
                      ? `${style.profile_address_default_ship} ${style.visible}`
                      : `${style.profile_address_default_ship} ${style.hidden}`
                  }
                >
                  Default shipping address
                </p>
                <p
                  className={
                    addresses?.defaultBillingAddressId ===
                    (address.id as string)
                      ? `${style.profile_address_default_bill} ${style.visible}`
                      : `${style.profile_address_default_bill} ${style.hidden}`
                  }
                >
                  Default billing address
                </p>
              </div>
            ))}
        </div>
        <div className={style.profile_address_bottom}>
          <ButtonForm classNames={style.profile_address_delete}>
            <img src={TrashIcon} alt="Delete address" />
          </ButtonForm>
          <ButtonForm
            onClick={(): void => {
              setAddressCardData({
                addressInfo: address,
                statusAddress: {
                  shippingAddressIds: addresses?.shippingAddressIds?.includes(
                    address.id as string
                  )
                    ? true
                    : false,
                  billingAddressIds: addresses?.billingAddressIds?.includes(
                    address.id as string
                  )
                    ? true
                    : false,
                  defaultBillingAddressId:
                    addresses?.defaultBillingAddressId ===
                    (address.id as string)
                      ? true
                      : false,
                  defaultShippingAddressId:
                    addresses?.defaultShippingAddressId ===
                    (address.id as string)
                      ? true
                      : false,
                },
              });
              setClickedAddressesUpdate(true);
              setShowModal(true);
            }}
            classNames={`${style.profile_update} ${style.profile_address_update}`}
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
    );
  });
  // const data = {
  //   version: version,
  //   currentPassword: 'fshHJKL2365',
  //   newPassword: '2327Ybv!1',
  // };
  // const customerAddressesAllInfo = {
  //   addressInfo: addressCardData,
  //   statusAddress: addresses,
  // };
  // console.log(customerAddressesAllInfo, 456);
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
                        {bio ? bio.firstname : ''}
                      </p>
                    </li>
                    <li className={style.profile_personal_item}>
                      <h4 className={style.profile_personal_title}>Lastname</h4>
                      <p className={style.profile_personal_describe}>
                        {bio ? bio.lastname : ''}
                      </p>
                    </li>
                    <li className={style.profile_personal_item}>
                      <h4 className={style.profile_personal_title}>
                        Date of birth
                      </h4>
                      <p className={style.profile_personal_describe}>
                        {bio ? bio.birthday : ''}
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
            <div className={style.profile_address_card_add}>
              <button
                onClick={(): void => {
                  setClickedAddressesUpdate(true);
                  setShowModal(true);
                }}
                className={style.profile_address_add}
              >
                <img
                  className={style.profile_address_add_img}
                  src={PlusIcon}
                  alt="Add address"
                />
                <p className={style.profile_address_add_title}>
                  Add new address
                </p>
              </button>
            </div>
            {addressCard}
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
          firstnameField={bio?.firstname ?? ''}
          lastnameField={bio?.lastname ?? ''}
          birthdayField={bio?.birthday ?? ''}
          onClick={(): void => {
            setClickedBioUpdate(false);
            setShowModal(false);
          }}
          setPersonal={setBio}
          modalClass={clickedBioUpdate ? style.visible : style.hidden}
          setClickedBioUpdate={setClickedBioUpdate}
          setShowModal={setShowModal}
        />
        <EmailModal
          version={version}
          emailField={email}
          onClick={(): void => {
            setClickedEmailUpdate(false);
            setShowModal(false);
          }}
          setPersonal={setEmail}
          token={refreshToken ? refreshToken : ''}
          setClickedEmailUpdate={setClickedEmailUpdate}
          setShowModal={setShowModal}
          modalClass={clickedEmailUpdate ? style.visible : style.hidden}
        />
        <PasswordModal
          version={version}
          onClick={(): void => {
            setClickedPasswordUpdate(false);
            setShowModal(false);
          }}
          setClickedPasswordUpdate={setClickedPasswordUpdate}
          setShowModal={setShowModal}
          token={refreshToken ? refreshToken : ''}
          modalClass={clickedPasswordUpdate ? style.visible : style.hidden}
        />
        <AddressModal
          onClick={(): void => {
            setShowModal(false);
            setClickedAddressesUpdate(false);
          }}
          version={version}
          modalClass={clickedAddressesUpdate ? style.visible : style.hidden}
          addressData={addressCardData}
        />
      </div>
    </div>
  );
}
export default ProfilePage;

/*   "email": "ianatestAPI@example.com",
  "firstName": "Лфенф",
  "lastName": "ывапаувас",
  "password": "23272327Ybv" 
  */

// "email": 'hi@ya.ru';
// "password": "2327Ybv!"

// "yanatestprofile@mail.com"
// "2327Ybv!"
