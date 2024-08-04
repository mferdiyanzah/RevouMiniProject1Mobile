import * as Keychain from 'react-native-keychain';
import { create } from 'zustand';

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  getCredentials: () => Promise<Credentials | null>;
  reset: () => void;
}

interface Credentials {
  accessToken: string;
  refreshToken: string;
}

const options: Keychain.Options = {
  storage: Keychain.STORAGE_TYPE.AES,
  accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
  accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
};

const useAuthStore = create<AuthStore>(set => ({
  accessToken: null,
  refreshToken: null,
  setAccessToken: async (accessToken: string) => {
    try {
      const accessTokenOptions = {
        ...options,
        service: 'accessToken',
      };
      await Keychain.setGenericPassword(
        'accessToken',
        accessToken,
        accessTokenOptions,
      ).then(() => console.log('set access token'));
      set({ accessToken });
    } catch (error) {
      console.error('Failed to set access token:', error);
    }
  },
  setRefreshToken: async (refreshToken: string) => {
    try {
      const refreshTokenOptions = {
        ...options,
        service: 'refreshToken',
      };
      await Keychain.setGenericPassword(
        'refreshToken',
        refreshToken,
        refreshTokenOptions,
      ).then(() => console.log('set refresh token'));
      set({ refreshToken });
    } catch (error) {
      console.error('Failed to set refresh token:', error);
    }
  },
  getCredentials: async () => {
    try {
      const refreshTokenOptions = {
        ...options,
        service: 'refreshToken',
      };
      const credentialRefreshToken = await Keychain.getGenericPassword(
        refreshTokenOptions,
      );

      const accessTokenOptions = {
        ...options,
        service: 'accessToken',
      };
      const credentialAccessToken = await Keychain.getGenericPassword(
        accessTokenOptions,
      );

      if (credentialRefreshToken && credentialAccessToken) {
        const credentials = {
          refreshToken: credentialRefreshToken.password,
          accessToken: credentialAccessToken.password,
        };

        console.log('get credentials', credentials);

        set(credentials);
        return credentials;
      }
      return null;
    } catch (error) {
      return null;
    }
  },
  reset: async () => {
    try {
      await Keychain.resetGenericPassword();
      set({ accessToken: null, refreshToken: null });
    } catch (error) {
      console.error('Failed to reset tokens:', error);
    }
  },
}));

export default useAuthStore;