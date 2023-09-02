import { updatePassword } from '../../api/changePassword';

export interface IMyCustomerPasswordUpdate {
  version: number;
  currentPassword: string;
  newPassword: string;
}

export const handleUpdatePassword = (
  passwordCurrentСheck: boolean,
  passwordNewСheck: boolean,
  passwordRepeatСheck: boolean,
  token: string,
  data: IMyCustomerPasswordUpdate,
  setClickedPasswordUpdate: React.Dispatch<React.SetStateAction<boolean>>,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  passwordNew: string,
  passwordRepeat: string
): void => {
  if (passwordCurrentСheck && passwordNewСheck && passwordRepeatСheck) {
    if (passwordNew === passwordRepeat) {
      updatePassword(token, data);
      setClickedPasswordUpdate(false);
      setShowModal(false);
    }
  }
};
