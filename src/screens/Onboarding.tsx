import Button from '@components/atoms/Button';
import Carousel from '@components/organisms/Carousel';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import OnboardingConnect from '../assets/images/onboarding-connect.svg';
import OnboardingLearn from '../assets/images/onboarding-learn.svg';

const Onboarding = () => {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  const carouselItems = [
    {
      title: 'Connect',
      description:
        'Dapatkan akses ke investor profesional terpercaya dan mulai investasi bareng teman dan komunitas',
      image: <OnboardingConnect />,
    },
    {
      title: 'Learn',
      description:
        'Dapatkan ide investasi dan informasi terpercaya langsung dari ahlinya biarkamu makin jago dan makin cuan!',
      image: <OnboardingLearn />,
    },
    {
      title: 'Invest',
      description:
        'Atur portfolio kamu dan langsung berinvestasi dengan mudah dengan beragam pilihan aset',
      image: <OnboardingConnect />,
    },
  ];

  const onNextPress = () => {
    const nextIndex =
      currentCarouselIndex + 1 > carouselItems.length - 1
        ? 0
        : currentCarouselIndex + 1;
    setCurrentCarouselIndex(nextIndex);
  };

  return (
    <View style={styles.container}>
      <Carousel items={carouselItems} currentIndex={currentCarouselIndex} />
      <Button
        width="full"
        label={currentCarouselIndex === 2 ? 'Get Started' : 'Next'}
        onPress={onNextPress}
      />
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 44,
    backgroundColor: 'white',
  },
});
