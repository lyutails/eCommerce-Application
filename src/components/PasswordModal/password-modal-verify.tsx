import { updatePassword } from '../../api/changePassword';
import { IPasswordUpdateData } from './PasswordModal';

export interface IMyCustomerPasswordUpdate {
  version: number;
  currentPassword: string;
  newPassword: string;
}

export const handleUpdatePassword = (
  passwordUpdateData: IPasswordUpdateData,
  data: IMyCustomerPasswordUpdate,
  setClickedPasswordUpdate: React.Dispatch<React.SetStateAction<boolean>>,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  if (
    passwordUpdateData.currentError &&
    passwordUpdateData.newError &&
    passwordUpdateData.repeateError
  ) {
    console.log('here we are');
    if (
      passwordUpdateData.passwordNewField ===
      passwordUpdateData.passwordRepeatField
    ) {
      updatePassword(passwordUpdateData.token, data)
        .then(() => {
          setClickedPasswordUpdate(false);
          setShowModal(false);
        })
        .catch(() => {});
    }
  }
};
