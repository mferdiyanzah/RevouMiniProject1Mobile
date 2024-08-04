import Avatar from '@components/atoms/Avatar';
import Button from '@components/atoms/Button';
import Icon from '@components/atoms/Icon';
import Typography from '@components/atoms/Typography';
import TYPOGRAPHY from '@constants/typography';
import useAuthStore from '@stores/useAuthStore';
import timesAgo from '@utils/date';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IData } from 'types/data';

interface PostHeaderProps {
  data: IData;
  navigation?: any;
}

const PostHeader = ({ data, navigation }: PostHeaderProps) => {
  const { accessToken } = useAuthStore();

  const handlePressThreeDot = useCallback(() => {
    if (!accessToken) {
      navigation.navigate('Login');
      return;
    }
  }, [accessToken, navigation]);

  return (
    <View style={styles.container}>
      <View>
        <Avatar image={data.avatar} />
      </View>

      <View style={styles.postProfileContainer}>
        <Typography type="heading" size="xSmall" style={styles.name}>
          {data.name}
        </Typography>
        <Text style={styles.description}>{data.position}</Text>
        <Text style={styles.description}>{timesAgo(data.time)}</Text>
      </View>
      <View>
        <Button
          variant="link"
          icon={<Icon variant="three-dots" />}
          iconPosition="only"
          onPress={handlePressThreeDot}
        />
      </View>
    </View>
  );
};

export default PostHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
  },
  name: {
    ...TYPOGRAPHY.heading.xSmall,
    color: 'black',
  },
  description: {
    ...TYPOGRAPHY.paragraph.small,
  },
  postProfileContainer: {
    flex: 1,
  },
});
