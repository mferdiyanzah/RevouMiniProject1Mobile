import Typography from '@components/atoms/Typography';
import Post from '@components/molecules/Post';
import COLORS from '@constants/colors';
import useAuthStore from '@stores/useAuthStore';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
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
    { marginBottom: accessToken ? 0 : 50 },
  ];

  return (
    <View>
      <Post data={item} />
      {isLastIndex && (
        <View style={lastItemStyles}>
          <Typography style={styles.text}>
            Semua feed sudah kamu lihat 🎉
          </Typography>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  lastItemContainer: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLORS.gray,
  },
});

export default memo(PostContainer);
