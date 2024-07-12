import PostContainer from '@components/molecules/PostContainer';
import { useApp } from '@contexts/app';
import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';

interface NewestProps {
  generateData: () => void;
}

const Newest = ({ generateData }: NewestProps) => {
  const { feedData } = useApp();

  const newestData = useMemo(() => {
    return feedData.sort((a, b) => b.time.getTime() - a.time.getTime());
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
