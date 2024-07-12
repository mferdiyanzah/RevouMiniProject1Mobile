const TYPOGRAPHY = {
  heading: {
    xxLarge: { fontSize: 28, fontWeight: 'bold' as const, lineHeight: 36 },
    xLarge: { fontSize: 24, fontWeight: 'bold' as const, lineHeight: 32 },
    large: { fontSize: 20, fontWeight: 'bold' as const, lineHeight: 28 },
    medium: { fontSize: 16, fontWeight: 'bold' as const, lineHeight: 24 },
    small: { fontSize: 14, fontWeight: 'bold' as const, lineHeight: 22 },
    xSmall: { fontSize: 12, fontWeight: 'bold' as const, lineHeight: 20 },
    xxSmall: { fontSize: 10, fontWeight: 'bold' as const, lineHeight: 18 },
  },
  paragraph: {
    large: { fontSize: 16, fontWeight: 'normal' as const, lineHeight: 24 },
    medium: { fontSize: 14, fontWeight: 'normal' as const, lineHeight: 22 },
    small: { fontSize: 12, fontWeight: 'normal' as const, lineHeight: 20 },
    xSmall: { fontSize: 10, fontWeight: 'normal' as const, lineHeight: 18 },
  },
  special: {
    large: { fontSize: 16, fontStyle: 'italic' as const, lineHeight: 24 },
    medium: { fontSize: 14, fontStyle: 'italic' as const, lineHeight: 22 },
    small: { fontSize: 12, fontStyle: 'italic' as const, lineHeight: 20 },
    xSmall: { fontSize: 10, fontStyle: 'italic' as const, lineHeight: 18 },
    xxSmall: { fontSize: 8, fontStyle: 'italic' as const, lineHeight: 12 },
  },
} as const;

export default TYPOGRAPHY;
