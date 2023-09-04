import { updateCustomer } from '../../api/updateBio';
import { IMyCustomerEmailUpdate } from './EmailModal';

export const handleUpdateEmail = (
  emailCheck: boolean,
  token: string,
  data: IMyCustomerEmailUpdate,
  setClickedEmailUpdate: React.Dispatch<React.SetStateAction<boolean>>,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  if (emailCheck) {
    updateCustomer(token, data);
    setClickedEmailUpdate(false);
    setShowModal(false);
  }
};
