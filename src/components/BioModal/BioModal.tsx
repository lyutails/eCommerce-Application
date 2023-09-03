import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import style from '../BioModal/_bioModal.module.scss';
import ButtonForm from '../shared/ButtonForm/Button';
import CloseIcon from '../../../public/assets/icons/close.svg';
import Input from '../Input/Input';
import {
  handleBirthdayInput,
  handleFirstnameInput,
  handleFirstnameInputTwo,
  handleLastnameInput,
  inputHandler,
} from '../../pages/verification';
import InputBirthDateMask from '../Input/InputBirthDateMask';
import { handleUpdateBio, IMyCustomerBioUpdate } from './bio-modal-verify';
import iconCheckmark from '../../../public/assets/icons/checkmark.svg';
import { parseDateToServer } from '../../utils/parseDate';
import { IPersonalData } from '../../pages/Profile/Profile';

export interface IBioModalProps {
  modalClass: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  firstnameField: string;
  lastnameField: string;
  birthdayField: string;
  version: number;
  token?: string;
  setClickedBioUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPersonal: React.Dispatch<React.SetStateAction<IPersonalData | null>>;
}

interface IFormData {
  // street?: string;
  [key: string]: {
    value: string;
    error: string;
  };
}

const initialState = {
  firstname: {
    value: '',
    error: '',
  },
};

function BioModal(props: IBioModalProps): JSX.Element {
  const [firstname, setFistname] = useState('');
  const [fistnameError, setFirstnameError] = useState('');
  const [checkmarkFirstname, setCheckmarkFirstname] = useState(false);
  const [checkmarkLastname, setCheckmarkLastname] = useState(false);
  const [checkmarkBirthday, setCheckmarkBirthday] = useState(false);
  const [lastname, setLastname] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [birthday, setBirthday] = useState('');
  const [birthdayError, setBirthdayError] = useState('');
  const [firstnameСheck, setFirstnameCheck] = useState(true);
  const [lastnameСheck, setLastnameCheck] = useState(true);
  const [birthdayСheck, setBirthdayCheck] = useState(true);

  const [form, setForm] = useState<IFormData>(initialState);
  const setInputError = (
    fieldName: string,
    handleFieldInput: (
      arg0: string,
      arg1: Dispatch<SetStateAction<boolean>>
    ) => string,
    setCheckmarkInput: React.Dispatch<React.SetStateAction<boolean>>
  ): void => {
    setForm({
      ...form,
      [fieldName]: {
        ...form[fieldName],
        error: handleFieldInput(form[fieldName].value, setCheckmarkInput),
      },
    });
  };

  const setInputValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ): void => {
    setForm({
      ...form,
      [fieldName]: {
        ...form[fieldName],
        value: event.target.value,
      },
    });
  };
  useEffect(() => {
    setForm({
      ...form,
      firstname: {
        ...form.firstname,
        value: props.firstnameField,
      },
      lastname: {
        ...form.lastname,
        value: props.lastnameField,
      },
      birthday: {
        ...form.birthday,
        value: props.birthdayField,
      },
    });
  }, [props.birthdayField, props.firstnameField, props.lastnameField]);

  // useEffect(() => {
  //   console.log(form);
  // }, [form]);
  // useEffect(() => {
  //   setBirthday(props.birthdayField);
  //   setFistname(props.firstnameField);
  //   setLastname(props.lastnameField);
  // }, [props.birthdayField, props.firstnameField, props.lastnameField]);

  const customerUpdateData: IMyCustomerBioUpdate = {
    version: props.version,
    actions: [
      {
        action: 'setFirstName',
        firstName: firstname,
      },
      {
        action: 'setLastName',
        lastName: lastname,
      },
      {
        action: 'setDateOfBirth',
        dateOfBirth: parseDateToServer(birthday),
      },
    ],
  };

  return (
    <div className={`${style.modal} ${props.modalClass}`}>
      <ButtonForm classNames={style.modal_close} onClick={props.onClick}>
        <img src={CloseIcon} alt="Close Modal" />
      </ButtonForm>
      <div className={style.modal_bio}>
        <h4 className={style.modal_title}>Firstname</h4>
        <Input
          value={form.firstname?.value}
          onblur={
            (): void =>
              setForm({
                firstname: {
                  ...form.firstname,
                  error: handleFirstnameInputTwo(
                    form.firstname.value,
                    setCheckmarkFirstname
                  ),
                },
              })
            // setFirstnameCheck(
            //   handleFirstnameInput(
            //     firstname,
            //     setFirstnameError,
            //     firstnameСheck,
            //     setCheckmarkFirstname
            //   )
            // )
          }
          onChange={(e): void => setInputValue(e, 'firstname')}
          type="text"
          clue={fistnameError ? fistnameError : 'This is required field'}
          placeholder="First name *"
          classWrapper={style.firstname}
          classClue={
            fistnameError
              ? `${style.completed} ${style.error}`
              : style.uncompleted
          }
          classInput={style.firstname_input}
          childrenBefore={
            <div
              className={
                checkmarkFirstname
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
        <h4 className={style.modal_title}>Lastname</h4>
        <Input
          value={lastname}
          onChange={(e): void => setInputValue(e, 'lastname')}
          onblur={(): void =>
            setLastnameCheck(
              handleLastnameInput(
                lastname,
                setLastnameError,
                lastnameСheck,
                setCheckmarkLastname
              )
            )
          }
          type="text"
          clue={lastnameError ? lastnameError : 'This is required field'}
          placeholder="Last name *"
          classWrapper={style.lastname}
          classClue={
            lastnameError
              ? `${style.completed} ${style.error}`
              : style.uncompleted
          }
          classInput={style.lastname_input}
          childrenBefore={
            <div
              className={
                checkmarkLastname
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
        <h4 className={style.modal_title}>Date of birth</h4>
        <InputBirthDateMask
          value={birthday}
          onblur={(): void =>
            setBirthdayCheck(
              handleBirthdayInput(
                birthday,
                setBirthdayError,
                birthdayСheck,
                setCheckmarkBirthday
              )
            )
          }
          onAccept={(value: string): void => setBirthday(value)}
          clue={
            birthdayError
              ? birthdayError
              : `Enter Date of birth in format DD.MM.YYYY. Your age should be equal or more than 13 to register`
          }
          type="text"
          placeholder="dd.mm.yyyy *"
          classWrapper={style.birth}
          classClue={
            birthdayError
              ? `${style.completed} ${style.error}`
              : style.uncompleted
          }
          classInput={style.birth_input}
          childrenBefore={
            <div
              className={
                checkmarkBirthday
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
      </div>
      <ButtonForm
        onClick={(): void =>
          handleUpdateBio(
            firstnameСheck,
            lastnameСheck,
            birthdayСheck,
            props.token ? props.token : '',
            customerUpdateData,
            props.setClickedBioUpdate,
            props.setShowModal,
            props.setPersonal
          )
        }
        classNames={style.modal_button}
      >
        Confirm
      </ButtonForm>
    </div>
  );
}

export default BioModal;
