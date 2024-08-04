import Typography from '@components/atoms/Typography';
import COLORS from '@constants/colors';
import TYPOGRAPHY from '@constants/typography';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '@stores/useAuthStore';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { StackNavigation } from 'types/navigation';

const ProfileTab = () => {
  const { accessToken } = useAuthStore();
  const navigation = useNavigation<StackNavigation>();

  useEffect(() => {
    if (!accessToken) {
      navigation.navigate('Login');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!accessToken) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={require('@assets/images/coming-soon.png')} />
      <Typography style={styles.comingSoontText}>Coming Soon</Typography>
    </View>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.neutral100,
    gap: 20,
  },
  comingSoontText: {
    ...TYPOGRAPHY.heading.xxLarge,
    color: 'black',
  },
});
