import COLORS from '@constants/colors';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface ILoaderProps {
  isLoading: boolean;
}

const Loader = ({ isLoading }: ILoaderProps) => {
  if (!isLoading) {
    return null;
  }

  return (
    <View style={styles.loadingOverlay}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.neutral100,
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
