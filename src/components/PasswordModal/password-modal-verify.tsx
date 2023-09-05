import {
  changePassword,
  changeVersion,
} from '../../store/reducers/profileReducer';
import { updatePassword } from '../../api/changePassword';
import { IPasswordUpdateData } from './PasswordModal';
import { getCustomerToken } from '../../api/adminBuilder';
import { setRefreshTokenStatus } from '../../store/reducers/userReducer';

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
      console.log(data.version, 'password');
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
            passwordUpdateData.dispatch(changeVersion(response.body.version));
            return token;
          }
        })
        .then((response) => {
          console.log(response);
          localStorage.setItem('refreshToken', response.refresh_token);
          passwordUpdateData.dispatch(
            setRefreshTokenStatus(response.refresh_token)
          );
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
