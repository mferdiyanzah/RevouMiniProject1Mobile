import Button from '@components/atoms/Button';
import CarouselItem from '@components/atoms/CarouselItem';
import COLORS from '@constants/colors';
import React, { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from 'react-native';

interface CarouselProps {
  data: any;
  goToLogin: () => void;
}

const { width } = Dimensions.get('window');

const Carousel: React.FC<CarouselProps> = ({ data, goToLogin }) => {
  const flatListRef = useRef<FlatList<any>>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNext = useCallback(() => {
    const isLastIndex = currentIndex === data.length - 1;

    if (!isLastIndex) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ animated: true, index: nextIndex });
      setCurrentIndex(nextIndex);
    } else {
      goToLogin();
    }
  }, [currentIndex, data.length, goToLogin]);

  const renderCarouselItem = useCallback(
    ({ item }: ListRenderItemInfo<any>) => {
      return <CarouselItem data={item} />;
    },
    [],
  );

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const contentOffsetX = event.nativeEvent.contentOffset.x;
      const newIndex = Math.round(contentOffsetX / width);
      setCurrentIndex(newIndex);
    },
    [],
  );

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
          renderItem={renderCarouselItem}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
        />
        <View style={styles.dotContainer}>
          {data.map((_: any, index: any) => (
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
    paddingVertical: 44,
  },
  item: {
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
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
    flex: 12,
    width: width,
  },
  buttonContainer: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
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
