import { changeAnonymousCart } from '../store/reducers/cartReducer';
import { AnyAction, Dispatch } from 'redux';
import { refreshTokenFlow } from '../api/adminBuilder';
import { setAccessTokenStatus } from '../store/reducers/userReducer';

export const updateAnonAccessToken = (
  refreshToken: string,
  dispatch: Dispatch<AnyAction>
): void => {
  refreshTokenFlow(refreshToken).then((response) => {
    dispatch(
      changeAnonymousCart({ anonymousAccessToken: response.access_token })
    );
  });
};

export const updateCustomerAccessToken = (
  refreshToken: string,
  dispatch: Dispatch<AnyAction>
): void => {
  refreshTokenFlow(refreshToken).then((response) => {
    dispatch(setAccessTokenStatus(response.access_token));
  });
};
//updateAnonAccessToken(anonymousCart.anonymousRefreshToken, dispatch);
