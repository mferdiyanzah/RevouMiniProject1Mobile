import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import COLORS from '@constants/colors';
import TYPOGRAPHY from '@constants/typography';
import Icon from '@components/atoms/Icon';

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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => console.log('Comment')}
        style={styles.buttonContainer}>
        {variant === 'upvote-downvote' ? (
          <View style={styles.upvoteDownvote}>
            <View style={styles.buttonContainer}>
              <Icon variant="up-arrow" />
              <Text style={styles.value}>{upvotes}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.buttonContainer}>
              <Icon variant="up-arrow" style={styles.downArrow} />
              <Text style={styles.value}>{downvotes}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <Icon variant={iconVariant as any} />
            <Text style={styles.value}>{value}</Text>
          </View>
        )}
      </TouchableOpacity>
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
