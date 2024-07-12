import { useApp } from '@contexts/app';
import React, { useMemo, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface AvatarProps {
  image?: string;
}

const images: { [key: string]: any } = {
  default: require('@assets/images/avatar-default.png'),
  revou: require('@assets/images/revou.png'),
};

const Avatar = ({ image }: AvatarProps) => {
  const { isLoggedIn } = useApp();

  const [hasError, setHasError] = useState(false);
  const fallbackUrl = 'https://via.placeholder.com/150';

  const imageSource = useMemo(() => {
    if (image) {
      return hasError ? fallbackUrl : image;
    }

    return isLoggedIn ? images.revou : images.default;
  }, [image, isLoggedIn, hasError]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.avatarContainer}
        source={image ? { uri: imageSource } : imageSource}
        resizeMode="cover"
        onError={() => setHasError(true)}
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
