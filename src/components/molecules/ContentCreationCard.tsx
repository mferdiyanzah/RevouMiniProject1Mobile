import Avatar from '@components/atoms/Avatar';
import Button from '@components/atoms/Button';
import Icon from '@components/atoms/Icon';
import Input from '@components/atoms/Input';
import COLORS from '@constants/colors';
import { useApp } from '@contexts/app';
import { useHome } from '@contexts/home';
import React, { useCallback } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

const ContentCreationCard = () => {
  const { isLoggedIn } = useApp();

  const { navigation } = useHome();

  const checkIsLoggedIn = useCallback(() => {
    if (!isLoggedIn) {
      navigation.navigate('Login');
      return;
    }
  }, [isLoggedIn, navigation]);

  const handleAddQuestion = useCallback(() => {
    checkIsLoggedIn();
    Alert.alert('Add Question');
  }, [checkIsLoggedIn]);

  const handleAddPost = useCallback(() => {
    checkIsLoggedIn();
    navigation.navigate('CreatePost');
  }, [checkIsLoggedIn, navigation]);

  const handleWhatDoYouWantToAsk = useCallback(() => {
    checkIsLoggedIn();
    navigation.navigate('CreatePost');
  }, [checkIsLoggedIn, navigation]);

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
              variant="link"
              size="small"
              label="Pertanyaan"
              icon={<Icon variant="question" />}
              iconPosition="left"
              onPress={handleAddQuestion}
            />
          </View>
          <View style={styles.addPostContainer}>
            <Button
              variant="link"
              size="small"
              label="Post"
              icon={<Icon variant="plus" />}
              iconPosition="left"
              onPress={handleAddPost}
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
});
