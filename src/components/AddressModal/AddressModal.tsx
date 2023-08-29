import { useEffect, useState } from 'react';
import style from '../AddressModal/_addressModal.module.scss';
import ButtonForm from '../shared/ButtonForm/Button';
import CloseIcon from '../../../public/assets/icons/close.svg';
import Input from '../Input/Input';
import { inputHandler } from '../../pages/verification';
import InputBirthDateMask from '../Input/InputBirthDateMask';
import { AddressDraft } from '@commercetools/platform-sdk';
import AddressForm from '../AddressForm/AddressForm';
// import { updateBio } from './bio-update';

export interface IAddressModalProps {
  modalClass: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  version: number;
  token?: string;
  addressData: AddressDraft | null;
}

function AddressModal(props: IAddressModalProps): JSX.Element {
  const [streetError, setStreetError] = useState('');
  const [buildingError, setBuildingError] = useState('');
  const [apartmentError, setApartmentError] = useState('');
  const [cityError, setCityError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [postalError, setPostalError] = useState('');
  const [street, setStreet] = useState('');
  const [building, setBuilding] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postal, setPostal] = useState('');
  const [checkmarkBuilding, setCheckmarkBuilding] = useState(false);
  const [checkmarkStreet, setCheckmarkStreet] = useState(false);
  const [checkmarkApartment, setCheckmarkApartment] = useState(false);
  const [checkmarkCity, setCheckmarkCity] = useState(false);
  const [checkmarkCountry, setCheckmarkCountry] = useState(false);
  const [checkmarkPostal, setCheckmarkPostal] = useState(false);

  const [checkedDefault, setCheckedDefault] = useState(false);

  const customerData = {
    version: props.version,
    actions: [
      {
        action: 'setFirstName',
        firstName: 'hsjdvcdfvsdf',
      },
      {
        action: 'setLastName',
        lastName: 'sdhjcvsladhjcv',
      },
    ],
  };
  const addressData = props.addressData;
  const addressFormData = {
    title: 'Update address',
    checboxId: 'address-modal-id',
    streetError: streetError,
    buildingError: buildingError,
    apartmentError: apartmentError,
    cityError: cityError,
    countryError: countryError,
    postalError: postalError,
    setStreetField: setStreet,
    setBuildingField: setBuilding,
    setApartmentField: setApartment,
    setCityField: setCity,
    setCountryField: setCountry,
    setPostalField: setPostal,
    checkmarkStreet: checkmarkStreet,
    checkmarkBuilding: checkmarkBuilding,
    checkmarkApartment: checkmarkApartment,
    checkmarkCity: checkmarkCity,
    checkmarkCountry: checkmarkCountry,
    checkmarkPostal: checkmarkPostal,
    inputFields: addressData,
  };
  return (
    <div className={`${style.modal} ${props.modalClass}`}>
      <ButtonForm classNames={style.modal_close} onClick={props.onClick}>
        <img src={CloseIcon} alt="Close Modal" />
      </ButtonForm>
      <AddressForm
        addressData={addressFormData}
        setDefaultAddress={setCheckedDefault}
      />
      <ButtonForm
        onClick={(): void => console.log('dhjk')}
        classNames={style.modal_button}
      >
        Confirm
      </ButtonForm>
    </div>
  );
}

export default AddressModal;
