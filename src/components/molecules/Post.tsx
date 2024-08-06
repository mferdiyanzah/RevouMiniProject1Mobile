import Label from '@components/atoms/Label';
import Typography from '@components/atoms/Typography';
import COLORS from '@constants/colors';
import TYPOGRAPHY from '@constants/typography';
import useUpvote from '@hooks/mutations/useUpvote';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '@stores/useAuthStore';
import React, { memo, useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { StackNavigation } from 'types/navigation';
import { IPost } from 'types/post';
import ActionPostButton from './ActionPostButton';
import PostHeader from './PostHeader';

interface PostProps {
  data: IPost;
  isDetail?: boolean;
}

const Post = ({ data, isDetail = false }: PostProps) => {
  const { accessToken } = useAuthStore();
  const navigation = useNavigation<StackNavigation>();

  const { mutateAsync: onUpvote } = useUpvote();

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = useCallback(() => {
    setShowFullDescription(!showFullDescription);
  }, [showFullDescription]);

  const getTruncatedText = (text: string, limit: number) => {
    if (text.length <= limit) {
      return text;
    }
    return text.substring(0, limit) + '... ';
  };

  const descriptionLimit = 230;

  const goToDetail = useCallback(() => {
    if (!accessToken) {
      navigation.navigate('Login');
      return;
    }

    if (isDetail) {
      return;
    }
    navigation.navigate('DetailPost', { id: data.id });
  }, [accessToken, data, isDetail, navigation]);

  const renderDescription = useCallback(() => {
    const descriptionContent =
      showFullDescription || isDetail
        ? data.content
        : getTruncatedText(data.content, descriptionLimit);

    const toggleText = showFullDescription
      ? ' Baca lebih sedikit'
      : 'Baca lebih lanjut';

    return (
      <>
        <Typography style={styles.postDescription}>
          {descriptionContent}
        </Typography>
        {!isDetail && data.content.length > descriptionLimit && (
          <Typography onPress={toggleDescription} style={styles.readMore}>
            {toggleText}
          </Typography>
        )}
      </>
    );
  }, [showFullDescription, isDetail, data.content, toggleDescription]);

  const handleClickUpvote = useCallback(() => {
    onUpvote(data.id)
      .then(() => {
        ToastAndroid.show('Success Upvote', ToastAndroid.SHORT);
      })
      .catch(() => {
        ToastAndroid.show('Error Upvote', ToastAndroid.SHORT);
      });
  }, [data, onUpvote]);

  return (
    <View style={styles.container}>
      <PostHeader data={data} navigation={navigation} />
      <TouchableOpacity style={styles.postDetailContainer} onPress={goToDetail}>
        <Text style={styles.postTitle}>{data.header}</Text>
        <Text style={styles.postDescription}>{renderDescription()}</Text>
        <View>
          <Label label={data.topic.label} variant="tertiary" color="green" />
        </View>
      </TouchableOpacity>
      <View style={styles.ctaContainer}>
        <ActionPostButton
          upvotes={data.upvotes}
          variant="upvote-downvote"
          navigation={navigation}
          onClick={handleClickUpvote}
        />
        <ActionPostButton
          value={data.total_comments}
          variant="comment"
          navigation={navigation}
        />
        <ActionPostButton
          value={data.reposts}
          variant="share"
          navigation={navigation}
        />
      </View>
    </View>
  );
};

export default memo(Post);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral300,
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
