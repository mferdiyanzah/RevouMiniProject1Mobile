import PostContainer from '@components/organisms/PostContainer';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import usePostStore from '@stores/usePostStore';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { IData } from 'types/data';
import { TopTabHomeParamList } from 'types/navigation';

type TrendingProps = MaterialTopTabScreenProps<
  TopTabHomeParamList,
  'Trending'
> & {
  generateData: () => void;
};

const Trending = ({ generateData }: TrendingProps) => {
  const { posts } = usePostStore();
  const [loading, setLoading] = useState(true);

  const trendingData = useMemo(() => {
    const sortedFeedData = [...posts].sort((a, b) => b.upvotes - a.upvotes);
    return sortedFeedData;
  }, [posts]);

  useEffect(() => {
    if (posts.length > 0) {
      setLoading(false);
    }
  }, [posts]);

  const keyExtractor = useCallback((item: IData) => item.id.toString(), []);

  const renderItem = useCallback(
    ({ item, index }: { item: IData; index: number }) => (
      <PostContainer
        item={item}
        isLastIndex={index === trendingData.length - 1}
      />
    ),
    [trendingData.length],
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={trendingData}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onRefresh={generateData}
        refreshing={loading}
      />
    </View>
  );
};

export default React.memo(Trending);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
