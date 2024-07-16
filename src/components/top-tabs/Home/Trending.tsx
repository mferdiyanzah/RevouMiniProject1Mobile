import PostContainer from '@components/organisms/PostContainer';
import { useApp } from '@contexts/app';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { TopTabHomeParamList } from 'types/navigation';

type TrendingProps = MaterialTopTabScreenProps<
  TopTabHomeParamList,
  'Trending'
> & {
  generateData: () => void;
};

const Trending = ({ generateData }: TrendingProps) => {
  const { feedData } = useApp();

  const trendingData = useMemo(() => {
    const copyFeedData = [...feedData];
    return copyFeedData.sort((a, b) => b.upvotes - a.upvotes);
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
