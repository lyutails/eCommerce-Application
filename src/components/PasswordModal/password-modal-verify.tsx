import { changePassword } from '../../store/reducers/profileReducer';
import { updatePassword } from '../../api/changePassword';
import { IPasswordUpdateData } from './PasswordModal';
import { getCustomerToken } from '../../api/adminBuilder';

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
    !passwordUpdateData.currentError &&
    !passwordUpdateData.newError &&
    !passwordUpdateData.repeateError
  ) {
    if (
      passwordUpdateData.passwordNewField ===
      passwordUpdateData.passwordRepeatField
    ) {
      updatePassword(
        passwordUpdateData.token,
        data,
        passwordUpdateData.dispatch,
        passwordUpdateData
      )
        .then((response) => {
          if (response) {
            setClickedPasswordUpdate(false);
            setShowModal(false);
            const token = getCustomerToken(
              passwordUpdateData.login,
              passwordUpdateData.passwordNewField
            );
            return token;
          }
        })
        .then((response) => {
          localStorage.setItem('refreshToken', response.refresh_token);
        })
        .catch((error) => {
          if (error) {
            passwordUpdateData.dispatch(
              changePassword({
                currentPassword: {
                  ...passwordUpdateData.currentPassword,
                  error: true,
                },
              })
            );
          }
        });
    }
  }
};
