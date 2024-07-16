import PostContainer from '@components/organisms/PostContainer';
import { useApp } from '@contexts/app';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { TopTabHomeParamList } from 'types/navigation';

type NewestProps = MaterialTopTabScreenProps<TopTabHomeParamList, 'Terbaru'> & {
  generateData: () => void;
};

const Newest = ({ generateData }: NewestProps) => {
  const { feedData } = useApp();

  const newestData = useMemo(() => {
    const copyFeedData = [...feedData];
    return copyFeedData.sort((a, b) => b.time.getTime() - a.time.getTime());
  }, [feedData]);

  return (
    <View>
      <FlatList
        data={newestData}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => (
          <PostContainer
            item={item}
            isLastIndex={index === newestData.length - 1}
          />
        )}
        onRefresh={generateData}
        refreshing={false}
      />
    </View>
  );
};

export default React.memo(Newest);
