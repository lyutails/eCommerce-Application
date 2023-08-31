import {
  handleStreetShipInputTwo,
  selectHandler,
} from '../../pages/verification';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import iconCheckmark from '../../../public/assets/icons/checkmark.svg';
import style from '../AddressForm/_addressForm.module.scss';
import Input from '../Input/Input';
import { handleCheckbox } from '../../utils/handleCheckbox';
import { AddressDraft } from '@commercetools/platform-sdk';
import { IAddressesCardData } from '../../pages/Profile/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { IProfileState } from '../../types/interfaces';
import profileReducer, {
  changeAddress,
} from '../../store/reducers/profileReducer';

export interface IAddressFormProps {
  addBillingAddress?: ReactNode;
  addressData: IAddressDataObject;
  setStreetField: Dispatch<SetStateAction<string>>;
  setDefaultAddress: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IAddressDataObject {
  title: string;
  checboxId: string;
  streetError: string;
  buildingError: string;
  apartmentError: string;
  cityError: string;
  countryError: string;
  postalError: string;
  // setStreetField?: Dispatch<SetStateAction<string>>;
  setBuildingField?: Dispatch<SetStateAction<string>>;
  setApartmentField?: Dispatch<SetStateAction<string>>;
  setCityField?: Dispatch<SetStateAction<string>>;
  setCountryField?: Dispatch<SetStateAction<string>>;
  setPostalField?: Dispatch<SetStateAction<string>>;
  checkmarkStreet: boolean;
  checkmarkBuilding: boolean;
  checkmarkApartment: boolean;
  checkmarkCity: boolean;
  checkmarkCountry: boolean;
  checkmarkPostal: boolean;
  inputFields: IAddressesCardData | null;
}

interface IFormData {
  // street?: string;
  [key: string]: string;
}

const initialState = {
  street: 'hfkyhu',
};

// type KeyFormInterface = {
//   'street',
// };

function AddressForm(props: IAddressFormProps): JSX.Element {
  const { address } = useSelector((state: IProfileState) => state.profile);
  const dispatch = useDispatch();
  const [addressData, setAddressData] = useState<IAddressDataObject | null>(
    null
  );
  const [form, setForm] = useState<IFormData>(initialState);
  useEffect(() => {
    setAddressData(props.addressData);
  }, [props.addressData]);

  const setInputAction = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    checkErrorInput: (streetShipField: string) => string
  ): void => {
    const errorMessage = checkErrorInput(event.target.value);
    dispatch(
      changeAddress({
        [fieldName]: {
          value: event.target.value,
          error: errorMessage,
          isChecked: !errorMessage,
        },
      })
    );
  };

