import {
  AddressDraft,
  MyCustomerAddAddressAction,
  MyCustomerAddBillingAddressIdAction,
  MyCustomerAddShippingAddressIdAction,
  MyCustomerChangeAddressAction,
  MyCustomerSetDateOfBirthAction,
  MyCustomerSetDefaultBillingAddressAction,
  MyCustomerSetDefaultShippingAddressAction,
  MyCustomerSetFirstNameAction,
  MyCustomerSetLastNameAction,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
import { IPersonalData } from '../../pages/Profile/Profile';
import { parseDateToWeb } from '../../utils/parseDate';
import { useDispatch, useSelector } from 'react-redux';
import {
  IAddAddressData,
  IAddAddressStatusData,
  IAddressUpdateData,
  IChangeAddressData,
} from './AddressModal';
import { updateCustomer } from '../../api/updateBio';
import { AnyAction, Dispatch } from 'redux';
import {
  changeAddress,
  changeVersion,
} from '../../store/reducers/profileReducer';

export interface IMyCustomerAddressUpdate {
  version: number;
  actions: [
    MyCustomerChangeAddressAction,
    MyCustomerSetDefaultShippingAddressAction?,
    MyCustomerSetDefaultBillingAddressAction?,
    MyCustomerAddShippingAddressIdAction?,
    MyCustomerAddBillingAddressIdAction?,
  ];
}

export const handleUpdateAddress = (
  updateAddressData: IAddressUpdateData,
  setClickedAddressUpdate: React.Dispatch<React.SetStateAction<boolean>>,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  data: IAddAddressData | IChangeAddressData,
  dispatch: Dispatch<AnyAction>,
  addStatusAddress: (id: string) => IAddAddressStatusData,
  isAdd: boolean,
  version: number
): void => {
  if (
    updateAddressData.streetError &&
    updateAddressData.buildingError &&
    updateAddressData.cityError &&
    updateAddressData.apartmentError &&
    updateAddressData.postalError &&
    updateAddressData.countryError
  ) {
    if (isAdd) {
      console.log(data.version, 'add');
      updateCustomer(updateAddressData.token, data as MyCustomerUpdate).then(
        (response) => {
          const id = response?.body.addresses.filter(
            (item) => item.key === `address${version}`
          );
          if (id && typeof id[0]?.id == 'string') {
            const addAddressStatusData = addStatusAddress(id[0]?.id);
            updateCustomer(
              updateAddressData.token,
              addAddressStatusData as MyCustomerUpdate
            ).then((response) => {
              if (response) {
                dispatch(
                  changeAddress({
                    addressStore: response.body.addresses,
                    defaultShippingId: response.body.defaultShippingAddressId,
                    defaultBillingId: response.body.defaultBillingAddressId,
                    shippingAddressesId: response.body.shippingAddressIds,
                    billingAddressesId: response.body.billingAddressIds,
                  })
                );
                dispatch(changeVersion(response.body.version));
              }
            });
          }
        }
      );
    } else {
      console.log(data.version, 'update');
      updateCustomer(updateAddressData.token, data as MyCustomerUpdate).then(
        (response) => {
          if (response) {
            dispatch(
              changeAddress({
                addressStore: response.body.addresses,
                defaultShippingId: response.body.defaultShippingAddressId,
                defaultBillingId: response.body.defaultBillingAddressId,
                shippingAddressesId: response.body.shippingAddressIds,
                billingAddressesId: response.body.billingAddressIds,
              })
            );
            dispatch(changeVersion(response.body.version));
          }
        }
      );
    }
    setClickedAddressUpdate(false);
    setShowModal(false);
  }
};
