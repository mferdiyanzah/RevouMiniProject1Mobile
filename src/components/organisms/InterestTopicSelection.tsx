import Button from '@components/atoms/Button';
import Typography from '@components/atoms/Typography';
import COLORS from '@constants/colors';
import useFetchTopics, { ITopic } from '@hooks/queries/useFetchTopics';
import useRegisterStore from '@stores/useRegisterStore';
import React, { memo, useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import AuthHeader from './AuthHeader';

import useRegister, { RegisterResponse } from '@hooks/mutations/useRegister';
import analytics from '@react-native-firebase/analytics';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '@stores/useAuthStore';
import { StackNavigation } from 'types/navigation';

const { width } = Dimensions.get('window');

const InterestTopicSelection = () => {
  const { email, name, username, password, setCurrentStep } =
    useRegisterStore();

  const { setAccessToken, setRefreshToken } = useAuthStore();

  const navigation = useNavigation<StackNavigation>();

  const {
    mutateAsync: register,
    isError: isRegisterError,
    isSuccess: isRegisterSuccess,
  } = useRegister();

  const { data: responseData, isLoading } = useFetchTopics();
  const [selectedTopic, setSelectedTopic] = useState<string[]>([]);

  const handleClickTopic = async (isSelected: boolean, topic: ITopic) => {
    const analyticProperties = {
      email,
      name,
      username,
      topic_id: topic.id,
      topic_name: topic.label,
    };

    if (isSelected) {
      await analytics().logEvent(
        'click_register_unselect_topic_id',
        analyticProperties,
      );
      setSelectedTopic(prev =>
        prev.filter(selectedTopicId => selectedTopicId !== topic.id),
      );
    } else {
      if (selectedTopic.length < 3) {
        await analytics().logEvent(
          'click_register_select_topic_id',
          analyticProperties,
        );
        setSelectedTopic(prev => [...prev, topic.id]);
      } else {
        ToastAndroid.show(
          'Anda hanya bisa memilih 3 topik',
          ToastAndroid.SHORT,
        );
      }
    }
  };

  const renderImages: ListRenderItem<ITopic> = ({ item, index }) => {
    const isFirstRow = index < 3;

    const isSelected = selectedTopic.includes(item.id);
    const imageStyle = [styles.image, isSelected && styles.activeTopic];
    const labelStyle = [
      styles.topicLabel,
      isSelected && styles.activeTopicLabel,
    ];
    const topicContainerStyle = [
      styles.topicContainer,
      isFirstRow && { marginTop: 0 },
    ];

    return (
      <TouchableOpacity
        onPress={() => handleClickTopic(isSelected, item)}
        style={topicContainerStyle}>
        <Image source={{ uri: item.file.full_path }} style={imageStyle} />
        <View style={styles.topicLabelContainer}>
          <Typography
            type="heading"
            size="xSmall"
            style={labelStyle}
            numberOfLines={2}>
            {item.label}
          </Typography>
        </View>
      </TouchableOpacity>
    );
  };

  const isRegisterButtonDisabled = useMemo(() => {
    return selectedTopic.length !== 3;
  }, [selectedTopic]);

  const goToPreviousScreen = useCallback(() => {
    setCurrentStep(2);
  }, [setCurrentStep]);

  const handleRegister = useCallback(async () => {
    const payload = {
      username: username as string,
      name: name as string,
      email: email as string,
      password: password as string,
      favorite_topic_ids: selectedTopic as string[],
    };

    const response = (await register(payload)) as RegisterResponse;

    if (isRegisterError) {
      ToastAndroid.show('Gagal mendaftar', ToastAndroid.SHORT);
    }

    if (isRegisterSuccess && response) {
      ToastAndroid.show('Berhasil mendaftar', ToastAndroid.SHORT);
      setAccessToken(response.access_token);
      setRefreshToken(response.refresh_token);
      navigation.navigate('HomeScreen');
    }
  }, [
    email,
    isRegisterError,
    isRegisterSuccess,
    name,
    navigation,
    password,
    register,
    selectedTopic,
    setAccessToken,
    setRefreshToken,
    username,
  ]);

  return (
    <View style={styles.container}>
      <AuthHeader
        rightAction={() => {}}
        goToPreviousScreen={goToPreviousScreen}
      />
      <View style={styles.formTitleContainer}>
        <Typography type="heading" size="xLarge">
          Pilih 3 Topik Favorit
        </Typography>
      </View>
      <View style={styles.topicListContainer}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={responseData}
            numColumns={3}
            renderItem={renderImages}
            keyExtractor={item => item.id.toString()}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <View style={styles.registerContainer}>
        <View style={styles.stepperContainer}>
          <Typography type="paragraph" size="small">
            3 dari 3
          </Typography>
          <View style={styles.dashedLineContainer}>
            <View style={styles.dashedLine} />
          </View>
        </View>
        <Button
          width="full"
          label="Daftar"
          variant="primary"
          size="medium"
          disabled={isRegisterButtonDisabled}
          onPress={handleRegister}
        />
      </View>
    </View>
  );
};

export default memo(InterestTopicSelection);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  formTitleContainer: {
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  topicListContainer: {
    width: '100%',
    flex: 12,
  },
  topicContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width / 3 - 24,
    height: 120,
    borderRadius: 8,
    marginRight: 10,
    marginTop: 48,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  activeTopic: {
    borderWidth: 4,
    borderColor: COLORS.primary,
  },
  topicLabelContainer: {
    width: '100%',
    alignItems: 'center',
  },
  topicLabel: {
    textAlign: 'center',
  },
  activeTopicLabel: {
    color: COLORS.primary,
  },
  registerContainer: {
    flex: 1.4,
    width: '100%',
    justifyContent: 'flex-end',
    paddingTop: 8,
    gap: 16,
  },
  stepperContainer: {
    marginTop: 16,
  },
  dashedLineContainer: {
    height: 4,
    backgroundColor: COLORS.neutral300,
    width: '100%',
  },
  dashedLine: {
    height: 4,
    backgroundColor: COLORS.primary,
    width: '100%',
  },
});
