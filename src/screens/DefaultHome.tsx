import ContentCreationCard from '@components/organisms/ContentCreationCard';
import FeedsTabLayout from '@components/organisms/FeedsTabLayout';
import HomeHeader from '@components/organisms/HomeHeader';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const DefaultHome = () => {
  return (
    <View style={styles.container}>
      <HomeHeader />
      <ContentCreationCard />
      <FeedsTabLayout />
    </View>
  );
};

export default DefaultHome;

const styles = StyleSheet.create({
  topTabContainer: {
    backgroundColor: 'powderblue',
    flex: 1,
    borderWidth: 1,
  },
  container: {
    flex: 1,
  },
});
