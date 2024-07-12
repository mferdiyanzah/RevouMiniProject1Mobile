import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Typography from './Typography';

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
      <Typography type="heading" size="xLarge">
        {data.title}
      </Typography>
      <Typography type="paragraph" size="medium" style={styles.description}>
        {data.description}
      </Typography>
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
  description: {
    textAlign: 'center',
  },
});
