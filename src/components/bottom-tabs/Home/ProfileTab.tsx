import React, { useEffect } from 'react';
import { useHome } from '@contexts/home';
import { Image, StyleSheet, Text, View } from 'react-native';
import TYPOGRAPHY from '@constants/typography';
import COLORS from '@constants/colors';

const ProfileTab = () => {
  const { navigation } = useHome();

  useEffect(() => {
    // navigation.navigate('Login');
  }, [navigation]);

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
