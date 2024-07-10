import Button from '@components/atoms/Button';
import COLORS from '@constants/colors';
import TYPOGRAPHY from '@constants/typography';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import LeftArrowSVG from '../../assets/icons/left-arrow.svg';
import LogoSVG from '../../assets/icons/logo.svg';

type LoginHeaderProps = {
  onSkip: () => void;
};

const LoginHeader = ({ onSkip }: LoginHeaderProps) => {
  return (
    <View style={loginHeaderStyles.container}>
      <LeftArrowSVG />
      <LogoSVG />
      <Button onPress={onSkip} label="Lewati" variant="link" />
    </View>
  );
};

export default LoginHeader;

const loginHeaderStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  skipText: {
    color: COLORS.primary,
    ...TYPOGRAPHY.paragraph.small,
  },
});
