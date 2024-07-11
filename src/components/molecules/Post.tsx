import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import COLORS from '@constants/colors';
import PostHeader from './PostHeader';
import TYPOGRAPHY from '@constants/typography';
import Button from '@components/atoms/Button';
import Icon from '@components/atoms/Icon';
import Label from '@components/atoms/Label';

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
const CTAButton = (data: IData) => {
  return (
    <View style={ctaStyles.container}>
      <View style={ctaStyles.upvoteContainer}>
        <Icon variant="up-arrow" />
        <Text>{data.upvotes}</Text>
      </View>
      <View style={ctaStyles.downvoteContainer}>
        <Icon variant="up-arrow" style={ctaStyles.downArrow} />
        <Text>{data.downvotes}</Text>
      </View>
    </View>
  );
};

const ctaStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  upvoteContainer: {
    borderEndColor: COLORS.gray,
    borderEndWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  downvoteContainer: {
    flexDirection: 'row',
  },
  downArrow: {
    transform: [{ rotate: '180deg' }],
  },
});

const Post = (data: IData) => {
  return (
    <View style={styles.container}>
      <PostHeader {...data} />
      <View>
        <Text style={styles.postTitle}>{data.title}</Text>
        <Text>{data.description}</Text>
        <View>
          <Label label={data.label} variant="tertiary" color="green" />
        </View>
      </View>
      <View style={styles.ctaContainer}>
        <Button
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
        />
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
    gap: 8,
  },
  postTitle: {
    ...TYPOGRAPHY.heading.medium,
    color: 'black',
  },
  ctaContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
