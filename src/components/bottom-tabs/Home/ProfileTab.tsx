import React, { useEffect } from 'react';
import { useHome } from '@contexts/home';
import { Image, StyleSheet, Text, View } from 'react-native';
import TYPOGRAPHY from '@constants/typography';
import COLORS from '@constants/colors';
import { useApp } from '@contexts/app';

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
      <Text style={styles.comingSoontText}>Coming Soon</Text>
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
