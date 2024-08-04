import Label from '@components/atoms/Label';
import Typography from '@components/atoms/Typography';
import COLORS from '@constants/colors';
import TYPOGRAPHY from '@constants/typography';
import useAuthStore from '@stores/useAuthStore';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IData } from 'types/data';
import ActionPostButton from './ActionPostButton';
import PostHeader from './PostHeader';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from 'types/navigation';

interface PostProps {
  data: IData;
  isDetail?: boolean;
}

const Post = ({ data, isDetail = false }: PostProps) => {
  const { accessToken } = useAuthStore();
  const navigation = useNavigation<StackNavigation>();

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
    navigation.navigate('DetailPost', { id: data.id });
  }, [accessToken, data.id, navigation]);

  const renderDescription = useCallback(() => {
    const descriptionContent =
      showFullDescription || isDetail
        ? data.description
        : getTruncatedText(data.description, descriptionLimit);

    const toggleText = showFullDescription
      ? ' Baca lebih sedikit'
      : 'Baca lebih lanjut';

    return (
      <>
        <Typography style={styles.postDescription}>
          {descriptionContent}
        </Typography>
        {!isDetail && data.description.length > descriptionLimit && (
          <Typography onPress={toggleDescription} style={styles.readMore}>
            {toggleText}
          </Typography>
        )}
      </>
    );
  }, [
    showFullDescription,
    data.description,
    descriptionLimit,
    toggleDescription,
    isDetail,
  ]);

  return (
    <View style={styles.container}>
      <PostHeader data={data} navigation={navigation} />
      <TouchableOpacity style={styles.postDetailContainer} onPress={goToDetail}>
        <Text style={styles.postTitle}>{data.title}</Text>
        <Text style={styles.postDescription}>{renderDescription()}</Text>
        <View>
          <Label label={data.label} variant="tertiary" color="green" />
        </View>
      </TouchableOpacity>
      <View style={styles.ctaContainer}>
        <ActionPostButton
          upvotes={data.upvotes}
          downvotes={data.downvotes}
          variant="upvote-downvote"
          navigation={navigation}
        />
        <ActionPostButton
          value={data.comments}
          variant="comment"
          navigation={navigation}
        />
        <ActionPostButton
          value={data.shares}
          variant="share"
          navigation={navigation}
        />
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
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
