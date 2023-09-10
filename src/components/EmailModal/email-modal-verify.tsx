import { changeVersion } from '../../store/reducers/profileReducer';
import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { updateCustomer } from '../../api/updateBio';
import { IMyCustomerEmailUpdate } from './EmailModal';

export const handleUpdateEmail = (
  emailCheck: boolean,
  token: string,
  data: IMyCustomerEmailUpdate,
  setClickedEmailUpdate: React.Dispatch<React.SetStateAction<boolean>>,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: Dispatch<AnyAction>
): void => {
  if (emailCheck) {
    updateCustomer(token, data)
      .then((response) => {
        if (response) {
          alert('Email change was successful');
          dispatch(changeVersion(response.body.version));
        }
      })
      .catch((error) => {
        if (error) {
          alert('Email change was failed');
        }
      });
    setClickedEmailUpdate(false);
    setShowModal(false);
  }
};
