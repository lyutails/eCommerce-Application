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
import {
  IAddressDataObject,
  IAddressDraftState,
  IAddressFormProps,
  IAddressInput,
  IProfileState,
  IRegistrationState,
} from '../../types/interfaces';
import { changeAddress } from '../../store/reducers/profileReducer';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import {
  changeAddressBillReg,
  changeAddressShipReg,
} from '../../store/reducers/registrationReducer';

function AddressForm(props: IAddressFormProps): JSX.Element {
  // const { address } = useSelector((state: IProfileState) => state.profile);
  // const { addressShip, addressBill } = useSelector(
  //   (state: IRegistrationState) => state.registration
  // );
  const dispatch = useDispatch();
  const [addressData, setAddressData] = useState<IAddressDataObject | null>(
    null
  );
  const [method, setMethod] = useState('');

  useEffect(() => {
    // props.addressStore;
    setMethod(props.dispatchMethod);
    setAddressData(props.addressData);
  }, [props.addressData, props.dispatchMethod]);

  const chooseMethod = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    fieldName: string,
    errorMessage: string
  ):
    | {
        payload: IAddressInput;
        type: 'registration/changeAddressShipReg';
      }
    | {
        payload: IAddressInput;
        type: 'registration/changeAddressBillReg';
      }
    | {
        payload: IAddressInput;
        type: 'profile/changeAddress';
      }
    | undefined => {
    if (method === 'shippingRegistration') {
      return dispatch(
        changeAddressShipReg({
          [fieldName]: {
            value: event.target.value,
            error: errorMessage,
            isChecked: !errorMessage,
          },
        })
      );
    } else if (method === 'billingRegistration') {
      return dispatch(
        changeAddressBillReg({
          [fieldName]: {
            value: event.target.value,
            error: errorMessage,
            isChecked: !errorMessage,
          },
        })
      );
    } else if (method === 'addressProfile') {
      return dispatch(
        changeAddress({
          [fieldName]: {
            value: event.target.value,
            error: errorMessage,
            isChecked: !errorMessage,
          },
        })
      );
    }
  };

  const setInputAction = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    checkErrorInput: (streetShipField: string) => string
  ): void => {
    const errorMessage = checkErrorInput(event.target.value);
    chooseMethod(event, fieldName, errorMessage);
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
    chooseMethod(event, fieldName, errorMessage);
  };

  const setSelectAction = (
    event: React.ChangeEvent<HTMLSelectElement>,
    fieldName: string,
    checkErrorInput: (streetShipField: string) => string
  ): void => {
    const errorMessage = checkErrorInput(event.target.value);
    chooseMethod(event, fieldName, errorMessage);
  };

  return (
    <div className={style.shipping}>
      <div className={style.address}>
        <h4 className={props.titleStyle}>{addressData?.title}</h4>
        {props.setDefault}
      </div>
      <Input
        value={props.addressStore.street.value}
        onChange={(e): void =>
          setInputAction(e, 'street', handleStreetShipInputTwo)
        }
        type="text"
        clue={
          props.addressStore.street.error
            ? props.addressStore.street.error
            : 'This is required field'
        }
        placeholder="Street *"
        classWrapper={style.street}
        classClue={
          props.addressStore.street.error
            ? `${style.completed} ${style.error}`
            : style.uncompleted
        }
        classInput={style.street_input}
        childrenBefore={
          <div
            className={
              props.addressStore.street.isChecked
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
        value={props.addressStore.building.value}
        onChange={(e): void =>
          setInputAction(e, 'building', handleBuildingShipInputTwo)
        }
        type="text"
        placeholder="Building *"
        classWrapper={style.building}
        classClue={
          props.addressStore.building.error
            ? `${style.completed} ${style.error}`
            : style.uncompleted
        }
        classInput={style.building_input}
        clue={
          props.addressStore.building.error
            ? props.addressStore.building.error
            : 'This is required field'
        }
        childrenBefore={
          <div
            className={
              props.addressStore.building.isChecked
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
        value={props.addressStore.apartment.value}
        onChange={(e): void =>
          setInputAction(e, 'apartment', handleApartmentShipInputTwo)
        }
        type="text"
        placeholder="Apartment"
        classWrapper={style.apartment}
        classClue={
          props.addressStore.apartment.error
            ? `${style.completed} ${style.error}`
            : style.uncompleted
        }
        classInput={style.apartment_input}
        clue={
          props.addressStore.apartment.error
            ? props.addressStore.apartment.error
            : 'This is required field'
        }
        childrenBefore={
          <div
            className={
              props.addressStore.apartment.isChecked
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
        value={props.addressStore.city.value}
        onChange={(e): void =>
          setInputAction(e, 'city', handleCityShipInputTwo)
        }
        type="text"
        clue={
          props.addressStore.city.error
            ? props.addressStore.city.error
            : 'This is required field'
        }
        placeholder="City *"
        classWrapper={style.city}
        classClue={
          props.addressStore.city.error
            ? `${style.completed} ${style.error}`
            : style.uncompleted
        }
        classInput={style.city_input}
        childrenBefore={
          <div
            className={
              props.addressStore.city.isChecked
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
              props.addressStore.country.isChecked
                ? `${style.country_select} ${style.approved}`
                : style.country_select
            }
          >
            <option value="" className={style.country_head}>
              Please, select the country
            </option>
            {props.addressStore.country.value === 'US' ? (
              <option selected value="US">
                USA
              </option>
            ) : (
              <option value="US">USA</option>
            )}

            {props.addressStore.country.value === 'CA' ? (
              <option selected value="CA">
                Canada
              </option>
            ) : (
              <option value="CA">Canada</option>
            )}
          </select>
        </div>
        <div
          className={
            props.addressStore.country.error
              ? `${style.completed} ${style.error}`
              : style.uncompleted
          }
        >
          {props.addressStore.country.error
            ? props.addressStore.country.error
            : 'This is required field'}
        </div>
      </div>
      <Input
        value={props.addressStore.postal.value}
        onChange={(e): void =>
          setInputPostalAction(
            e,
            'postal',
            handlePostalShipInputTwo,
            props.addressStore.country.value
              ? props.addressStore.country.value
              : ''
          )
        }
        type="text"
        clue={
          props.addressStore.postal.error
            ? props.addressStore.postal.error
            : 'This is required field'
        }
        placeholder="Postal *"
        classWrapper={style.postal}
        classClue={
          props.addressStore.postal.error
            ? `${style.completed} ${style.error}`
            : style.uncompleted
        }
        classInput={style.postal_input}
        childrenBefore={
          <div
            className={
              props.addressStore.postal.isChecked
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
