import { TextStyle } from 'react-native';

const baseStyles = {
  xxLarge: { fontSize: 28, lineHeight: 36 },
  xLarge: { fontSize: 24, lineHeight: 32 },
  large: { fontSize: 16, lineHeight: 24 },
  medium: { fontSize: 14, lineHeight: 22 },
  small: { fontSize: 12, lineHeight: 20 },
  xSmall: { fontSize: 10, lineHeight: 18 },
  xxSmall: { fontSize: 8, lineHeight: 12 },
};

const italicStyles: TextStyle = {
  fontStyle: 'italic',
};

type SizeCategories =
  | 'xxLarge'
  | 'xLarge'
  | 'large'
  | 'medium'
  | 'small'
  | 'xSmall'
  | 'xxSmall';

type ParagraphSizes = Exclude<SizeCategories, 'xxLarge' | 'xLarge' | 'xxSmall'>;

type SpecialSizes = Exclude<SizeCategories, 'xxLarge' | 'xLarge'>;

interface Typography {
  heading: { [K in SizeCategories]: TextStyle };
  paragraph: { [K in ParagraphSizes]: TextStyle };
  special: { [K in SpecialSizes]: TextStyle };
}

const TYPOGRAPHY: Typography = {
  heading: {
    ...baseStyles,
    xxLarge: { ...baseStyles.xxLarge, fontWeight: 'bold' },
    xLarge: { ...baseStyles.xLarge, fontWeight: '700' },
    large: { fontSize: 20, lineHeight: 28, fontWeight: '700' },
    medium: { ...baseStyles.large, fontWeight: '700' },
    small: { ...baseStyles.medium, fontWeight: '700' },
    xSmall: { ...baseStyles.small, fontWeight: '700' },
    xxSmall: { ...baseStyles.xSmall, fontWeight: '700' },
  },
  paragraph: {
    large: { ...baseStyles.large, fontWeight: '400' },
    medium: { ...baseStyles.medium, fontWeight: '400' },
    small: { ...baseStyles.small, fontWeight: '400' },
    xSmall: { ...baseStyles.xSmall, fontWeight: '400' },
  },
  special: {
    large: { ...baseStyles.large, ...italicStyles },
    medium: { ...baseStyles.medium, ...italicStyles },
    small: { ...baseStyles.small, ...italicStyles },
    xSmall: { ...baseStyles.xSmall, ...italicStyles },
    xxSmall: { ...baseStyles.xxSmall, ...italicStyles },
  },
};

export default TYPOGRAPHY;
