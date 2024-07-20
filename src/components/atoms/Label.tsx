import colors from '@constants/colors';
import React from 'react';
import { StyleSheet, View, ViewStyle, TextStyle } from 'react-native';
import Typography from './Typography';
import { capitalizeFirstLetter } from '@utils/string';

type Variant = 'primary' | 'secondary' | 'tertiary';
type Color = 'neutral' | 'red' | 'green' | 'purple' | 'blue';

interface LabelProps {
  label: string;
  variant: Variant;
  color: Color;
}

const Label = ({ variant, color, label }: LabelProps) => {
  const getBackgroundColor = () => {
    return backgroundStyles[`${variant}${capitalizeFirstLetter(color)}`];
  };

  const containerStyle = [styles.container, getBackgroundColor()];
  const textStyle = [textStyles[color]];

  return (
    <View style={containerStyle}>
      <Typography type="heading" size="xSmall" style={textStyle}>
        {label}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
});

const backgroundStyles: { [key: string]: ViewStyle } = StyleSheet.create({
  primaryPurple: {
    backgroundColor: colors.primary,
  },
  primaryBlue: {
    backgroundColor: colors.blue400,
  },
  primaryNeutral: {
    backgroundColor: colors.neutral700,
  },
  primaryGreen: {
    backgroundColor: colors.green400,
  },
  primaryRed: {
    backgroundColor: colors.red400,
  },
  secondaryGreen: {
    backgroundColor: colors.green200,
  },
  secondaryRed: {
    backgroundColor: colors.red200,
  },
  secondaryPurple: {
    backgroundColor: colors.purple200,
  },
  secondaryBlue: {
    backgroundColor: colors.blue200,
  },
  secondaryNeutral: {
    backgroundColor: colors.neutral200,
  },
  tertiaryGreen: {
    backgroundColor: colors.green100,
  },
  tertiaryRed: {
    backgroundColor: colors.red100,
  },
  tertiaryPurple: {
    backgroundColor: colors.purple100,
  },
  tertiaryBlue: {
    backgroundColor: colors.blue100,
  },
  tertiaryNeutral: {
    backgroundColor: colors.neutral100,
  },
});

const textStyles: { [key: string]: TextStyle } = StyleSheet.create({
  neutral: {
    color: colors.neutral700,
  },
  red: {
    color: colors.red500,
  },
  green: {
    color: colors.green600,
  },
  purple: {
    color: colors.purple500,
  },
  blue: {
    color: colors.blue500,
  },
});

export default Label;
