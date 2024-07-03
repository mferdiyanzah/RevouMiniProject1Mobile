import { Animated, StyleSheet, Text, TextStyle, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import TYPOGRAPHY from '@constants/typography';
import COLORS from '@constants/colors';

const CarouselItem = ({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: JSX.Element;
}) => {
  const descriptionStyle = [
    TYPOGRAPHY.paragraph.medium as TextStyle,
    styles.description,
  ];

  return (
    <View style={styles.carouselContainer}>
      {image}
      <Text style={TYPOGRAPHY.heading.xLarge as TextStyle}>{title}</Text>
      <Text style={descriptionStyle}>{description}</Text>
    </View>
  );
};

const Carousel = ({
  items,
  currentIndex,
}: {
  items: { title: string; description: string; image: JSX.Element }[];
  currentIndex: number;
}) => {
  const animatedValues = useRef(items.map(() => new Animated.Value(8))).current;

  useEffect(() => {
    Animated.parallel(
      animatedValues.map((val, index) =>
        Animated.timing(val, {
          toValue: index === currentIndex ? 16 : 8, // Target size
          duration: 500, // Animation duration
          useNativeDriver: false, // Use native driver for better performance
        }),
      ),
    ).start();
  }, [currentIndex, animatedValues]);

  const dotStyle = (index: number) => ({
    ...styles.dot,
    backgroundColor: index === currentIndex ? COLORS.primary : COLORS.secondary,
    width: animatedValues[index],
  });

  return (
    <View style={styles.container}>
      <CarouselItem
        title={items[currentIndex].title}
        description={items[currentIndex].description}
        image={items[currentIndex].image}
      />
      <View style={styles.dotContainer}>
        {items.map((_, index) => (
          <Animated.View key={index} style={dotStyle(index)} />
        ))}
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    // flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginBottom: 24,
  },
  description: {
    textAlign: 'center',
    color: 'black',
  },
  dotContainer: {
    flexDirection: 'row',
  },
  dot: {
    height: 8,
    borderRadius: 5,
    margin: 5,
  },
});
