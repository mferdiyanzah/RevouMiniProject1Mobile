import Button from '@components/atoms/Button';
import COLORS from '@constants/colors';
import TYPOGRAPHY from '@constants/typography';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import LeftArrowSVG from '../../assets/icons/left-arrow.svg';
import LogoSVG from '../../assets/icons/logo.svg';

type LoginHeaderProps = {
  onSkip: () => void;
  goToPreviousScreen?: () => void;
};

const LoginHeader = ({ onSkip, goToPreviousScreen }: LoginHeaderProps) => {
  return (
    <View style={loginHeaderStyles.container}>
      <View style={loginHeaderStyles.leftArrowContainer}>
        <Button
          onPress={goToPreviousScreen}
          variant="link"
          icon={<LeftArrowSVG />}
          iconPosition="only"
          width={30}
        />
      </View>
      <View style={loginHeaderStyles.logoContainer}>
        <LogoSVG />
      </View>
      <View style={loginHeaderStyles.skipContainer}>
        <Button onPress={onSkip} label="Lewati" variant="link" />
      </View>
    </View>
  );
};

export default LoginHeader;

const loginHeaderStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  skipText: {
    color: COLORS.primary,
    ...TYPOGRAPHY.paragraph.small,
  },
  leftArrowContainer: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  skipContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
