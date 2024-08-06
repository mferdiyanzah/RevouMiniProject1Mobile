import { Alert } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  expiredAt: string | null;
  username: string | null;
  setAccessToken: (accessToken: string) => Promise<void>;
  setRefreshToken: (refreshToken: string) => Promise<void>;
  setExpiredAt: (expiredAt: string) => Promise<void>;
  setUsername: (username: string) => Promise<void>;
  getCredentials: () => Promise<Credentials | null>;
  reset: () => Promise<void>;
}

interface Credentials {
  accessToken: string;
  refreshToken: string;
  expiredAt: string | null;
  username: string | null;
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
  USERNAME: 'username',
};

const setKeychainValue = async (service: string, value: string) => {
  try {
    await Keychain.setGenericPassword(service, value, {
      ...KEYCHAIN_OPTIONS,
      service,
    });
    return true;
  } catch (error) {
    console.error(`Error setting ${service}:`, error);
    return false;
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
    console.error(`Error getting ${service}:`, error);
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
  username: null,

  setAccessToken: async (accessToken: string) => {
    const success = await setKeychainValue(
      KEYCHAIN_SERVICE.ACCESS_TOKEN,
      accessToken,
    );
    if (success) {
      set({ accessToken });
    } else {
      Alert.alert('Error', 'Failed to set access token');
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
      Alert.alert('Error', 'Failed to set refresh token');
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
      Alert.alert('Error', 'Failed to set expiredAt');
    }
  },

  setUsername: async (username: string) => {
    const success = await setAsyncStorageValue(
      ASYNC_STORAGE_KEYS.USERNAME,
      username,
    );
    if (success) {
      set({ username });
    } else {
      Alert.alert('Error', 'Failed to set username');
    }
  },

  getCredentials: async () => {
    const accessToken = await getKeychainValue(KEYCHAIN_SERVICE.ACCESS_TOKEN);
    const refreshToken = await getKeychainValue(KEYCHAIN_SERVICE.REFRESH_TOKEN);
    const expiredAt = await getAsyncStorageValue(ASYNC_STORAGE_KEYS.EXPIRED_AT);
    const username = await getAsyncStorageValue(ASYNC_STORAGE_KEYS.USERNAME);

    if (accessToken && refreshToken) {
      const credentials = { accessToken, refreshToken, expiredAt, username };
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
      console.error('Error resetting Keychain:', error);
      errors.push('Keychain reset failed');
    }

    try {
      await AsyncStorage.multiRemove([
        ASYNC_STORAGE_KEYS.EXPIRED_AT,
        ASYNC_STORAGE_KEYS.USERNAME,
      ]);
    } catch (error) {
      console.error('Error resetting AsyncStorage:', error);
      errors.push('AsyncStorage reset failed');
    }

    set({
      accessToken: null,
      refreshToken: null,
      expiredAt: null,
      username: null,
    });

    if (errors.length > 0) {
      Alert.alert('Warning', `Some resets failed: ${errors.join(', ')}`);
    } else {
      Alert.alert('Success', 'All credentials reset successfully');
    }
  },
}));

export default useAuthStore;
