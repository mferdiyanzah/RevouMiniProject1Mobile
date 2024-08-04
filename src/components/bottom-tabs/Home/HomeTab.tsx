import ContentCreationCard from '@components/molecules/ContentCreationCard';
import HomeHeader from '@components/molecules/HomeHeader';
import HomeTopTab from '@components/top-tabs/Home';
import { faker } from '@faker-js/faker';
import usePostStore from '@stores/usePostStore';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IData } from 'types/data';

const HomeTab = () => {
  const { setPosts } = usePostStore();
  const [isPostLoading, setIsPostLoading] = useState<boolean>(true);

  useEffect(() => {
    generateData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateData = useCallback(() => {
    setIsPostLoading(true);
    const data: IData[] = Array.from({ length: 100 }, (_, index) => ({
      id: index,
      avatar: faker.image.urlLoremFlickr({ category: 'people' }),
      name: faker.person.fullName(),
      position: faker.person.jobTitle(),
      time: faker.date.recent({ days: 3 }),
      title: faker.lorem.sentence(),
      description: faker.word.words({ count: { min: 10, max: 200 } }),
      label: faker.word.noun(),
      upvotes: faker.number.int(10000),
      downvotes: faker.number.int(10000),
      comments: faker.number.int(10000),
      shares: faker.number.int(10000),
    }));

    setPosts(data);
    setIsPostLoading(false);
  }, [setPosts]);

  return (
    <View style={styles.container}>
      <HomeHeader />
      <ContentCreationCard />
      <HomeTopTab generateData={generateData} isLoading={isPostLoading} />
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
