import Post from '@components/atoms/Post';
import { useApp } from '@contexts/app';
import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

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

const RenderItem = ({
  item,
  isLastIndex,
}: {
  item: IData;
  isLastIndex: boolean;
}) => {
  return (
    <View>
      <Post {...item} />
      {isLastIndex && (
        <View style={styles.lastItemContainer}>
          <Text>Semua feed sudah kamu lihat 🎉</Text>
        </View>
      )}
    </View>
  );
};

const Trending = () => {
  const { feedData } = useApp();

  const trendingData = useMemo(() => {
    return feedData.sort((a, b) => b.upvotes - a.upvotes);
  }, [feedData]);

  return (
    <View>
      <FlatList
        data={trendingData}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => (
          <RenderItem
            item={item}
            isLastIndex={index === trendingData.length - 1}
          />
        )}
      />
    </View>
  );
};

export default Trending;

const styles = StyleSheet.create({
  lastItemContainer: {
    marginBottom: 50,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
