import Button from '@components/atoms/Button';
import Icon from '@components/atoms/Icon';
import Loader from '@components/atoms/Loader';
import Typography from '@components/atoms/Typography';
import COLORS from '@constants/colors';
import TYPOGRAPHY from '@constants/typography';
import useCreatePost, {
  ICreatePostPayload,
} from '@hooks/mutations/useCreatePost';
import useFetchTopics from '@hooks/queries/useFetchTopics';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, TextInput, ToastAndroid, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { RootStackParamList, TopTabHomeParamList } from 'types/navigation';

type CreatePostProps = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  MaterialTopTabNavigationProp<TopTabHomeParamList>
>;

type CreatePostScreenProps = {
  navigation: CreatePostProps;
};

const CreatePost = ({ navigation }: CreatePostScreenProps) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [topic, setTopic] = useState<string>('');

  const { data } = useFetchTopics();

  const { mutateAsync: createPost, isPending: isCreatingPost } =
    useCreatePost();

  const goToBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleAddNewData = useCallback(async () => {
    const newPostPayload: ICreatePostPayload = {
      header: title,
      content: description,
      is_anonim: false,
      topic_id: topic,
    };

    await createPost(newPostPayload)
      .then(() => {
        ToastAndroid.show('Post Berhasil dibuat', ToastAndroid.SHORT);
        navigation.navigate('HomeScreen', {
          screen: 'Home',
          params: { screen: 'Terbaru' },
        });
      })
      .catch(error => {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      });
  }, [title, description, topic, createPost, navigation]);

  const isPostButtonDisabled = useMemo(() => {
    return title === '' || description === '' || topic === '';
  }, [title, description, topic]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          variant="link"
          onPress={goToBack}
          icon={<Icon variant="left-arrow" size={20} />}
          iconPosition="only"
        />
        <View style={styles.postText}>
          <Typography type="heading" size="medium">
            Post
          </Typography>
        </View>
        <View style={styles.addPostButton}>
          <Button
            variant="primary"
            label="Post"
            onPress={handleAddNewData}
            width={60}
            disabled={isPostButtonDisabled}
          />
        </View>
      </View>
      <View style={styles.addPostContainer}>
        <Dropdown
          data={data}
          valueField="id"
          labelField="label"
          placeholder="Topic"
          onChange={item => setTopic(item.id)}
          maxHeight={300}
          style={styles.dropdown}
        />

        <TextInput
          placeholder="Judul"
          style={styles.titleInput}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="Deskripsi"
          style={styles.descriptionInput}
          multiline
          onChangeText={setDescription}
        />
      </View>
      <View style={styles.attachmentContainer}>
        <Button
          variant="link"
          icon={<Icon variant="file" size={20} />}
          iconPosition="only"
          onPress={() => {}}
        />
        <Button
          variant="link"
          icon={<Icon variant="image" size={20} />}
          iconPosition="only"
          onPress={() => {}}
        />
      </View>
      <Loader isLoading={isCreatingPost} />
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    paddingVertical: 6,
    paddingHorizontal: 24,
  },
  postText: {
    flex: 1,
  },
  addPostButton: {
    alignSelf: 'flex-end',
  },
  addPostContainer: {
    gap: 32,
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  titleInput: {
    ...TYPOGRAPHY.heading.large,
    color: COLORS.neutral700,
  },
  descriptionInput: {
    ...TYPOGRAPHY.paragraph.medium,
    color: COLORS.neutral700,
  },
  attachmentContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 24,
    borderTopColor: COLORS.neutral300,
    borderTopWidth: 1,
    paddingTop: 12,
    paddingBottom: 16,
  },
  dropdown: {
    width: '100%',
    borderColor: COLORS.neutral300,
    backgroundColor: COLORS.neutral200,
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 16,
  },
});
