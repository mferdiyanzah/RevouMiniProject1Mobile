import Post from '@components/atoms/Post';
import { useApp } from '@contexts/app';
import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { IData } from 'types/data';

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

const Newest = () => {
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
          <RenderItem
            item={item}
            isLastIndex={index === newestData.length - 1}
          />
        )}
      />
    </View>
  );
};

export default Newest;

const styles = StyleSheet.create({
  lastItemContainer: {
    marginBottom: 50,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
