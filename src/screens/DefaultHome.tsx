import ContentCreationCard from '@components/organisms/ContentCreationCard';
import HomeHeader from '@components/organisms/HomeHeader';
import React from 'react';
import { View } from 'react-native';

const DefaultHome = () => {
  return (
    <View>
      <HomeHeader />
      <ContentCreationCard />
    </View>
  );
};

export default DefaultHome;
