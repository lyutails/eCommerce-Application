import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthStatus } from '../../store/reducers/userReducer';
import style from '../Profile/_profile.module.scss';
import {
  IPersonalState,
  IProfileState,
  IRootState,
} from '../../types/interfaces';
import { getCustomerById } from '../../api/getCustomer';
import { ReactNode, useCallback, useEffect, useState } from 'react';
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
import { AddressDraft, MyCustomerUpdate } from '@commercetools/platform-sdk';
import TrashIcon from '../../../public/assets/icons/trash.svg';
import AddressModal from '../../components/AddressModal/AddressModal';
import {
  changeAddress,
  changeBio,
  changeEmail,
  changeVersion,
} from '../../store/reducers/profileReducer';
import { updateCustomer } from '../../api/updateBio';
import { parseDateToWeb } from '../../utils/parseDate';

export interface IPersonalData {
  [key: string]: string | undefined;
}

export interface IAddressesCardData {
  addressInfo: AddressDraft;
  statusAddress: {
    [key: string]: boolean;
  };
}

function ProfilePage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [clickedBioUpdate, setClickedBioUpdate] = useState(false);
  const [clickedEmailUpdate, setClickedEmailUpdate] = useState(false);
  const [clickedPasswordUpdate, setClickedPasswordUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [clickedAddressesUpdate, setClickedAddressesUpdate] = useState(false);
  const { address, version, bio, email } = useSelector(
    (state: IProfileState) => state.profile
  );
  const [password, setPassword] = useState('');

  const clickedPersonal = useSelector(
    (state: IPersonalState) => state.personal.information
  );
  const clickedAddress = useSelector(
    (state: IPersonalState) => state.personal.addresses
  );

  const { customerId, customerRefreshToken } = useSelector(
    (state: IRootState) => state.user
  );

  const checkRefreshToken = useCallback((): void => {
    dispatch(setAuthStatus(false));
    navigate('/login');
    localStorage.removeItem('customerId');
    localStorage.removeItem('isAuth');
    dispatch(changeVersion(1));
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!customerRefreshToken) {
      checkRefreshToken();
    } else {
      refreshTokenFlow(customerRefreshToken)
        .then(() => {
          getCustomerById({ ID: customerId }).then((response) => {
            setPassword(response.body.password ? response.body.password : '');
            dispatch(changeVersion(response.body.version));
            dispatch(
              changeBio({
                firstname: {
                  value: response.body.firstName,
                },
                lastname: {
                  value: response.body.lastName,
                },
                birthday: {
                  value: parseDateToWeb(
                    response.body.dateOfBirth ? response.body.dateOfBirth : ''
                  ),
                },
              })
            );
            dispatch(changeEmail({ value: response.body.email }));
            dispatch(
              changeAddress({
                addressStore: response.body.addresses,
                defaultShippingId: response.body.defaultShippingAddressId,
                defaultBillingId: response.body.defaultBillingAddressId,
                shippingAddressesId: response.body.shippingAddressIds,
                billingAddressesId: response.body.billingAddressIds,
              })
            );
          });
        })
        .catch(() => {
          console.log('error');
          checkRefreshToken();
          localStorage.removeItem('refreshToken');
        });
    }
  }, [checkRefreshToken, customerId, dispatch, navigate, customerRefreshToken]);

  const handleLogOut = (): void => {
    localStorage.removeItem('customerId');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('isAuth');
    dispatch(setAuthStatus(false));
    dispatch(changeVersion(1));
    navigate('/');
  };
  const addressCard = address.addressStore.map((addressCard, i) => {
    const statusShipAddress = (): string => {
      let field = '';
      if (address.shippingAddressesId.includes(addressCard.id as string)) {
        field = 'Shipping address';
        if (address.billingAddressesId.includes(addressCard.id as string)) {
          field = 'Shipping and Billing address';
        }
      } else if (
        address.billingAddressesId.includes(addressCard.id as string)
      ) {
        field = 'Billing address';
        if (address.shippingAddressesId.includes(addressCard.id as string)) {
          field = 'Shipping and Billing address';
        }
      }
      return field;
    };
    const statusDefaultAddress = (): ReactNode => {
      if (
        address.defaultShippingId === (addressCard.id as string) ||
        address.defaultBillingId === (addressCard.id as string)
      ) {
        return (
          <div className={style.profile_address_default}>
            <p
              className={
                address.defaultShippingId === (addressCard.id as string)
                  ? `${style.profile_address_default_ship} ${style.visible}`
                  : `${style.profile_address_default_ship} ${style.hidden}`
              }
            >
              Default shipping address
            </p>
            <p
              className={
                address.defaultBillingId === (addressCard.id as string)
                  ? `${style.profile_address_default_bill} ${style.visible}`
                  : `${style.profile_address_default_bill} ${style.hidden}`
              }
            >
              Default billing address
            </p>
          </div>
        );
      }
    };

    const deleteAddressData = {
      version: version,
      actions: [
        {
          action: 'removeAddress',
          addressId: addressCard.id,
        },
      ],
    };
    return (
      <div key={i} className={`${style.profile_address_card} card_${i}}`}>
        <div className={style.profile_address_top}>
          <span className={style.profile_address_type}>
            {statusShipAddress()}
          </span>
          <h3
            className={style.profile_address_name}
          >{`${bio?.firstname.value} ${bio?.lastname.value}`}</h3>
          <div className={style.profile_address_fields}>
            <p className={style.profile_address_item}>
              <b>Street:</b> {addressCard?.streetName}
            </p>
            <p className={style.profile_address_item}>
              <b>Building:</b> {addressCard?.building}
            </p>
            {addressCard?.apartment && (
              <p className={style.profile_address_item}>
                <b>Apartment:</b> {addressCard?.apartment}
              </p>
            )}
            <p className={style.profile_address_item}>
              <b>City:</b> {addressCard?.city}
            </p>
            <p className={style.profile_address_item}>
              <b>Postal:</b> {addressCard?.postalCode}
            </p>
            <p className={style.profile_address_item}>
              <b>Country:</b> {addressCard?.country === 'US' ? 'USA' : 'Canada'}
            </p>
          </div>
          {statusDefaultAddress()}
        </div>
        <div className={style.profile_address_bottom}>
          <ButtonForm
            onClick={(): void => {
              updateCustomer(
                customerRefreshToken ? customerRefreshToken : '',
                deleteAddressData as MyCustomerUpdate
              ).then((response) => {
                if (response) {
                  dispatch(
                    changeAddress({
                      addressStore: response.body.addresses,
                      defaultShippingId: response.body.defaultShippingAddressId,
                      defaultBillingId: response.body.defaultBillingAddressId,
                      shippingAddressesId: response.body.shippingAddressIds,
                      billingAddressesId: response.body.billingAddressIds,
                    })
                  );
                  dispatch(changeVersion(response.body.version));
                }
              });
            }}
            classNames={style.profile_address_delete}
          >
            <img src={TrashIcon} alt="Delete address" />
          </ButtonForm>
          <ButtonForm
            onClick={(): void => {
              dispatch(
                changeAddress({
                  street: {
                    value: addressCard.streetName,
                  },
                  building: {
                    value: addressCard.building,
                  },
                  apartment: {
                    value: addressCard.apartment,
                  },
                  city: {
                    value: addressCard.city,
                  },
                  postal: {
                    value: addressCard.postalCode,
                  },
                  country: {
                    value: addressCard.country,
                  },
                  defaultShipping:
                    address.defaultShippingId === (addressCard.id as string),
                  defaultBilling:
                    address.defaultBillingId === (addressCard.id as string),
                  shippingAddress: address.shippingAddressesId.includes(
                    addressCard.id as string
                  ),
                  billingAddress: address.billingAddressesId.includes(
                    addressCard.id as string
                  ),
                  isUpdate: true,
                  isAdd: false,
                  idAddress: addressCard.id,
                  id: addressCard.id,
                })
              );
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
                        {bio.firstname.value}
                      </p>
                    </li>
                    <li className={style.profile_personal_item}>
                      <h4 className={style.profile_personal_title}>Lastname</h4>
                      <p className={style.profile_personal_describe}>
                        {bio.lastname.value}
                      </p>
                    </li>
                    <li className={style.profile_personal_item}>
                      <h4 className={style.profile_personal_title}>
                        Date of birth
                      </h4>
                      <p className={style.profile_personal_describe}>
                        {bio.birthday.value}
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
                    {email.value}
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
                  dispatch(
                    changeAddress({
                      street: {
                        value: '',
                      },
                      building: {
                        value: '',
                      },
                      apartment: {
                        value: '',
                      },
                      city: {
                        value: '',
                      },
                      postal: {
                        value: '',
                      },
                      country: {
                        value: '',
                      },
                      isUpdate: false,
                      isAdd: true,
                    })
                  );
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
          token={customerRefreshToken ? customerRefreshToken : ''}
          onClick={(): void => {
            setClickedBioUpdate(false);
            setShowModal(false);
          }}
          modalClass={clickedBioUpdate ? style.visible : style.hidden}
          setClickedBioUpdate={setClickedBioUpdate}
          setShowModal={setShowModal}
        />
        <EmailModal
          onClick={(): void => {
            setClickedEmailUpdate(false);
            setShowModal(false);
          }}
          token={customerRefreshToken ? customerRefreshToken : ''}
          setClickedEmailUpdate={setClickedEmailUpdate}
          setShowModal={setShowModal}
          modalClass={clickedEmailUpdate ? style.visible : style.hidden}
        />
        <PasswordModal
          onClick={(): void => {
            setClickedPasswordUpdate(false);
            setShowModal(false);
          }}
          setClickedPasswordUpdate={setClickedPasswordUpdate}
          setShowModal={setShowModal}
          token={customerRefreshToken ? customerRefreshToken : ''}
          modalClass={clickedPasswordUpdate ? style.visible : style.hidden}
        />
        <AddressModal
          onClick={(): void => {
            setShowModal(false);
            setClickedAddressesUpdate(false);
            dispatch(
              changeAddress({
                defaultShipping: false,
                defaultBilling: false,
                shippingAddress: false,
                billingAddress: false,
              })
            );
          }}
          version={version}
          modalClass={clickedAddressesUpdate ? style.visible : style.hidden}
          token={customerRefreshToken ? customerRefreshToken : ''}
          setClickedAddressesUpdate={setClickedAddressesUpdate}
          setShowModal={setShowModal}
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

// "email": 'hi@ya.ruer';
// "password": "2327Ybv!"

// "yanatestprofile@mail.com"
// "2327Ybv!"

// Единственный рабочий!
// kukushka@mail.ru
// 123qweQWE

// tycteam:cn-qqCLdwzkJaZFsOw4IlgdqftWdZkbtPWTO2Bi4W_c

// tycteam:ZFNIpB6J4c2ilbvHWTIhpC7eY-njz54kx6tXbaARgpg

// hjfjhHGF76
