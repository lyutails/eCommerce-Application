import { ReactNode, useEffect, useState } from 'react';
import style from '../AddressModal/_addressModal.module.scss';
import ButtonForm from '../shared/ButtonForm/Button';
import CloseIcon from '../../../public/assets/icons/close.svg';
import Input from '../Input/Input';
import { inputHandler } from '../../pages/verification';
import InputBirthDateMask from '../Input/InputBirthDateMask';
import {
  AddressDraft,
  ClientResponse,
  Customer,
} from '@commercetools/platform-sdk';
import AddressForm from '../AddressForm/AddressForm';
import { IAddressesCardData } from '../../pages/Profile/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { IProfileState, IRootState } from '../../types/interfaces';
import { handleUpdateAddress } from './address-modal-verify';
import { handleCheckbox } from '../../utils/handleCheckbox';
import { changeAddress } from '../../store/reducers/profileReducer';
// import { updateBio } from './bio-update';

export interface IAddressModalProps {
  modalClass: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  version: number;
  token?: string;
  // addressData: IAddressesCardData | null;
  setClickedAddressesUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IAddressUpdateData {
  streetError: boolean;
  buildingError: boolean;
  cityError: boolean;
  apartmentError: boolean;
  postalError: boolean;
  countryError: boolean;
  token: string;
}

export interface IChangeAddressData {
  version: number;
  actions: [
    {
      action: string;
      addressId: string;
      address: {
        streetName: string;
        building: string;
        apartment: string;
        postalCode: string;
        city: string;
        country: string;
      };
    },
    {
      action: string;
      addressId: string;
    }?,
    {
      action: string;
      addressId: string;
    }?,
    {
      action: string;
      addressId: string;
    }?,
    {
      action: string;
      addressId: string;
    }?,
  ];
}

export interface IAddAddressData {
  version: number;
  actions: [
    {
      action: string;
      address: {
        key: string;
        streetName: string;
        building: string;
        apartment: string;
        postalCode: string;
        city: string;
        country: string;
      };
    },
    {
      action: string;
      addressKey: string;
    }?,
    {
      action: string;
      addressKey: string;
    }?,
    {
      action: string;
      addressKey: string;
    }?,
    {
      action: string;
      addressKey: string;
    }?,
  ];
}

export interface IAddAddressStatusData {
  version: number;
  actions: [
    {
      action: string;
      addressId: string;
    }?,
    {
      action: string;
      addressId: string;
    }?,
    {
      action: string;
      addressId: string;
    }?,
    {
      action: string;
      key: string;
    }?,
  ];
}

function AddressModal(props: IAddressModalProps): JSX.Element {
  const dispatch = useDispatch();
  const { address, version } = useSelector(
    (state: IProfileState) => state.profile
  );
  const { refreshToken } = useSelector((state: IRootState) => state.user);
  const [checkedDefault, setCheckedDefault] = useState(false);
  const inputDefaultShipping = document.getElementById(
    'defaultShip'
  ) as HTMLInputElement;
  const inputDefaultBilling = document.getElementById(
    'defaultBill'
  ) as HTMLInputElement;
  const inputAddressShipping = document.getElementById(
    'shippingAddress'
  ) as HTMLInputElement;
  const inputAddressBilling = document.getElementById(
    'billingAddress'
  ) as HTMLInputElement;

  const addAddressData: IAddAddressData = {
    version: version,
    actions: [
      {
        action: 'addAddress',
        address: {
          key: `address${version}`,
          streetName: address.street.value,
          building: address.building.value,
          apartment: address.apartment.value,
          postalCode: address.postal.value,
          city: address.city.value,
          country: address.country.value === 'usa' ? 'US' : 'CA',
        },
      },
    ],
  };
  const changeAddressData: IChangeAddressData = {
    version: version,
    actions: [
      {
        action: 'changeAddress',
        addressId: address.idAddress,
        address: {
          streetName: address.street.value,
          building: address.building.value,
          apartment: address.apartment.value,
          postalCode: address.postal.value,
          city: address.city.value,
          country: address.country.value === 'usa' ? 'US' : 'CA',
        },
      },
    ],
  };
  if (address.defaultShipping && inputDefaultShipping) {
    inputDefaultShipping.checked = true;
    changeAddressData.actions.push({
      action: 'setDefaultShippingAddress',
      addressId: address.idAddress,
    });
  }
  if (address.defaultBilling && inputDefaultBilling) {
    inputDefaultBilling.checked = true;
    changeAddressData.actions.push({
      action: 'setDefaultBillingAddress',
      addressId: address.idAddress,
    });
  }
  if (address.shippingAddress && inputAddressShipping) {
    inputAddressShipping.checked = true;
    changeAddressData.actions.push({
      action: 'addShippingAddressId',
      addressId: address.idAddress,
    });
  }
  if (address.billingAddress && inputAddressBilling) {
    inputAddressBilling.checked = true;
    changeAddressData.actions.push({
      action: 'addBillingAddressId',
      addressId: address.idAddress,
    });
  }
  function addStatusAddress(id: string): IAddAddressStatusData {
    const addAddressStatusData: IAddAddressStatusData = {
      version: version + 1,
      actions: [],
    };
    if (address.billingAddress) {
      addAddressStatusData.actions.push({
        action: 'addBillingAddressId',
        addressId: id,
      });
    }
    if (address.shippingAddress) {
      addAddressStatusData.actions.push({
        action: 'addShippingAddressId',
        addressId: id,
      });
    }
    if (address.defaultBilling) {
      addAddressStatusData.actions.push({
        action: 'setDefaultBillingAddress',
        addressId: id,
      });
    }
    if (address.defaultShipping) {
      addAddressStatusData.actions.push({
        action: 'setDefaultShippingAddress',
        addressId: id,
      });
    }
    return addAddressStatusData;
  }
  const updateAddressData: IAddressUpdateData = {
    streetError: !address.street.error,
    buildingError: !address.building.error,
    cityError: !address.city.error,
    apartmentError: !address.apartment.error,
    postalError: !address.postal.error,
    countryError: !address.country.error,
    token: refreshToken,
  };
  const addressFormData = {
    title: 'Update address',
    checboxId: 'address-modal-id',
  };
  const setAddressStatus = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ): void => {
    dispatch(
      changeAddress({
        [fieldName]: event.target.checked,
      })
    );
  };
  return (
    <div className={`${style.modal} ${props.modalClass}`}>
      <ButtonForm classNames={style.modal_close} onClick={props.onClick}>
        <img src={CloseIcon} alt="Close Modal" />
      </ButtonForm>
      <AddressForm
        titleStyle={style.address_title}
        addressData={addressFormData}
        setDefaultAddress={setCheckedDefault}
        setAddressStatus={
          <div className={style.address_status}>
            <input
              onChange={(e): void => setAddressStatus(e, 'defaultShipping')}
              className={style.address_input}
              id="defaultShip"
              name="address"
              type="checkbox"
            />
            <label htmlFor="defaultShip" className={style.address_label}>
              Set like default shipping address
            </label>
            <input
              onChange={(e): void => setAddressStatus(e, 'defaultBilling')}
              className={style.address_input}
              id="defaultBill"
              name="address"
              type="checkbox"
            />
            <label htmlFor="defaultBill" className={style.address_label}>
              Set like default billing address
            </label>
            <input
              onChange={(e): void => setAddressStatus(e, 'shippingAddress')}
              className={style.address_input}
              id="shippingAddress"
              name="address"
              type="checkbox"
            />
            <label htmlFor="shippingAddress" className={style.address_label}>
              Set like shipping address
            </label>
            <input
              onChange={(e): void => setAddressStatus(e, 'billingAddress')}
              className={style.address_input}
              id="billingAddress"
              name="address"
              type="checkbox"
            />
            <label htmlFor="billingAddress" className={style.address_label}>
              Set like billing address
            </label>
          </div>
        }
      />
      <ButtonForm
        onClick={(): void =>
          handleUpdateAddress(
            updateAddressData,
            props.setClickedAddressesUpdate,
            props.setShowModal,
            address.isUpdate ? changeAddressData : addAddressData,
            dispatch,
            addStatusAddress,
            address.isAdd,
            version
          )
        }
        classNames={style.modal_button}
      >
        Confirm
      </ButtonForm>
    </div>
  );
}

export default AddressModal;
