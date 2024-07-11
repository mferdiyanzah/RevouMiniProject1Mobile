import Label from '@components/atoms/Label';
import COLORS from '@constants/colors';
import TYPOGRAPHY from '@constants/typography';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActionPostButton from './ActionPostButton';
import PostHeader from './PostHeader';

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

const Post = (data: IData) => {
  return (
    <View style={styles.container}>
      <PostHeader {...data} />
      <View style={styles.postDetailContainer}>
        <Text style={styles.postTitle}>{data.title}</Text>
        <Text>{data.description}</Text>
        <View>
          <Label label={data.label} variant="tertiary" color="green" />
        </View>
      </View>
      <View style={styles.ctaContainer}>
        <ActionPostButton
          upvotes={data.upvotes}
          downvotes={data.downvotes}
          variant="upvote-downvote"
        />
        <ActionPostButton value={data.comments} variant="comment" />
        <ActionPostButton value={data.shares} variant="share" />
        {/* <Button
          width={100}
          size="small"
          variant="tertiary"
          label={<CTAButton {...data} />}
        />
        <Button
          width={60}
          variant="tertiary"
          size="small"
          label={data.comments.toString()}
          icon={<Icon variant="comment" />}
          iconPosition="left"
        />
        <Button
          width={60}
          variant="tertiary"
          size="small"
          label={data.shares.toString()}
          icon={<Icon variant="share" />}
          iconPosition="left"
        /> */}
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    color: 'black',
    gap: 12,
  },
  postTitle: {
    ...TYPOGRAPHY.heading.medium,
    color: 'black',
  },
  postDetailContainer: {
    gap: 8,
  },
  ctaContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
