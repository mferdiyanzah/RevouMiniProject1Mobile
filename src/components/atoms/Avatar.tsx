import { FALLBACK_IMAGE } from '@constants/general';
import useAuthStore from '@stores/useAuthStore';
import React, { useCallback, useMemo, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface AvatarProps {
  image?: string;
}

const images: { [key: string]: any } = {
  default: require('@assets/images/avatar-default.png'),
  revou: require('@assets/images/revou.png'),
};

const Avatar = ({ image }: AvatarProps) => {
  const { accessToken } = useAuthStore();

  const [hasError, setHasError] = useState(false);

  const imageSource = useMemo(() => {
    if (image) {
      return hasError ? FALLBACK_IMAGE : image;
    }

    return accessToken ? images.revou : images.default;
  }, [image, accessToken, hasError]);

  const onError = useCallback(() => {
    setHasError(true);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.avatarContainer}
        source={image ? { uri: imageSource } : imageSource}
        resizeMode="cover"
        onError={onError}
      />
    </View>
  );
};

export default React.memo(Avatar);

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
  },
  avatarContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
});
