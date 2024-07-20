import Typography from '@components/atoms/Typography';
import COLORS from '@constants/colors';
import TYPOGRAPHY from '@constants/typography';
import { useApp } from '@contexts/app';
import { useHome } from '@contexts/home';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

const ProfileTab = () => {
  const { isLoggedIn } = useApp();
  const { navigation } = useHome();

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate('Login');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
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
