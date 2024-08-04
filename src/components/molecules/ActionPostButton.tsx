import Icon from '@components/atoms/Icon';
import COLORS from '@constants/colors';
import TYPOGRAPHY from '@constants/typography';
import useAuthStore from '@stores/useAuthStore';
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
  const { accessToken } = useAuthStore();
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
    if (!accessToken) {
      navigation.navigate('Login');
      return;
    }
  }, [accessToken, navigation]);

  const formatNumberWithSuffix = useCallback((initialValue: number) => {
    if (initialValue < 1000) {
      return initialValue.toString();
    }

    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixNum = Math.floor(('' + initialValue).length / 3);
    let shortValue = parseFloat(
      (suffixNum !== 0
        ? initialValue / Math.pow(1000, suffixNum)
        : initialValue
      ).toPrecision(2),
    );

    if (shortValue % 1 !== 0) {
      shortValue = parseFloat(shortValue.toFixed(1));
    }

    return shortValue + suffixes[suffixNum];
  }, []);

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
              label={formatNumberWithSuffix(upvotes)}
              labelStyle={styles.value}
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
              label={formatNumberWithSuffix(downvotes)}
              labelStyle={styles.value}
            />
          </View>
        ) : (
          <Button
            variant="custom"
            size="small"
            onPress={handleClick}
            icon={<Icon variant={iconVariant} size={16} />}
            iconPosition="left"
            label={formatNumberWithSuffix(value)}
            labelStyle={styles.value}
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
    color: COLORS.neutral700,
  },
  value: {
    ...TYPOGRAPHY.paragraph.small,
    color: COLORS.neutral700,
  },
  divider: {
    borderWidth: 1,
    borderColor: COLORS.neutral400,
    height: 16,
  },
});
