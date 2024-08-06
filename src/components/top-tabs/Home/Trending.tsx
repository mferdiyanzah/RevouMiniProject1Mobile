import PostContainer from '@components/organisms/PostContainer';
import useFetchPosts from '@hooks/queries/useFetchPosts';
import usePostStore from '@stores/usePostStore';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { IPost } from 'types/post';

const Trending = () => {
  const { trendingPosts, setTrendingPosts } = usePostStore();
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  const {
    isPending: loading,
    data: postData,
    isLoadingForFirstTime,
  } = useFetchPosts({
    sort_by: 'engagement',
    perpage: 10,
    page,
    key: refreshKey,
  });

  useEffect(() => {
    if (!loading && postData) {
      const newTrendingPosts =
        page === 1 ? postData : [...trendingPosts, ...postData];
      setTrendingPosts(newTrendingPosts);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, postData]);

  const keyExtractor = useCallback((item: IPost) => item.id.toString(), []);

  const renderItem = useCallback(
    ({ item, index }: { item: IPost; index: number }) => (
      <PostContainer
        item={item}
        isLastIndex={index === trendingPosts.length - 1}
      />
    ),
    [trendingPosts.length],
  );

  const handleEndReached = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const handleOnRefresh = useCallback(() => {
    setPage(1);
    setRefreshKey(Math.random());
  }, []);

  if (isLoadingForFirstTime) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={trendingPosts}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onRefresh={handleOnRefresh}
        refreshing={loading}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.8}
        maxToRenderPerBatch={10}
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
