import Icon from '@components/atoms/Icon';
import COLORS from '@constants/colors';
import TYPOGRAPHY from '@constants/typography';
import { useApp } from '@contexts/app';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../atoms/Button';

type ButtonVariant = 'comment' | 'share' | 'upvote-downvote';

interface ActionPostButtonProps {
  variant: ButtonVariant;
  value?: number;
  upvotes?: number;
  downvotes?: number;
  navigation?: any;
}

const ActionPostButton = ({
  variant,
  value = 0,
  upvotes = 0,
  downvotes = 0,
  navigation,
}: ActionPostButtonProps) => {
  const { isLoggedIn } = useApp();

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
            <Button
              variant="custom"
              size="small"
              onPress={handleClick}
              icon={<Icon variant="up-arrow" size={16} />}
              iconPosition="left"
              label={upvotes.toString()}
            />
            <View style={styles.divider} />
            <Button
              variant="custom"
              size="small"
              onPress={handleClick}
              icon={
                <Icon variant="up-arrow" size={16} style={styles.downArrow} />
              }
              iconPosition="left"
              label={downvotes.toString()}
            />
          </View>
        ) : (
          <Button
            variant="custom"
            size="small"
            onPress={handleClick}
            icon={<Icon variant={iconVariant} size={16} />}
            iconPosition="left"
            label={value.toString()}
          />
        )}
      </View>
    </View>
  );
};

export default ActionPostButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 96,
    flexDirection: 'row',
    backgroundColor: COLORS.neutral200,
    height: 36,
    paddingHorizontal: 16,
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
    gap: 5,
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
