import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TYPOGRAPHY from '@constants/typography';

const { width: windowWidth } = Dimensions.get('window');

interface CarouselItemProps {
  title: string;
  description: string;
  image: React.ReactNode;
}

const CarouselItem = ({ data }: { data: CarouselItemProps }) => {
  return (
    <View style={styles.container}>
      {data.image}
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.description}>{data.description}</Text>
    </View>
  );
};

export default CarouselItem;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
    flex: 1,
  },
  title: {
    ...TYPOGRAPHY.heading.xLarge,
    color: 'black',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});
