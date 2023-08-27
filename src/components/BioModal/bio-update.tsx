import { MyCustomerUpdate } from '@commercetools/platform-sdk';
import { updateCustomer } from '../../api/updateBio';
import { IMyCustomerLoginDraft } from '../../types/interfaces';

interface IMyCustomerUpdate {
  version: number;
  actions: [
    {
      action: string;
      firstName?: string;
    },
    {
      action: string;
      lastName?: string;
    },
  ];
}

export function updateBio(token: string, data: MyCustomerUpdate): void {
  updateCustomer(token, data);
}
