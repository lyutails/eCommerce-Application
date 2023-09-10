import { updateCustomer } from '../../api/updateBio';
import {
  MyCustomerSetDateOfBirthAction,
  MyCustomerSetFirstNameAction,
  MyCustomerSetLastNameAction,
} from '@commercetools/platform-sdk';
import { IPersonalData } from '../../pages/Profile/Profile';
import { parseDateToWeb } from '../../utils/parseDate';
import { IBioUpdateData } from './BioModal';
import { changeVersion } from '../../store/reducers/profileReducer';
import { Dispatch } from 'react';
import { AnyAction } from 'redux';

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
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: Dispatch<AnyAction>
): void => {
  if (
    updateBioData.firstnameError &&
    updateBioData.lastnameError &&
    updateBioData.birthdayError
  ) {
    updateCustomer(updateBioData.token, data)
      .then((response) => {
        if (response) {
          alert('Personal information change was successful');
          dispatch(changeVersion(response.body.version));
        }
      })
      .catch((error) => {
        if (error) {
          alert('Personal information change was failed');
        }
      });
    setClickedBioUpdate(false);
    setShowModal(false);
  }
};
