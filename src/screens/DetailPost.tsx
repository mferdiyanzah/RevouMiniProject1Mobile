import Button from '@components/atoms/Button';
import Icon from '@components/atoms/Icon';
import Input from '@components/atoms/Input';
import Typography from '@components/atoms/Typography';
import Post from '@components/molecules/Post';
import COLORS from '@constants/colors';
import useFetchPostById from '@hooks/queries/useFetchPostById';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { memo, useCallback } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { RootStackParamList } from 'types/navigation';
import { IPost } from 'types/post';

type DetailPostProps = NativeStackScreenProps<RootStackParamList, 'DetailPost'>;

const DetailPost = ({ route, navigation }: DetailPostProps) => {
  const { id } = route.params;

  const { data: selectedPost, isPending: isLoading } = useFetchPostById({
    postId: id,
  });

  const goToBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          variant="link"
          onPress={goToBack}
          icon={<Icon variant="left-arrow" size={20} />}
          iconPosition="only"
        />
        <Typography type="heading" size="medium">
          Post
        </Typography>
      </View>
      <View style={styles.postDetailContainer}>
        {isLoading || !selectedPost ? (
          <ActivityIndicator size="large" />
        ) : (
          <Post data={selectedPost as IPost} isDetail={true} />
        )}
      </View>
      <View style={styles.postDetailActionButtons}>
        <View style={styles.inputContainer}>
          <Input placeholder="Ketik Disini" type="text" state="default" />
        </View>

        <View>
          <Button
            variant="primary"
            disabled
            icon={<Icon variant="send" size={16} />}
            iconPosition="only"
            width={40}
          />
        </View>
      </View>
    </View>
  );
};

export default memo(DetailPost);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  postDetailContainer: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
  },
  postDetailActionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 13,
    paddingBottom: 16,
    borderTopColor: COLORS.neutral300,
    borderTopWidth: 1,
    gap: 16,
  },
});
