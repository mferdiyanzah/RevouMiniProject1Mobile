import ContentCreationCard from '@components/molecules/ContentCreationCard';
import HomeHeader from '@components/molecules/HomeHeader';
import HomeTopTab from '@components/top-tabs/Home';
import { useApp } from '@contexts/app';
import { faker } from '@faker-js/faker';
import React, { memo, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { IData } from 'types/data';

const HomeTab = () => {
  const { setFeedData } = useApp();
  const isLoadingRef = React.useRef<boolean>(true);

  useEffect(() => {
    generateData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateData = useCallback(() => {
    console.log('generateData', new Date().toISOString());
    isLoadingRef.current = true;
    const data: IData[] = Array.from({ length: 10 }, (_, index) => ({
      id: index,
      avatar: faker.image.urlLoremFlickr({ category: 'people' }),
      name: faker.person.fullName(),
      position: faker.person.jobTitle(),
      time: faker.date.recent({ days: 3 }),
      title: faker.lorem.sentence(),
      description: faker.word.words({ count: { min: 10, max: 200 } }),
      label: faker.word.noun(),
      upvotes: faker.number.int(1000),
      downvotes: faker.number.int(1000),
      comments: faker.number.int(1000),
      shares: faker.number.int(1000),
    }));

    setFeedData(data);
    isLoadingRef.current = false;
    console.log('generateData done', new Date().toISOString());
  }, [setFeedData]);

  return (
    <View style={styles.container}>
      <HomeHeader />
      <ContentCreationCard />
      <HomeTopTab
        generateData={generateData}
        isLoading={isLoadingRef.current}
      />
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
