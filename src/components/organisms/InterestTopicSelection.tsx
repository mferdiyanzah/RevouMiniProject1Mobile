import Button from '@components/atoms/Button';
import Typography from '@components/atoms/Typography';
import COLORS from '@constants/colors';
import useFetchTopics, { ITopic } from '@hooks/queries/useFetchTopics';
import React, { useMemo, useState } from 'react';
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

const { width } = Dimensions.get('window');

const InterestTopicSelection = () => {
  const { data, isLoading } = useFetchTopics();
  const [selectedTopic, setSelectedTopic] = useState<string[]>([]);

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
        onPress={() => {
          if (isSelected) {
            setSelectedTopic(prev => prev.filter(topic => topic !== item.id));
          } else {
            if (selectedTopic.length < 3) {
              setSelectedTopic(prev => [...prev, item.id]);
            } else {
              ToastAndroid.show(
                'Anda hanya bisa memilih 3 topik',
                ToastAndroid.SHORT,
              );
            }
          }
        }}
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

  return (
    <View style={styles.container}>
      <AuthHeader rightAction={() => {}} goToPreviousScreen={() => {}} />
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
            data={data}
            numColumns={3}
            renderItem={renderImages}
            keyExtractor={item => item.id}
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
        />
      </View>
    </View>
  );
};

export default InterestTopicSelection;

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
