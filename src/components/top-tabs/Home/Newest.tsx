import PostContainer from '@components/organisms/PostContainer';
import useFetchPosts from '@hooks/queries/useFetchPosts';
import usePostStore from '@stores/usePostStore';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { IPost } from 'types/post';

const Newest = () => {
  const { newestPosts, setNewestPosts } = usePostStore();
  const [page, setPage] = useState(1);

  const {
    isPending: loading,
    data: newestData,
    refetch,
  } = useFetchPosts({
    sort_by: 'created_at',
    perpage: 10,
    page,
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (!loading && newestData) {
      const newNewestPosts =
        page === 1 ? newestData : [...newestPosts, ...newestData];
      setNewestPosts(newNewestPosts);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, newestData]);

  const keyExtractor = useCallback((item: IPost) => item.id.toString(), []);

  const renderItem = useCallback(
    ({ item, index }: { item: IPost; index: number }) => (
      <PostContainer
        item={item}
        isLastIndex={index === newestPosts.length - 1}
      />
    ),
    [newestPosts.length],
  );

  const handleEndReached = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const handleOnRefresh = useCallback(() => {
    setPage(1);
  }, []);

  if (loading && page === 1) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={newestData}
        initialNumToRender={5}
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

export default React.memo(Newest);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
