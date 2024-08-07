import Button from '@components/atoms/Button';
import Loader from '@components/atoms/Loader';
import COLORS from '@constants/colors';
import TYPOGRAPHY from '@constants/typography';
import useLogout from '@hooks/mutations/useLogout';
import analytics from '@react-native-firebase/analytics';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '@stores/useAuthStore';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { StackNavigation } from 'types/navigation';

const ProfileTab = () => {
  const { accessToken, reset, profile } = useAuthStore();
  const navigation = useNavigation<StackNavigation>();

  const { mutateAsync: logout } = useLogout();

  const [isLogoutProcessing, setIsLogoutProcessing] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      navigation.navigate('Login');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReset = useCallback(async () => {
    setIsLogoutProcessing(true);
    await logout()
      .then(async () => {
        await analytics().logEvent('click_logout', {
          username: profile?.username,
        });
        await reset();
        setIsLogoutProcessing(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      })
      .catch(error => {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      })
      .finally(() => setIsLogoutProcessing(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  if (!accessToken) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          size="large"
          label="Logout"
          variant="primary"
          onPress={handleReset}
        />
      </View>
      <Loader isLoading={isLogoutProcessing} />
    </View>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral100,
    width: '100%',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  comingSoontText: {
    ...TYPOGRAPHY.heading.xxLarge,
    color: 'black',
  },
});
