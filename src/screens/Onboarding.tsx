import Carousel from '@components/organisms/Carousel';
import React, { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Onboarding = () => {
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

  return (
    <View style={styles.container}>
      <Carousel data={carouselItems} />
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
