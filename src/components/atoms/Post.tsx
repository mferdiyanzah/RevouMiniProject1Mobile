import Label from '@components/atoms/Label';
import COLORS from '@constants/colors';
import TYPOGRAPHY from '@constants/typography';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActionPostButton from './ActionPostButton';
import PostHeader from '../molecules/PostHeader';

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
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const getTruncatedText = (text: string, limit: number) => {
    if (text.length <= limit) {
      return text;
    }
    return text.substring(0, limit) + '... ';
  };

  const descriptionLimit = 230;

  return (
    <View style={styles.container}>
      <PostHeader {...data} />
      <View style={styles.postDetailContainer}>
        <Text style={styles.postTitle}>{data.title}</Text>
        <Text style={styles.postDescription}>
          {showFullDescription
            ? data.description
            : getTruncatedText(data.description, descriptionLimit)}
          {!showFullDescription &&
            data.description.length > descriptionLimit && (
              <Text onPress={toggleDescription} style={styles.readMore}>
                Baca lebih lanjut
              </Text>
            )}
          {showFullDescription && (
            <Text onPress={toggleDescription} style={styles.readMore}>
              Read Less
            </Text>
          )}
        </Text>
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
  postDescription: {
    ...TYPOGRAPHY.paragraph.medium,
    overflow: 'hidden',
    textAlign: 'justify',
  },
  postDetailContainer: {
    gap: 8,
  },
  ctaContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  readMore: {
    color: COLORS.gray,
    ...TYPOGRAPHY.paragraph.medium,
  },
});
