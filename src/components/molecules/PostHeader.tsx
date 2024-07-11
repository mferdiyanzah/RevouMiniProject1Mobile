import Avatar from '@components/atoms/Avatar';
import Icon from '@components/atoms/Icon';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IData {
  id: number;
  avatar: string;
  name: string;
  position: string;
  time: Date;
  title: string;
  description: string;
  label: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  shares: number;
}

const PostHeader = (data: IData) => {
  return (
    <View style={styles.container}>
      <Avatar image={data.avatar} />
      <View>
        <Text>{data.name}</Text>
        <Text>{data.position}</Text>
        <Text>{data.time.toDateString()}</Text>
      </View>
      <View style={styles.dotThreeContainer}>
        <Icon variant="three-dots" />
      </View>
    </View>
  );
};

export default PostHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
  },
  dotThreeContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
