import Button from '@components/atoms/Button';
import Icon from '@components/atoms/Icon';
import Input from '@components/atoms/Input';
import Post from '@components/molecules/Post';
import Typography from '@components/atoms/Typography';
import COLORS from '@constants/colors';
import { useApp } from '@contexts/app';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { IData } from 'types/data';
import { RootStackParamList } from 'types/navigation';

type DetailPostProps = NativeStackScreenProps<RootStackParamList, 'DetailPost'>;

const DetailPost = ({ navigation }: DetailPostProps) => {
  const { selectedPost } = useApp();

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
        <Post
          data={selectedPost as IData}
          isDetail={true}
          navigation={navigation}
        />
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

export default DetailPost;

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
  postDetailContainer: {
    flex: 16,
  },
  inputContainer: {
    flex: 1,
  },
  postDetailActionButtons: {
    flexDirection: 'row',
    padding: 16,
    borderTopColor: COLORS.gray,
    borderTopWidth: 1,
    gap: 16,
  },
});
