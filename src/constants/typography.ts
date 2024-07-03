const baseStyles = {
  xxLarge: { fontSize: 28, lineHeight: 36, color: 'black' },
  xLarge: { fontSize: 24, lineHeight: 32, color: 'black' },
  large: { fontSize: 16, lineHeight: 24, color: 'black' },
  medium: { fontSize: 14, lineHeight: 22, color: 'black' },
  small: { fontSize: 12, lineHeight: 20, color: 'black' },
  xSmall: { fontSize: 10, lineHeight: 18, color: 'black' },
  xxSmall: { fontSize: 8, lineHeight: 12, color: 'black' },
};

const TYPOGRAPHY = {
  heading: {
    ...baseStyles,
    xxLarge: { ...baseStyles.xxLarge, fontWeight: 700 },
    xLarge: { ...baseStyles.xLarge, fontWeight: 700 },
    large: { fontSize: 20, lineHeight: 28, fontWeight: 700 },
    medium: { ...baseStyles.large, fontWeight: 700 },
    small: { ...baseStyles.medium, fontWeight: 700 },
    xSmall: { ...baseStyles.small, fontWeight: 700 },
    xxSmall: { ...baseStyles.xSmall, fontWeight: 700 },
  },
  paragraph: {
    large: { ...baseStyles.large, fontWeight: 400 },
    medium: { ...baseStyles.medium, fontWeight: 400 },
    small: { ...baseStyles.small, fontWeight: 400 },
    xSmall: { ...baseStyles.xSmall, fontWeight: 400 },
  },
  special: {
    large: { ...baseStyles.large, fontStyle: 'italic' },
    medium: { ...baseStyles.medium, fontStyle: 'italic' },
    small: { ...baseStyles.small, fontStyle: 'italic' },
    xSmall: { ...baseStyles.xSmall, fontStyle: 'italic' },
    xxSmall: { ...baseStyles.xxSmall, fontStyle: 'italic' },
  },
};

export default TYPOGRAPHY;
