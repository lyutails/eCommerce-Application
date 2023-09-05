import {
  handleApartmentShipInputTwo,
  handleBuildingShipInputTwo,
  handleCityShipInputTwo,
  handleCountryShipInputTwo,
  handlePostalShipInputTwo,
  handleStreetShipInputTwo,
} from '../../pages/verification';
import { ReactNode, useEffect, useState } from 'react';
import iconCheckmark from '../../../public/assets/icons/checkmark.svg';
import style from '../AddressForm/_addressForm.module.scss';
import Input from '../Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { IProfileState } from '../../types/interfaces';
import { changeAddress } from '../../store/reducers/profileReducer';

export interface IAddressFormProps {
  addBillingAddress?: ReactNode;
  addressData: IAddressDataObject;
  setDefault?: ReactNode;
  setAddressStatus?: ReactNode;
  titleStyle: string;
}

interface IAddressDataObject {
  title: string;
  checboxId: string;
}

function AddressForm(props: IAddressFormProps): JSX.Element {
  const { address } = useSelector((state: IProfileState) => state.profile);
  const dispatch = useDispatch();
  const [addressData, setAddressData] = useState<IAddressDataObject | null>(
    null
  );
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

  const setInputPostalAction = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    handlePostalShipInputTwo: (
      streetShipField: string,
      fieldCountryInput: string
    ) => string,
    fieldCountryInput: string
  ): void => {
    const errorMessage = handlePostalShipInputTwo(
      event.target.value,
      fieldCountryInput
    );
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
  return (
    <div className={style.shipping}>
      <div className={style.address}>
        <h4 className={props.titleStyle}>{addressData?.title}</h4>
        {props.setDefault}
        {/* <input
          onChange={(e): void => handleCheckbox(e, props.setDefaultAddress)}
          className={style.address_input}
          id={addressData?.checboxId}
          name="address"
          type="checkbox"
        />
        <label htmlFor={addressData?.checboxId} className={style.address_label}>
          Set like default shipping address
        </label> */}
      </div>
      <Input
        value={address.street.value}
        onChange={(e): void =>
          setInputAction(e, 'street', handleStreetShipInputTwo)
        }
        type="text"
        clue={
          address.street.error ? address.street.error : 'This is required field'
        }
        placeholder="Street *"
        classWrapper={style.street}
        classClue={
          address.street.error
            ? `${style.completed} ${style.error}`
            : style.uncompleted
        }
        classInput={style.street_input}
        childrenBefore={
          <div
            className={
              address.street.isChecked
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
        value={address.building.value}
        onChange={(e): void =>
          setInputAction(e, 'building', handleBuildingShipInputTwo)
        }
        type="text"
        placeholder="Building *"
        classWrapper={style.building}
        classClue={
          address.building.error
            ? `${style.completed} ${style.error}`
            : style.uncompleted
        }
        classInput={style.building_input}
        clue={
          address.building.error
            ? address.building.error
            : 'This is required field'
        }
        childrenBefore={
          <div
            className={
              address.building.isChecked
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
        value={address.apartment.value}
        onChange={(e): void =>
          setInputAction(e, 'apartment', handleApartmentShipInputTwo)
        }
        type="text"
        placeholder="Apartment"
        classWrapper={style.apartment}
        classClue={
          address.apartment.error
            ? `${style.completed} ${style.error}`
            : style.uncompleted
        }
        classInput={style.apartment_input}
        clue={
          address.apartment.error
            ? address.apartment.error
            : 'This is required field'
        }
        childrenBefore={
          <div
            className={
              address.apartment.isChecked
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
        value={address.city.value}
        onChange={(e): void =>
          setInputAction(e, 'city', handleCityShipInputTwo)
        }
        type="text"
        clue={
          address.city.error ? address.city.error : 'This is required field'
        }
        placeholder="City *"
        classWrapper={style.city}
        classClue={
          address.city.error
            ? `${style.completed} ${style.error}`
            : style.uncompleted
        }
        classInput={style.city_input}
        childrenBefore={
          <div
            className={
              address.city.isChecked
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
              setSelectAction(e, 'country', handleCountryShipInputTwo)
            }
            className={
              address.country.isChecked
                ? `${style.country_select} ${style.approved}`
                : style.country_select
            }
          >
            <option value="" className={style.country_head}>
              Please, select the country
            </option>
            {address.country.value === 'US' ? (
              <option selected value="US">
                USA
              </option>
            ) : (
              <option value="usa">USA</option>
            )}

            {address.country.value === 'CA' ? (
              <option selected value="CA">
                Canada
              </option>
            ) : (
              <option value="canada">Canada</option>
            )}
          </select>
        </div>
        <div
          className={
            address.country.error
              ? `${style.completed} ${style.error}`
              : style.uncompleted
          }
        >
          {address.country.error
            ? address.country.error
            : 'This is required field'}
        </div>
      </div>
      <Input
        value={address.postal.value}
        onChange={(e): void =>
          setInputPostalAction(
            e,
            'postal',
            handlePostalShipInputTwo,
            address.country.value
          )
        }
        type="text"
        clue={
          address.postal.error ? address.postal.error : 'This is required field'
        }
        placeholder="Postal *"
        classWrapper={style.postal}
        classClue={
          address.postal.error
            ? `${style.completed} ${style.error}`
            : style.uncompleted
        }
        classInput={style.postal_input}
        childrenBefore={
          <div
            className={
              address.postal.isChecked
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
      {props.setAddressStatus}
    </div>
  );
}

export default AddressForm;
