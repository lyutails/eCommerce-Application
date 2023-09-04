import { ChangeEventHandler, ReactNode, useEffect, useState } from 'react';
import style from '../EmailModal/_emailModal.module.scss';
import ButtonForm from '../shared/ButtonForm/Button';
import CloseIcon from '../../../public/assets/icons/close.svg';
import Input from '../Input/Input';
import {
  handleLoginInput,
  handleLoginInputTwo,
  inputHandler,
} from '../../pages/verification';
import iconEmail from '../../../public/assets/icons/email.svg';
import iconCheckmark from '../../../public/assets/icons/checkmark.svg';
import { MyCustomerChangeEmailAction } from '@commercetools/platform-sdk';
import { handleUpdateEmail } from './email-modal-verify';
import { useDispatch, useSelector } from 'react-redux';
import { IProfileState } from '../../types/interfaces';
import { changeEmail } from '../../store/reducers/profileReducer';

export interface IEmailModalProps {
  modalClass: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  token?: string;
  setClickedEmailUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IMyCustomerEmailUpdate {
  version: number;
  actions: [MyCustomerChangeEmailAction];
}

function EmailModal(props: IEmailModalProps): JSX.Element {
  const dispatch = useDispatch();
  const { email, version } = useSelector(
    (state: IProfileState) => state.profile
  );
  const [emailError, setEmailError] = useState('');
  const [emailCheck, setEmailCheck] = useState(false);
  const [checkmarkEmail, setCheckmarkEmail] = useState(true);

  const customerUpdateData: IMyCustomerEmailUpdate = {
    version: version,
    actions: [
      {
        action: 'changeEmail',
        email: email.value,
      },
    ],
  };
  const setInputAction = (
    event: React.ChangeEvent<HTMLInputElement>,
    checkErrorInput: (streetShipField: string) => string
  ): void => {
    console.log(event.target.value);
    const errorMessage = checkErrorInput(event.target.value);
    dispatch(
      changeEmail({
        value: event.target.value,
        error: errorMessage,
        isChecked: !errorMessage,
      })
    );
  };
  return (
    <div className={`${style.modal} ${props.modalClass}`}>
      <ButtonForm classNames={style.modal_close} onClick={props.onClick}>
        <img src={CloseIcon} alt="Close Modal" />
      </ButtonForm>
      <div className={style.modal_email}>
        <h4 className={style.modal_title}>Update E-mail</h4>
        <Input
          value={email.value}
          onChange={(e): void => setInputAction(e, handleLoginInputTwo)}
          clue={email.error ? email.error : 'This is required field'}
          type="email"
          placeholder="E-mail"
          classWrapper={style.email}
          classClue={
            email.error
              ? `${style.email_clue} ${style.error}`
              : style.email_clue
          }
          classInput={style.email_input}
          childrenBefore={
            <div className={style.wrapper_img}>
              <img
                className={style.wrapper_img_icon}
                src={email.isChecked ? iconCheckmark : iconEmail}
                alt="Icon"
              />
            </div>
          }
        />
      </div>
      <ButtonForm
        onClick={(): void =>
          handleUpdateEmail(
            !email.error,
            props.token ? props.token : '',
            customerUpdateData,
            props.setClickedEmailUpdate,
            props.setShowModal
          )
        }
        classNames={style.modal_button}
      >
        Confirm
      </ButtonForm>
    </div>
  );
}

export default EmailModal;
