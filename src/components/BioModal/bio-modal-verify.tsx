import { updateCustomer } from '../../api/updateBio';
import {
  MyCustomerSetDateOfBirthAction,
  MyCustomerSetFirstNameAction,
  MyCustomerSetLastNameAction,
} from '@commercetools/platform-sdk';
import { IPersonalData } from '../../pages/Profile/Profile';
import { parseDateToWeb } from '../../utils/parseDate';
import { IBioUpdateData } from './BioModal';

export interface IMyCustomerBioUpdate {
  version: number;
  actions: [
    MyCustomerSetFirstNameAction,
    MyCustomerSetLastNameAction,
    MyCustomerSetDateOfBirthAction,
  ];
}

export const handleUpdateBio = (
  updateBioData: IBioUpdateData,
  data: IMyCustomerBioUpdate,
  setClickedBioUpdate: React.Dispatch<React.SetStateAction<boolean>>,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  if (
    updateBioData.firstnameError &&
    updateBioData.lastnameError &&
    updateBioData.birthdayError
  ) {
    updateCustomer(updateBioData.token, data);
    setClickedBioUpdate(false);
    setShowModal(false);
  }
};
