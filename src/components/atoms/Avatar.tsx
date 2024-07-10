import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface AvatarProps {
  image: string;
}

const Avatar = ({ image }: AvatarProps) => {
  const [hasError, setHasError] = useState(false);
  const fallbackUrl = 'https://via.placeholder.com/150';
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatarContainer}
        source={{ uri: hasError ? fallbackUrl : image }}
        resizeMode="cover"
        onError={() => setHasError(true)}
      />
    </View>
  );
};

export default Avatar;

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
