import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import COLORS from '@constants/colors';
import TYPOGRAPHY from '@constants/typography';

type Variant = 'primary' | 'secondary' | 'tertiary';
type Color = 'neutral' | 'red' | 'green' | 'purple' | 'blue';

interface LabelProps {
  label: string;
  variant?: Variant;
  color: Color;
}

const Label = ({ variant, color, label }: LabelProps) => {
  const backgroundColor = () => {
    return backgroundColorStyles[`${variant}-${color}`];
  };

  const containerStyle = [styles.container, backgroundColor()];

  const textStyle = [styles.label, colorStyles[color]];

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{label}</Text>
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
  label: {
    ...TYPOGRAPHY.heading.xSmall,
  },
});

const backgroundColorStyles = StyleSheet.create({
  'primary-purple': {
    backgroundColor: COLORS.primary,
  },
  'primary-green': {
    backgroundColor: COLORS.green400,
  },
  'primary-red': {
    backgroundColor: COLORS.red400,
  },
  'tertiary-green': {
    backgroundColor: COLORS.green100,
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
