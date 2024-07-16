import Icon from '@components/atoms/Icon';
import React, { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../../assets/images/logo-full.png')} />
      </View>
      <Icon variant="bell" />
    </View>
  );
};

export default memo(HomeHeader);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    height: 'auto',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 24,
    backgroundColor: 'white',
  },
  imageContainer: {
    flex: 1,
  },
});
