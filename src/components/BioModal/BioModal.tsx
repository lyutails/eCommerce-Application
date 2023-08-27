import { useState } from 'react';
import style from '../BioModal/_bioModal.module.scss';
import ButtonForm from '../shared/ButtonForm/Button';
import CloseIcon from '../../../public/assets/icons/close.svg';
import Input from '../Input/Input';
import { inputHandler } from '../../pages/verification';
import InputBirthDateMask from '../Input/InputBirthDateMask';
import { updateBio } from './bio-update';

export interface IBioModalProps {
  modalClass: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  firstnameField: string;
  lastnameField: string;
  birthdayField: string;
  version: number;
  token?: string;
}

function BioModal(props: IBioModalProps): JSX.Element {
  const [firstname, setFistname] = useState('');
  const [fistnameError, setFirstnameError] = useState(false);
  const [lastname, setLastname] = useState('');
  const [lastnameError, setLastnameError] = useState(false);
  const [birthday, setBirthday] = useState('');
  const [birthdayError, setBirthdayError] = useState(false);

  const parts = props.birthdayField.split('-');
  const birthdayDate = parts[2] + parts[1] + parts[0];
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
  return (
    <div className={`${style.modal} ${props.modalClass}`}>
      <ButtonForm classNames={style.modal_close} onClick={props.onClick}>
        <img src={CloseIcon} alt="Close Modal" />
      </ButtonForm>
      <div className={style.modal_bio}>
        <h4 className={style.modal_title}>Firstname</h4>
        <Input
          value={props.firstnameField}
          onChange={(e): void => inputHandler(e, setFistname)}
          type="text"
          //   clue={fistnameError ? fistnameError : 'This is required field'}
          placeholder="First name *"
          classWrapper={style.firstname}
          classClue={
            fistnameError
              ? `${style.completed} ${style.error}`
              : style.uncompleted
          }
          classInput={style.firstname_input}
          //   childrenBefore={
          //     <div
          //       className={
          //         checkmarkFirstname
          //           ? `${style.wrapper_img} ${style.completed}`
          //           : `${style.wrapper_img} ${style.uncompleted}`
          //       }
          //     >
          //       <img
          //         className={style.wrapper_img_icon}
          //         src={iconCheckmark}
          //         alt="Icon"
          //       />
          //     </div>
          //   }
        />
        <h4 className={style.modal_title}>Lastname</h4>
        <Input
          value={props.lastnameField}
          onChange={(e): void => inputHandler(e, setLastname)}
          type="text"
          //   clue={lastnameError ? lastnameError : 'This is required field'}
          placeholder="Last name *"
          classWrapper={style.lastname}
          classClue={
            lastnameError
              ? `${style.completed} ${style.error}`
              : style.uncompleted
          }
          classInput={style.lastname_input}
          //   childrenBefore={
          //     <div
          //       className={
          //         checkmarkLastname
          //           ? `${style.wrapper_img} ${style.completed}`
          //           : `${style.wrapper_img} ${style.uncompleted}`
          //       }
          //     >
          //       <img
          //         className={style.wrapper_img_icon}
          //         src={iconCheckmark}
          //         alt="Icon"
          //       />
          //     </div>
          //   }
        />
        <h4 className={style.modal_title}>Date of birth</h4>
        <InputBirthDateMask
          value={birthdayDate}
          func={(e): void => inputHandler(e, setBirthday)}
          //   clue={
          //     birthdayError
          //       ? birthdayError
          //       : `Enter Date of birth in format DD.MM.YYYY. Your age should be equal or more than 13 to register`
          //   }
          type="text"
          placeholder="dd.mm.yyyy *"
          classWrapper={style.birth}
          classClue={
            birthdayError
              ? `${style.completed} ${style.error}`
              : style.uncompleted
          }
          classInput={style.birth_input}
          //   childrenBefore={
          //     <div
          //       className={
          //         checkmarkBirthday
          //           ? `${style.wrapper_img} ${style.completed}`
          //           : `${style.wrapper_img} ${style.uncompleted}`
          //       }
          //     >
          //       <img
          //         className={style.wrapper_img_icon}
          //         src={iconCheckmark}
          //         alt="Icon"
          //       />
          //     </div>
          //   }
        />
      </div>
      <ButtonForm
        onClick={(): void =>
          updateBio(props.token ? props.token : '', customerData)
        }
        classNames={style.modal_button}
      >
        Confirm
      </ButtonForm>
    </div>
  );
}

export default BioModal;
