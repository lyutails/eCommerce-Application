import { updateCustomer } from '../../api/updateBio';
import {
  MyCustomerSetDateOfBirthAction,
  MyCustomerSetFirstNameAction,
  MyCustomerSetLastNameAction,
} from '@commercetools/platform-sdk';
import { IPersonalData } from '../../pages/Profile/Profile';
import { parseDateToWeb } from '../../utils/parseDate';

export interface IMyCustomerBioUpdate {
  version: number;
  actions: [
    MyCustomerSetFirstNameAction,
    MyCustomerSetLastNameAction,
    MyCustomerSetDateOfBirthAction,
  ];
}

export const handleUpdateBio = (
  firstnameСheck: boolean,
  lastnameСheck: boolean,
  birthdayСheck: boolean,
  token: string,
  data: IMyCustomerBioUpdate,
  setClickedBioUpdate: React.Dispatch<React.SetStateAction<boolean>>,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  setPersonal: React.Dispatch<React.SetStateAction<IPersonalData | null>>
): void => {
  if (firstnameСheck && lastnameСheck && birthdayСheck) {
    updateCustomer(token, data);
    setClickedBioUpdate(false);
    setShowModal(false);
    setPersonal({
      firstname: data.actions[0].firstName,
      lastname: data.actions[1].lastName,
      birthday: parseDateToWeb(data.actions[2].dateOfBirth),
    });
  }
};
