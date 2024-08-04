import PostContainer from '@components/organisms/PostContainer';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import usePostStore from '@stores/usePostStore';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { IData } from 'types/data';
import { TopTabHomeParamList } from 'types/navigation';

type NewestProps = MaterialTopTabScreenProps<TopTabHomeParamList, 'Terbaru'> & {
  generateData: () => void;
};

const Newest = ({ generateData }: NewestProps) => {
  const { posts } = usePostStore();
  const [loading, setLoading] = useState<boolean>(true);

  const newestData = useMemo(() => {
    const copyFeedData = [...posts];
    return copyFeedData.sort((a, b) => b.time.getTime() - a.time.getTime());
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
        isLastIndex={index === newestData.length - 1}
      />
    ),
    [newestData.length],
  );

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={newestData}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onRefresh={generateData}
        refreshing={false}
      />
    </View>
  );
};

export default React.memo(Newest);
