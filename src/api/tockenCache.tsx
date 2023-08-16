/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import {
  TokenCache,
  TokenCacheOptions,
  TokenStore,
} from '@commercetools/sdk-client-v2';

class MyTokenCache implements TokenCache {
  public TokenStore: {
    token: string;
    expirationTime: number;
    refreshToken?: string | undefined;
  };
  constructor() {
    this.TokenStore = {
      token: '',
      expirationTime: 0,
      refreshToken: 'string | undefined',
    };
  }
  get(tokenCacheOptions?: TokenCacheOptions): {
    token: string;
    expirationTime: number;
    refreshToken?: string | undefined;
  } {
    return this.TokenStore;
  }

  set(cache: TokenStore, tokenCacheOptions?: TokenCacheOptions): void {
    this.TokenStore = cache;
  }
}

export default MyTokenCache;
