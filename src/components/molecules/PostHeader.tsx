import Avatar from '@components/atoms/Avatar';
import Icon from '@components/atoms/Icon';
import TYPOGRAPHY from '@constants/typography';
import React, { useMemo } from 'react';
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
  // function to generate berapa detik/menit/jam/hari yang lalu
  const timeAgo = useMemo(() => {
    const now = new Date();
    const diff = now.getTime() - data.time.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  }, [data.time]);

  return (
    <View style={styles.container}>
      <Avatar image={data.avatar} />
      <View>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.description}>{data.position}</Text>
        <Text style={styles.description}>{timeAgo}</Text>
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
  name: {
    ...TYPOGRAPHY.heading.xSmall,
    color: 'black',
  },
  description: {
    ...TYPOGRAPHY.paragraph.small,
  },
});
