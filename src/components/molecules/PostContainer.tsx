import Post from '@components/atoms/Post';
import Typography from '@components/atoms/Typography';
import COLORS from '@constants/colors';
import { useApp } from '@contexts/app';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IData } from 'types/data';

const PostContainer = ({
  item,
  isLastIndex,
}: {
  item: IData;
  isLastIndex: boolean;
}) => {
  const { isLoggedIn } = useApp();

  const lastItemStyles = [
    styles.lastItemContainer,
    { marginBottom: isLoggedIn ? 0 : 50 },
  ];

  return (
    <View>
      <Post {...item} />
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

export default React.memo(PostContainer);
