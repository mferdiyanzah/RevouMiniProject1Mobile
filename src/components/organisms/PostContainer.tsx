import Typography from '@components/atoms/Typography';
import Post from '@components/molecules/Post';
import COLORS from '@constants/colors';
import useAuthStore from '@stores/useAuthStore';
import React, { memo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { IPost } from 'types/post';

const PostContainer = ({
  item,
  isLastIndex,
}: {
  item: IPost;
  isLastIndex: boolean;
}) => {
  const { accessToken } = useAuthStore();

  const lastItemStyles = [
    styles.lastItemContainer,
    { marginBottom: accessToken ? 90 : 140 },
  ];

  return (
    <View>
      <Post data={item} />
      {isLastIndex && (
        <View style={lastItemStyles}>
          <ActivityIndicator color={COLORS.gray} />
          <Typography style={styles.text}>
            Sedang memuat data baru...
          </Typography>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  lastItemContainer: {
    height: 80,
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: COLORS.gray,
  },
});

export default memo(PostContainer);
