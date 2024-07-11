import Button from '@components/atoms/Button';
import COLORS from '@constants/colors';
import TYPOGRAPHY from '@constants/typography';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

interface CarouselProps {
  data: any;
}

const Carousel: React.FC<CarouselProps> = ({ data }) => {
  const flatListRef = useRef<FlatList<string>>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ animated: true, index: nextIndex });
      setCurrentIndex(nextIndex);
    } else {
      Alert.alert('Last item reached');
      flatListRef.current?.scrollToIndex({ animated: true, index: 0 });
      setCurrentIndex(0);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: ListRenderItemInfo<any>) => (
            <View style={styles.carouselItemContainer}>
              {item.image}
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}
        />
        <View style={styles.dotContainer}>
          {data.map((_, index) => (
            <View
              key={index}
              style={
                index === currentIndex ? styles.dotActive : styles.dotDefault
              }
            />
          ))}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          label={currentIndex === data.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          width="full"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  carouselContainer: {
    flex: 1,
  },
  carouselItemContainer: {
    width: windowWidth,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    ...TYPOGRAPHY.heading.xLarge,
    color: 'black',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    flex: 1,
  },
  dotDefault: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: COLORS.gray,
    marginHorizontal: 4,
  },
  dotActive: {
    height: 8,
    width: 20,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginHorizontal: 4,
  },
});

export default Carousel;
