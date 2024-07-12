import Carousel from '@components/molecules/Carousel';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { RootStackParamList } from 'types/navigation';

const Onboarding = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Onboarding'>) => {
  const carouselItems = useMemo(
    () => [
      {
        id: 1,
        title: 'Connect',
        description:
          'Dapatkan akses ke investor profesional terpercaya dan mulai investasi bareng teman dan komunitas',
        image: (
          <Image
            source={require('../assets/images/connect.png')}
            width={100}
            height={100}
          />
        ),
      },
      {
        id: 2,
        title: 'Learn',
        description:
          'Dapatkan ide investasi dan informasi terpercaya langsung dari ahlinya biarkamu makin jago dan makin cuan!',
        image: <Image source={require('../assets/images/learn.png')} />,
      },
      {
        id: 3,
        title: 'Invest',
        description:
          'Atur portfolio kamu dan langsung berinvestasi dengan mudah dengan beragam pilihan aset',
        image: <Image source={require('../assets/images/invest.png')} />,
      },
    ],
    [],
  );

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Carousel data={carouselItems} goToLogin={goToLogin} />
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