  const setSelectAction = (
    event: React.ChangeEvent<HTMLSelectElement>,
    fieldName: string,
    checkErrorInput: (streetShipField: string) => string
  ): void => {
    const errorMessage = checkErrorInput(event.target.value);
    dispatch(
      changeAddress({
        [fieldName]: {
          value: event.target.value,
          error: errorMessage,
          isChecked: !errorMessage,
        },
      })
    );
  };
  console.log(address.street);
  return (
    <div className={style.shipping}>
      <div className={style.address}>
        <h4 className={style.address_title}>{addressData?.title}</h4>
        <input
          onChange={(e): void => handleCheckbox(e, props.setDefaultAddress)}
          className={style.address_input}
          id={addressData?.checboxId}
          name="address"
          type="checkbox"
        />
        <label htmlFor={addressData?.checboxId} className={style.address_label}>
          Set like default shipping address
        </label>
      </div>
      <Input
        value={address.street.value}
        onChange={(e): void =>
          setInputAction(e, 'street', handleStreetShipInputTwo)
        }
        type="text"
        clue={
          addressData?.streetError
            ? addressData?.streetError
            : 'This is required field'
        }
        placeholder="Street *"
        classWrapper={style.street}
        classClue={
          addressData?.streetError
            ? `${style.completed} ${style.error}`
            : style.uncompleted
        }
        classInput={style.street_input}
        childrenBefore={
          <div
            className={
              addressData?.checkmarkStreet
                ? `${style.wrapper_img} ${style.completed}`
                : `${style.wrapper_img} ${style.uncompleted}`
            }
          >
            <img
              className={style.wrapper_img_icon}
              src={iconCheckmark}
              alt="Icon"
            />
          </div>
        }
      />
      <Input
        value={addressData?.inputFields?.addressInfo.building}
        onChange={(e): void =>
          setInputAction(e, 'street', handleStreetShipInputTwo)
        }
        type="text"
        placeholder="Building *"
        classWrapper={style.building}
        classClue={
          addressData?.buildingError
            ? `${style.completed} ${style.error}`
            : style.uncompleted
        }
        classInput={style.building_input}
        clue={
          addressData?.buildingError
            ? addressData?.buildingError
            : 'This is required field'
        }
        childrenBefore={
          <div
            className={
              addressData?.checkmarkBuilding
                ? `${style.wrapper_img} ${style.completed}`
                : `${style.wrapper_img} ${style.uncompleted}`
            }
          >
            <img
              className={style.wrapper_img_icon}
              src={iconCheckmark}
              alt="Icon"
            />
          </div>
        }
      />
      <Input
        value={addressData?.inputFields?.addressInfo.apartment}
        onChange={(e): void =>
          setInputAction(e, 'street', handleStreetShipInputTwo)
        }
        type="text"
        placeholder="Apartment"
        classWrapper={style.apartment}
        classClue={
          addressData?.apartmentError
            ? `${style.completed} ${style.error}`
            : style.uncompleted
        }
        classInput={style.apartment_input}
        clue={
          addressData?.apartmentError
            ? addressData.apartmentError
            : 'This is required field'
        }
        childrenBefore={
          <div
            className={
              addressData?.checkmarkApartment
                ? `${style.wrapper_img} ${style.completed}`
                : `${style.wrapper_img} ${style.uncompleted}`
            }
          >
            <img
              className={style.wrapper_img_icon}
              src={iconCheckmark}
              alt="Icon"
            />
          </div>
        }
      />
      <Input
        value={addressData?.inputFields?.addressInfo.city}
        onChange={(e): void =>
          setInputAction(e, 'street', handleStreetShipInputTwo)
        }
        type="text"
        clue={
          addressData?.cityError
            ? addressData?.cityError
            : 'This is required field'
        }
        placeholder="City *"
        classWrapper={style.city}
        classClue={
          addressData?.cityError
            ? `${style.completed} ${style.error}`
            : style.uncompleted
        }
        classInput={style.city_input}
        childrenBefore={
          <div
            className={
              addressData?.checkmarkCity
                ? `${style.wrapper_img} ${style.completed}`
                : `${style.wrapper_img} ${style.uncompleted}`
            }
          >
            <img
              className={style.wrapper_img_icon}
              src={iconCheckmark}
              alt="Icon"
            />
          </div>
        }
      />
      <div className={style.country}>
        <div className={style.country_wrapper}>
          <select
            onChange={(e): void =>
              setSelectAction(e, 'street', handleStreetShipInputTwo)
            }
            className={
              addressData?.checkmarkCountry
                ? `${style.country_select} ${style.approved}`
                : style.country_select
            }
          >
            <option value="" className={style.country_head}>
              Please, select the country
            </option>
            {addressData?.inputFields?.addressInfo.country === 'US' ? (
              <option selected value="usa">
                USA
              </option>
            ) : (
              <option value="usa">USA</option>
            )}

            {addressData?.inputFields?.addressInfo.country === 'CA' ? (
              <option selected value="canada">
                Canada
              </option>
            ) : (
              <option value="canada">Canada</option>
            )}
          </select>
        </div>
        <div
          className={
            addressData?.countryError
              ? `${style.completed} ${style.error}`
              : style.uncompleted
          }
        >
          {addressData?.countryError
            ? addressData?.countryError
            : 'This is required field'}
        </div>
      </div>
      <Input
        value={addressData?.inputFields?.addressInfo.postalCode}
        onChange={(e): void =>
          setInputAction(e, 'street', handleStreetShipInputTwo)
        }
        type="text"
        clue={
          addressData?.postalError
            ? addressData.postalError
            : 'This is required field'
        }
        placeholder="Postal *"
        classWrapper={style.postal}
        classClue={
          addressData?.postalError
            ? `${style.completed} ${style.error}`
            : style.uncompleted
        }
        classInput={style.postal_input}
        childrenBefore={
          <div
            className={
              addressData?.checkmarkPostal
                ? `${style.wrapper_img} ${style.completed}`
                : `${style.wrapper_img} ${style.uncompleted}`
            }
          >
            <img
              className={style.wrapper_img_icon}
              src={iconCheckmark}
              alt="Icon"
            />
          </div>
        }
      />
      {props.addBillingAddress}
    </div>
  );
}

export default AddressForm;
