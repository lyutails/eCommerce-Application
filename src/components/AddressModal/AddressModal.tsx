import style from '../AddressModal/_addressModal.module.scss';
import ButtonForm from '../shared/ButtonForm/Button';
import CloseIcon from '../../../public/assets/icons/close.svg';
import AddressForm from '../AddressForm/AddressForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  IAddAddressData,
  IAddAddressStatusData,
  IAddressModalProps,
  IAddressUpdateData,
  IChangeAddressData,
  IProfileState,
  IRootState,
} from '../../types/interfaces';
import { handleUpdateAddress } from './address-modal-verify';
import { changeAddress } from '../../store/reducers/profileReducer';

function AddressModal(props: IAddressModalProps): JSX.Element {
  const dispatch = useDispatch();
  const { address, version } = useSelector(
    (state: IProfileState) => state.profile
  );
  const { customerRefreshToken } = useSelector(
    (state: IRootState) => state.user
  );

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
  if (address.defaultShipping) {
    changeAddressData.actions.push({
      action: 'setDefaultShippingAddress',
      addressId: address.idAddress,
    });
  }
  if (address.defaultBilling) {
    changeAddressData.actions.push({
      action: 'setDefaultBillingAddress',
      addressId: address.idAddress,
    });
  }
  if (address.shippingAddress) {
    changeAddressData.actions.push({
      action: 'addShippingAddressId',
      addressId: address.idAddress,
    });
  }
  if (address.billingAddress) {
    changeAddressData.actions.push({
      action: 'addBillingAddressId',
      addressId: address.idAddress,
    });
  }
  if (
    !address.shippingAddress &&
    address.shippingAddressesId.includes(address.idAddress)
  ) {
    changeAddressData.actions.push({
      action: 'removeShippingAddressId',
      addressId: address.idAddress,
    });
  }
  if (
    !address.billingAddress &&
    address.billingAddressesId.includes(address.idAddress)
  ) {
    changeAddressData.actions.push({
      action: 'removeBillingAddressId',
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
    token: customerRefreshToken,
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
        addressStore={address}
        dispatchMethod="addressProfile"
        titleStyle={style.address_title}
        addressData={addressFormData}
        setAddressStatus={
          <div className={style.address_status}>
            <input
              onChange={(e): void => setAddressStatus(e, 'defaultShipping')}
              className={style.address_input}
              checked={address.defaultShipping}
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
              checked={address.defaultBilling}
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
              checked={address.shippingAddress}
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
              checked={address.billingAddress}
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
