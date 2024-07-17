import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { FlatList, View, ActivityIndicator, StyleSheet } from 'react-native';
import PostContainer from '@components/organisms/PostContainer';
import { useApp } from '@contexts/app';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { TopTabHomeParamList } from 'types/navigation';
import { IData } from 'types/data';

type TrendingProps = MaterialTopTabScreenProps<
  TopTabHomeParamList,
  'Trending'
> & {
  generateData: () => void;
};

const Trending = ({ generateData }: TrendingProps) => {
  const { feedData } = useApp();
  const [loading, setLoading] = useState(true);

  const trendingData = useMemo(() => {
    const sortedFeedData = [...feedData].sort((a, b) => b.upvotes - a.upvotes);
    return sortedFeedData;
  }, [feedData]);

  useEffect(() => {
    if (feedData.length > 0) {
      setLoading(false);
    }
  }, [feedData]);

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
