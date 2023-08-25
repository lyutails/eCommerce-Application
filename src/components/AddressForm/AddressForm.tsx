import { ReactNode } from 'react';
import iconCheckmark from '../../../public/assets/icons/checkmark.svg';
import style from '../AddressForm/_addressForm.module.scss';
import Input from '../Input/Input';

export interface IAddressFormProps {
  title: string;
  setDefaultAddress?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  addBillingAddress?: ReactNode;
  checboxId: string;
  setStreetField: React.ChangeEventHandler<HTMLInputElement> | undefined;
  setBuildingField: React.ChangeEventHandler<HTMLInputElement> | undefined;
  setApartmentField: React.ChangeEventHandler<HTMLInputElement> | undefined;
  setCityField: React.ChangeEventHandler<HTMLInputElement> | undefined;
  setCountryField: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  setPostalField: React.ChangeEventHandler<HTMLInputElement> | undefined;
  streetError: string;
  buildingError: string;
  apartmentError: string;
  cityError: string;
  countryError: string;
  postalError: string;
  checkmarkStreet: boolean;
  checkmarkBuilding: boolean;
  checkmarkApartment: boolean;
  checkmarkCity: boolean;
  checkmarkCountry: boolean;
  checkmarkPostal: boolean;
}

function AddressForm(props: IAddressFormProps): JSX.Element {
  return (
    <div className={style.shipping}>
      <div className={style.address}>
        <h4 className={style.address_title}>{props.title}</h4>
        <input
          onChange={props.setDefaultAddress}
          className={style.address_input}
          id={props.checboxId}
          name="address"
          type="checkbox"
        />
        <label htmlFor={props.checboxId} className={style.address_label}>
          Set like default shipping address
        </label>
      </div>
      <Input
        func={props.setStreetField}
        type="text"
        clue={props.streetError ? props.streetError : 'This is required field'}
        placeholder="Street *"
        classWrapper={style.street}
        classClue={
          props.streetError
            ? `${style.completed} ${style.error}`
            : style.uncompleted
        }
        classInput={style.street_input}
        childrenBefore={
          <div
            className={
              props.checkmarkStreet
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
        func={props.setBuildingField}
        type="text"
        placeholder="Building *"
        classWrapper={style.building}
        classClue={
          props.buildingError
            ? `${style.completed} ${style.error}`
            : style.uncompleted
        }
        classInput={style.building_input}
        clue={
          props.buildingError ? props.buildingError : 'This is required field'
        }
        childrenBefore={
          <div
            className={
              props.checkmarkBuilding
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
        func={props.setApartmentField}
        type="text"
        placeholder="Apartment"
        classWrapper={style.apartment}
        classClue={
          props.apartmentError
            ? `${style.completed} ${style.error}`
            : style.uncompleted
        }
        classInput={style.apartment_input}
        clue={
          props.apartmentError ? props.apartmentError : 'This is required field'
        }
        childrenBefore={
          <div
            className={
              props.checkmarkApartment
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
        func={props.setCityField}
        type="text"
        clue={props.cityError ? props.cityError : 'This is required field'}
        placeholder="City *"
        classWrapper={style.city}
        classClue={
          props.cityError
            ? `${style.completed} ${style.error}`
            : style.uncompleted
        }
        classInput={style.city_input}
        childrenBefore={
          <div
            className={
              props.checkmarkCity
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
            onChange={props.setCountryField}
            className={
              props.checkmarkCountry
                ? `${style.country_select} ${style.approved}`
                : style.country_select
            }
          >
            <option value="" className={style.country_head}>
              Please, select the country
            </option>
            <option value="usa">USA</option>
            <option value="canada">Canada</option>
          </select>
        </div>
        <div
          className={
            props.countryError
              ? `${style.completed} ${style.error}`
              : style.uncompleted
          }
        >
          {props.countryError ? props.countryError : 'This is required field'}
        </div>
      </div>
      <Input
        func={props.setPostalField}
        type="text"
        clue={props.postalError ? props.postalError : 'This is required field'}
        placeholder="Postal *"
        classWrapper={style.postal}
        classClue={
          props.postalError
            ? `${style.completed} ${style.error}`
            : style.uncompleted
        }
        classInput={style.postal_input}
        childrenBefore={
          <div
            className={
              props.checkmarkPostal
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
