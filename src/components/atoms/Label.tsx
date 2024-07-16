import COLORS from '@constants/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Typography from './Typography';

type Variant = 'primary' | 'secondary' | 'tertiary';
type Color = 'neutral' | 'red' | 'green' | 'purple' | 'blue';

interface LabelProps {
  label: string;
  variant: Variant;
  color: Color;
}

const Label = ({ variant, color, label }: LabelProps) => {
  const backgroundColor = () => {
    return backgroundColorStyles[`${variant}-${color}`];
  };

  const containerStyle = [styles.container, backgroundColor()];

  const textStyle = [colorStyles[color]];

  return (
    <View style={containerStyle}>
      <Typography type="heading" size="xSmall" style={textStyle}>
        {label}
      </Typography>
    </View>
  );
};

export default Label;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
});

const backgroundColorStyles = StyleSheet.create({
  'primary-purple': {
    backgroundColor: COLORS.primary,
  },
  'primary-blue': {
    backgroundColor: COLORS.blue400,
  },
  'primary-neutral': {
    backgroundColor: COLORS.neutral700,
  },
  'primary-green': {
    backgroundColor: COLORS.green400,
  },
  'primary-red': {
    backgroundColor: COLORS.red400,
  },
  'secondary-green': {
    backgroundColor: COLORS.green200,
  },
  'secondary-red': {
    backgroundColor: COLORS.red200,
  },
  'secondary-purple': {
    backgroundColor: COLORS.purple200,
  },
  'secondary-blue': {
    backgroundColor: COLORS.blue200,
  },
  'secondary-neutral': {
    backgroundColor: COLORS.neutral200,
  },
  'tertiary-green': {
    backgroundColor: COLORS.green100,
  },
  'tertiary-red': {
    backgroundColor: COLORS.red100,
  },
  'tertiary-purple': {
    backgroundColor: COLORS.purple100,
  },
  'tertiary-blue': {
    backgroundColor: COLORS.blue100,
  },
  'tertiary-neutral': {
    backgroundColor: COLORS.neutral100,
  },
});

const colorStyles = StyleSheet.create({
  neutral: {
    color: COLORS.neutral700,
  },
  red: {
    color: COLORS.red500,
  },
  green: {
    color: COLORS.green600,
  },
  purple: {
    color: COLORS.purple500,
  },
  blue: {
    color: COLORS.blue500,
  },
});
