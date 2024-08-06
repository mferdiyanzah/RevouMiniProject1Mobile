import Button from '@components/atoms/Button';
import Icon from '@components/atoms/Icon';
import Input from '@components/atoms/Input';
import Typography from '@components/atoms/Typography';
import COLORS from '@constants/colors';
import TYPOGRAPHY from '@constants/typography';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { IData } from 'types/data';
import { RootStackParamList, TopTabHomeParamList } from 'types/navigation';

type CreatePostProps = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  MaterialTopTabNavigationProp<TopTabHomeParamList>
>;

type CreatePostScreenProps = {
  navigation: CreatePostProps;
};

const CreatePost = ({ navigation }: CreatePostScreenProps) => {
  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [label, setLabel] = React.useState<string>('');

  const goToBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleAddNewData = useCallback(() => {
    const newFeedData: IData = {
      id: Math.random(),
      title: title,
      description: description,
      label: label,
      avatar: '',
      name: 'Ferdiyanzah',
      position: 'Software Engineer',
      upvotes: 0,
      comments: 0,
      downvotes: 0,
      shares: 0,
      time: new Date(),
    };

    console.log(newFeedData);

    navigation.navigate('HomeScreen', {
      screen: 'Home',
      params: { screen: 'Terbaru' },
    });
  }, [navigation, title, description, label]);

  const handleChangeLabel = useCallback((value: string) => {
    setLabel(value);
  }, []);

  const handleChangeTitle = useCallback((value: string) => {
    setTitle(value);
  }, []);

  const handleChangeDescription = useCallback((value: string) => {
    setDescription(value);
  }, []);

  const isPostButtonDisabled = useMemo(() => {
    return title === '' || description === '' || label === '';
  }, [title, description, label]);

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
        <Input
          placeholder="Topic"
          type="text"
          state="default"
          onChangeText={handleChangeLabel}
        />
        <TextInput
          placeholder="Judul"
          style={styles.titleInput}
          onChangeText={handleChangeTitle}
        />
        <TextInput
          placeholder="Deskripsi"
          style={styles.descriptionInput}
          multiline
          onChangeText={handleChangeDescription}
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
    color: COLORS.neutral400,
  },
  descriptionInput: {
    ...TYPOGRAPHY.paragraph.medium,
    color: COLORS.neutral400,
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
});
