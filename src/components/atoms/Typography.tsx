import TYPOGRAPHY from '@constants/typography';
import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

type TypographyType = keyof typeof TYPOGRAPHY;
type TypographySize =
  | 'xxSmall'
  | 'xSmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xLarge'
  | 'xxLarge';

interface TypographyProps extends TextProps {
  type?: TypographyType;
  size?: TypographySize;
}

const Typography: React.FC<TypographyProps> = ({
  type = 'paragraph',
  size = 'medium',
  style,
  children,
  ...props
}) => {
  const typographyStyle =
    TYPOGRAPHY[type][size as keyof (typeof TYPOGRAPHY)[TypographyType]];

  return (
    <Text style={[styles.base, typographyStyle, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    color: 'black',
  },
});

export default Typography;
