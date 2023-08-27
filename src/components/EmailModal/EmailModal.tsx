import { ChangeEventHandler, ReactNode, useState } from 'react';
import style from '../EmailModal/_emailModal.module.scss';
import ButtonForm from '../shared/ButtonForm/Button';
import CloseIcon from '../../../public/assets/icons/close.svg';
import Input from '../Input/Input';
import { inputHandler } from '../../pages/verification';
import iconEmail from '../../../public/assets/icons/email.svg';

export interface IEmailModalProps {
  emailField: string;
  modalClass: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  func?: ChangeEventHandler<HTMLInputElement>;
  clue?: string;
  tooltip?: ReactNode;
  value?: string;
  max?: string;
  onfocus?: ChangeEventHandler<HTMLInputElement>;
  onblur?: ChangeEventHandler<HTMLInputElement>;
}

function EmailModal(props: IEmailModalProps): JSX.Element {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  return (
    <div className={`${style.modal} ${props.modalClass}`}>
      <ButtonForm classNames={style.modal_close} onClick={props.onClick}>
        <img src={CloseIcon} alt="Close Modal" />
      </ButtonForm>
      <div className={style.modal_email}>
        <h4 className={style.modal_title}>Update E-mail</h4>
        <Input
          value={props.emailField}
          onChange={(e): void => inputHandler(e, setEmail)}
          //   clue={emailError ? emailError : 'This is required field'}
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
                src={iconEmail}
                alt="Icon"
              />
            </div>
          }
        />
      </div>
      <ButtonForm
        onClick={(): void => console.log('gr')}
        classNames={style.modal_button}
      >
        Confirm
      </ButtonForm>
    </div>
  );
}

export default EmailModal;
