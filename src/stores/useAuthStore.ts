import { UserProfile } from '@hooks/mutations/useLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { create } from 'zustand';

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  expiredAt: string | null;
  profile: UserProfile | null;
  setAccessToken: (accessToken: string) => Promise<void>;
  setRefreshToken: (refreshToken: string) => Promise<void>;
  setExpiredAt: (expiredAt: string) => Promise<void>;
  setProfile: (profile: UserProfile) => Promise<void>;
  getCredentials: () => Promise<Credentials | null>;
  reset: () => Promise<void>;
}

interface Credentials {
  accessToken: string;
  refreshToken: string;
  expiredAt: string | null;
  profile: string | null;
}

const KEYCHAIN_OPTIONS: Keychain.Options = {
  storage: Keychain.STORAGE_TYPE.AES,
  accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
  accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
};

const KEYCHAIN_SERVICE = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
};

const ASYNC_STORAGE_KEYS = {
  EXPIRED_AT: 'expiredAt',
  PROFILE: 'profile',
};

const setKeychainValue = async (service: string, value: string) => {
  try {
    await Keychain.setGenericPassword(service, value, {
      ...KEYCHAIN_OPTIONS,
      service,
    });
    return true;
  } catch (error) {
    if (error instanceof Error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
      return false;
    }
  }
};

const getKeychainValue = async (service: string): Promise<string | null> => {
  try {
    const credential = await Keychain.getGenericPassword({
      ...KEYCHAIN_OPTIONS,
      service,
    });
    return credential ? credential.password : null;
  } catch (error) {
    if (error instanceof Error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
      return null;
    }

    return null;
  }
};

const setAsyncStorageValue = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
};

const getAsyncStorageValue = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    return null;
  }
};

const useAuthStore = create<AuthStore>(set => ({
  accessToken: null,
  refreshToken: null,
  expiredAt: null,
  profile: null,

  setAccessToken: async (accessToken: string) => {
    const success = await setKeychainValue(
      KEYCHAIN_SERVICE.ACCESS_TOKEN,
      accessToken,
    );
    if (success) {
      set({ accessToken });
    } else {
      ToastAndroid.show('Failed to set access token', ToastAndroid.SHORT);
    }
  },

  setRefreshToken: async (refreshToken: string) => {
    const success = await setKeychainValue(
      KEYCHAIN_SERVICE.REFRESH_TOKEN,
      refreshToken,
    );
    if (success) {
      set({ refreshToken });
    } else {
      ToastAndroid.show('Failed to set refresh token', ToastAndroid.SHORT);
    }
  },

  setExpiredAt: async (expiredAt: string) => {
    const success = await setAsyncStorageValue(
      ASYNC_STORAGE_KEYS.EXPIRED_AT,
      expiredAt,
    );
    if (success) {
      set({ expiredAt });
    } else {
      ToastAndroid.show('Failed to set expiredAt', ToastAndroid.SHORT);
    }
  },

  setProfile: async (profile: UserProfile) => {
    const success = await setAsyncStorageValue(
      ASYNC_STORAGE_KEYS.PROFILE,
      JSON.stringify(profile),
    );
    if (success) {
      set({ profile });
    } else {
      ToastAndroid.show('Failed to set profile', ToastAndroid.SHORT);
    }
  },

  getCredentials: async () => {
    const accessToken = await getKeychainValue(KEYCHAIN_SERVICE.ACCESS_TOKEN);
    const refreshToken = await getKeychainValue(KEYCHAIN_SERVICE.REFRESH_TOKEN);
    const expiredAt = await getAsyncStorageValue(ASYNC_STORAGE_KEYS.EXPIRED_AT);
    const profile = await getAsyncStorageValue(ASYNC_STORAGE_KEYS.PROFILE);

    if (accessToken && refreshToken) {
      const credentials = {
        accessToken,
        refreshToken,
        expiredAt,
        profile: JSON.parse(profile as string),
      };
      set(credentials);
      return credentials;
    }
    return null;
  },

  reset: async () => {
    let errors = [];

    // Reset Keychain values
    try {
      await Keychain.resetGenericPassword({
        service: KEYCHAIN_SERVICE.ACCESS_TOKEN,
      });
      await Keychain.resetGenericPassword({
        service: KEYCHAIN_SERVICE.REFRESH_TOKEN,
      });
    } catch (error) {
      errors.push('Keychain reset failed');
    }

    try {
      await AsyncStorage.multiRemove([
        ASYNC_STORAGE_KEYS.EXPIRED_AT,
        ASYNC_STORAGE_KEYS.PROFILE,
      ]);
    } catch (error) {
      errors.push('AsyncStorage reset failed');
    }

    set({
      accessToken: null,
      refreshToken: null,
      expiredAt: null,
      profile: null,
    });

    if (errors.length > 0) {
      ToastAndroid.show(errors.join(', '), ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(
        'All credentials reset successfully',
        ToastAndroid.SHORT,
      );
    }
  },
}));

export default useAuthStore;
