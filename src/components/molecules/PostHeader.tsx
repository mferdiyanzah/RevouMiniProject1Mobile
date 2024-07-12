import Avatar from '@components/atoms/Avatar';
import Button from '@components/atoms/Button';
import Icon from '@components/atoms/Icon';
import Typography from '@components/atoms/Typography';
import TYPOGRAPHY from '@constants/typography';
import { useApp } from '@contexts/app';
import { useHome } from '@contexts/home';
import timesAgo from '@utils/date';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IData } from 'types/data';

const PostHeader = (data: IData) => {
  const { isLoggedIn } = useApp();
  const { navigation } = useHome();

  const handlePressThreeDot = useCallback(() => {
    if (!isLoggedIn) {
      navigation.navigate('Login');
      return;
    }
  }, [isLoggedIn, navigation]);

  return (
    <View style={styles.container}>
      <Avatar image={data.avatar} />
      <View>
        <Typography type="heading" size="xSmall" style={styles.name}>
          {data.name}
        </Typography>
        <Text style={styles.description}>{data.position}</Text>
        <Text style={styles.description}>{timesAgo(data.time)}</Text>
      </View>
      <View style={styles.dotThreeContainer}>
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
  dotThreeContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  name: {
    ...TYPOGRAPHY.heading.xSmall,
    color: 'black',
  },
  description: {
    ...TYPOGRAPHY.paragraph.small,
  },
});
