import PostContainer from '@components/molecules/PostContainer';
import { useApp } from '@contexts/app';
import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';

const Trending = ({ generateData }: { generateData: () => void }) => {
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
          <PostContainer
            item={item}
            isLastIndex={index === trendingData.length - 1}
          />
        )}
        onRefresh={generateData}
        refreshing={false}
      />
    </View>
  );
};

export default React.memo(Trending);
