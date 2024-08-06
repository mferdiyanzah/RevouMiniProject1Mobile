import ContentCreationCard from '@components/molecules/ContentCreationCard';
import HomeHeader from '@components/molecules/HomeHeader';
import HomeTopTab from '@components/top-tabs/Home';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

const HomeTab = () => {
  return (
    <View style={styles.container}>
      <HomeHeader />
      <ContentCreationCard />
      <HomeTopTab />
    </View>
  );
};

export default memo(HomeTab);

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
