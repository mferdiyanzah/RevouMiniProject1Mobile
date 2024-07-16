import Button from '@components/atoms/Button';
import Icon from '@components/atoms/Icon';
import Input from '@components/atoms/Input';
import Typography from '@components/atoms/Typography';
import TYPOGRAPHY from '@constants/typography';
import { useApp } from '@contexts/app';
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
  const { addFeedData } = useApp();

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

    addFeedData(newFeedData);

    navigation.navigate('HomeScreen', {
      screen: 'Home',
      params: { screen: 'Terbaru' },
    });
  }, [addFeedData, navigation, title, description, label]);

  const handleChangeLabel = useCallback((value: string) => {
    setLabel(value);
  }, []);

  const handleChangeTitle = useCallback((value: string) => {
    setTitle(value);
  }, []);

  const handleChangeDescription = useCallback((value: string) => {
    setDescription(value);
  }, []);

  const isDisabled = useMemo(() => {
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
            disabled={isDisabled}
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
          icon={<Icon variant="file" />}
          iconPosition="only"
          onPress={() => {}}
        />
        <Button
          variant="link"
          icon={<Icon variant="image" />}
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
    gap: 16,
    padding: 12,
  },
  postText: {
    flex: 1,
  },
  addPostButton: {
    alignSelf: 'flex-end',
  },
  addPostContainer: {
    padding: 12,
    gap: 32,
    flex: 1,
  },
  titleInput: {
    ...TYPOGRAPHY.heading.large,
    paddingHorizontal: 16,
  },
  descriptionInput: {
    ...TYPOGRAPHY.paragraph.medium,
    paddingHorizontal: 16,
  },
  attachmentContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderTopColor: 'gray',
    borderTopWidth: 1,
  },
});
