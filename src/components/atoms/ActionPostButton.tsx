import Icon from '@components/atoms/Icon';
import COLORS from '@constants/colors';
import TYPOGRAPHY from '@constants/typography';
import { useApp } from '@contexts/app';
import { useHome } from '@contexts/home';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ButtonVariant = 'comment' | 'share' | 'upvote-downvote';

interface ActionPostButtonProps {
  variant?: ButtonVariant;
  value?: number;
  upvotes?: number;
  downvotes?: number;
}

const ActionPostButton = ({
  variant,
  value,
  upvotes,
  downvotes,
}: ActionPostButtonProps) => {
  const { isLoggedIn } = useApp();
  const { navigation } = useHome();

  const iconVariant = useMemo(() => {
    switch (variant) {
      case 'comment':
        return 'comment';
      case 'share':
        return 'share';
      case 'upvote-downvote':
        return 'up-arrow';
      default:
        return 'up-arrow';
    }
  }, [variant]);

  const handleClick = useCallback(() => {
    if (!isLoggedIn) {
      navigation.navigate('Login');
      return;
    }
  }, [isLoggedIn, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {variant === 'upvote-downvote' ? (
          <View style={styles.upvoteDownvote}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleClick}>
              <Icon variant="up-arrow" size={16} />
              <Text style={styles.value}>{upvotes}</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleClick}>
              <Icon variant="up-arrow" size={16} style={styles.downArrow} />
              <Text style={styles.value}>{downvotes}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleClick}>
            <Icon variant={iconVariant as any} size={16} />
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ActionPostButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    flexDirection: 'row',
    backgroundColor: COLORS.neutral200,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  upvoteDownvote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  downArrow: {
    transform: [{ rotate: '180deg' }],
  },
  value: {
    ...TYPOGRAPHY.paragraph.small,
  },
  divider: {
    borderWidth: 1,
    borderColor: COLORS.neutral400,
    height: 16,
  },
});
