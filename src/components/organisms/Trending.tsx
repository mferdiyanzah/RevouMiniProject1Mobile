import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { faker } from '@faker-js/faker';
import Post from '@components/molecules/Post';

interface IData {
  id: number;
  avatar: string;
  name: string;
  position: string;
  time: Date;
  title: string;
  description: string;
  label: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  shares: number;
}

const Trending = () => {
  const data: IData[] = useMemo(() => {
    // generate 100 data with faker
    return Array.from({ length: 100 }, (_, index) => ({
      id: index,
      avatar: faker.image.avatar(),
      name: faker.person.fullName(),
      position: faker.person.jobTitle(),
      time: faker.date.past(),
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      label: faker.word.noun(),
      upvotes: faker.number.int(1000),
      downvotes: faker.number.int(1000),
      comments: faker.number.int(1000),
      shares: faker.number.int(1000),
    }));
  }, []);

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Post {...item} />}
      />
    </View>
  );
};

export default Trending;

const styles = StyleSheet.create({});
