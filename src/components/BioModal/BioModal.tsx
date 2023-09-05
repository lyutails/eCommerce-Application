import style from '../BioModal/_bioModal.module.scss';
import ButtonForm from '../shared/ButtonForm/Button';
import CloseIcon from '../../../public/assets/icons/close.svg';
import Input from '../Input/Input';
import {
  handleBirthdayInputTwo,
  handleFirstnameInputTwo,
  handleLastnameInputTwo,
} from '../../pages/verification';
import InputBirthDateMask from '../Input/InputBirthDateMask';
import { handleUpdateBio, IMyCustomerBioUpdate } from './bio-modal-verify';
import iconCheckmark from '../../../public/assets/icons/checkmark.svg';
import { parseDateToServer } from '../../utils/parseDate';
import { useDispatch, useSelector } from 'react-redux';
import { IProfileState, IRootState } from '../../types/interfaces';
import { changeBio } from '../../store/reducers/profileReducer';

export interface IBioModalProps {
  modalClass: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  token?: string;
  setClickedBioUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IBioUpdateData {
  firstnameError: boolean;
  lastnameError: boolean;
  birthdayError: boolean;
  token: string;
}

function BioModal(props: IBioModalProps): JSX.Element {
  const dispatch = useDispatch();
  const { version, bio } = useSelector((state: IProfileState) => state.profile);
  const { refreshToken } = useSelector((state: IRootState) => state.user);
  // const [token, setToken] = useState('');

  // useEffect(() => {
  //   setToken(props.token ? props.token : '');
  // }, [props.token]);

  const customerUpdateData: IMyCustomerBioUpdate = {
    version: version,
    actions: [
      {
        action: 'setFirstName',
        firstName: bio.firstname.value,
      },
      {
        action: 'setLastName',
        lastName: bio.lastname.value,
      },
      {
        action: 'setDateOfBirth',
        dateOfBirth: parseDateToServer(bio.birthday.value),
      },
    ],
  };
  const setInputAction = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    checkErrorInput: (streetShipField: string) => string
  ): void => {
    const errorMessage = checkErrorInput(event.target.value);
    dispatch(
      changeBio({
        [fieldName]: {
          value: event.target.value,
          error: errorMessage,
          isChecked: !errorMessage,
        },
      })
    );
  };

  const setInputBirthdayAction = (
    value: string,
    fieldName: string,
    checkErrorInput: (streetShipField: string) => string
  ): void => {
    const errorMessage = checkErrorInput(value);
    dispatch(
      changeBio({
        [fieldName]: {
          value: value,
          error: errorMessage,
          isChecked: !errorMessage,
        },
      })
    );
  };
  const updateBioData: IBioUpdateData = {
    firstnameError: !bio.firstname.error,
    lastnameError: !bio.lastname.error,
    birthdayError: !bio.birthday.error,
    token: refreshToken,
  };
  console.log(refreshToken);
  return (
    <div className={`${style.modal} ${props.modalClass}`}>
      <ButtonForm classNames={style.modal_close} onClick={props.onClick}>
        <img src={CloseIcon} alt="Close Modal" />
      </ButtonForm>
      <div className={style.modal_bio}>
        <h4 className={style.modal_title}>Firstname</h4>
        <Input
          value={bio.firstname.value}
          onChange={(e): void =>
            setInputAction(e, 'firstname', handleFirstnameInputTwo)
          }
          type="text"
          clue={
            bio.firstname.error ? bio.firstname.error : 'This is required field'
          }
          placeholder="First name *"
          classWrapper={style.firstname}
          classClue={
            bio.firstname.error
              ? `${style.completed} ${style.error}`
              : style.uncompleted
          }
          classInput={style.firstname_input}
          childrenBefore={
            <div
              className={
                bio.firstname.isChecked
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
          value={bio.lastname.value}
          onChange={(e): void =>
            setInputAction(e, 'lastname', handleLastnameInputTwo)
          }
          type="text"
          clue={
            bio.lastname.error ? bio.lastname.error : 'This is required field'
          }
          placeholder="Last name *"
          classWrapper={style.lastname}
          classClue={
            bio.lastname.error
              ? `${style.completed} ${style.error}`
              : style.uncompleted
          }
          classInput={style.lastname_input}
          childrenBefore={
            <div
              className={
                bio.lastname.isChecked
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
          value={bio.birthday.value}
          onAccept={(value: string): void => {
            setInputBirthdayAction(value, 'birthday', handleBirthdayInputTwo);
          }}
          clue={
            bio.birthday.error
              ? bio.birthday.error
              : `Enter Date of birth in format DD.MM.YYYY. Your age should be equal or more than 13 to register`
          }
          type="text"
          placeholder="dd.mm.yyyy *"
          classWrapper={style.birth}
          classClue={
            bio.birthday.error
              ? `${style.completed} ${style.error}`
              : style.uncompleted
          }
          classInput={style.birth_input}
          childrenBefore={
            <div
              className={
                bio.birthday.isChecked
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
            updateBioData,
            customerUpdateData,
            props.setClickedBioUpdate,
            props.setShowModal,
            dispatch
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
