import Avatar from '@components/atoms/Avatar';
import Button from '@components/atoms/Button';
import Icon from '@components/atoms/Icon';
import Input from '@components/atoms/Input';
import COLORS from '@constants/colors';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '@stores/useAuthStore';
import React, { useCallback } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { StackNavigation } from 'types/navigation';

const ContentCreationCard = () => {
  const { accessToken } = useAuthStore();

  const navigation = useNavigation<StackNavigation>();

  const handleAddQuestion = useCallback(() => {
    if (!accessToken) {
      navigation.navigate('Login');
      return;
    }
    Alert.alert('Add Question');
  }, [accessToken, navigation]);

  const handleAddPost = useCallback(() => {
    if (!accessToken) {
      navigation.navigate('Login');
      return;
    }
    navigation.navigate('CreatePost');
  }, [accessToken, navigation]);

  const handleWhatDoYouWantToAsk = useCallback(() => {
    if (!accessToken) {
      navigation.navigate('Login');
      return;
    }
    navigation.navigate('CreatePost');
  }, [accessToken, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.headerContainer}>
          <Avatar />
          <View style={styles.inputContainer}>
            <Input
              variant="primary"
              placeholder="Apa yang ingin kamu tanyakan?"
              state="default"
              onPress={handleWhatDoYouWantToAsk}
            />
          </View>
        </View>
        <View style={styles.actionButtonContainer}>
          <View style={styles.addQuestionContainer}>
            <Button
              variant="custom"
              size="small"
              label="Pertanyaan"
              icon={<Icon variant="question" />}
              iconPosition="left"
              onPress={handleAddQuestion}
              labelStyle={styles.buttonLabel}
            />
          </View>
          <View style={styles.addPostContainer}>
            <Button
              variant="custom"
              size="small"
              label="Post"
              icon={<Icon variant="plus" />}
              iconPosition="left"
              onPress={handleAddPost}
              labelStyle={styles.buttonLabel}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(ContentCreationCard);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.neutral300,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  inputContainer: {
    flex: 1,
  },
  actionButtonContainer: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
  addPostContainer: {
    flex: 1,
  },
  addQuestionContainer: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: COLORS.gray,
  },
  buttonLabel: {
    color: COLORS.neutral700,
  },
});
