import { ChangeEventHandler, ReactNode, useEffect, useState } from 'react';
import style from '../EmailModal/_emailModal.module.scss';
import ButtonForm from '../shared/ButtonForm/Button';
import CloseIcon from '../../../public/assets/icons/close.svg';
import Input from '../Input/Input';
import { handleLoginInput, inputHandler } from '../../pages/verification';
import iconEmail from '../../../public/assets/icons/email.svg';
import iconCheckmark from '../../../public/assets/icons/checkmark.svg';
import { MyCustomerChangeEmailAction } from '@commercetools/platform-sdk';
import { handleUpdateEmail } from './email-modal-verify';

export interface IEmailModalProps {
  emailField: string;
  modalClass: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  version: number;
  token?: string;
  setClickedEmailUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPersonal: React.Dispatch<React.SetStateAction<string>>;
}

export interface IMyCustomerEmailUpdate {
  version: number;
  actions: [MyCustomerChangeEmailAction];
}

function EmailModal(props: IEmailModalProps): JSX.Element {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailCheck, setEmailCheck] = useState(false);
  const [checkmarkEmail, setCheckmarkEmail] = useState(true);

  useEffect(() => {
    setEmail(props.emailField);
  }, [props.emailField]);

  const customerUpdateData: IMyCustomerEmailUpdate = {
    version: props.version,
    actions: [
      {
        action: 'changeEmail',
        email: email,
      },
    ],
  };
  return (
    <div className={`${style.modal} ${props.modalClass}`}>
      <ButtonForm classNames={style.modal_close} onClick={props.onClick}>
        <img src={CloseIcon} alt="Close Modal" />
      </ButtonForm>
      <div className={style.modal_email}>
        <h4 className={style.modal_title}>Update E-mail</h4>
        <Input
          value={email}
          onblur={(): void =>
            setEmailCheck(
              handleLoginInput(
                email,
                setEmailError,
                emailCheck,
                setCheckmarkEmail
              )
            )
          }
          onChange={(e): void => inputHandler(e, setEmail)}
          clue={emailError ? emailError : 'This is required field'}
          type="email"
          placeholder="E-mail"
          classWrapper={style.email}
          classClue={
            emailError ? `${style.email_clue} ${style.error}` : style.email_clue
          }
          classInput={style.email_input}
          childrenBefore={
            <div className={style.wrapper_img}>
              <img
                className={style.wrapper_img_icon}
                src={checkmarkEmail ? iconCheckmark : iconEmail}
                alt="Icon"
              />
            </div>
          }
        />
      </div>
      <ButtonForm
        onClick={(): void =>
          handleUpdateEmail(
            emailCheck,
            props.token ? props.token : '',
            customerUpdateData,
            props.setClickedEmailUpdate,
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

export default EmailModal;
