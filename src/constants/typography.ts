const TYPOGRAPHY = {
  heading: {
    xxLarge: { fontSize: 28, fontWeight: 'bold', lineHeight: 36 },
    xLarge: { fontSize: 24, fontWeight: 'bold', lineHeight: 32 },
    large: { fontSize: 20, fontWeight: 'bold', lineHeight: 28 },
    medium: { fontSize: 16, fontWeight: 'bold', lineHeight: 24 },
    small: { fontSize: 14, fontWeight: 'bold', lineHeight: 22 },
    xSmall: { fontSize: 12, fontWeight: 'bold', lineHeight: 20 },
    xxSmall: { fontSize: 10, fontWeight: 'bold', lineHeight: 18 },
  },
  paragraph: {
    large: { fontSize: 16, fontWeight: 'regular', lineHeight: 24 },
    medium: { fontSize: 14, fontWeight: 'regular', lineHeight: 22 },
    small: { fontSize: 12, fontWeight: 'regular', lineHeight: 20 },
    xSmall: { fontSize: 10, fontWeight: 'regular', lineHeight: 18 },
  },
  special: {
    large: { fontSize: 16, fontStyle: 'italic', lineHeight: 24 },
    medium: { fontSize: 14, fontStyle: 'italic', lineHeight: 22 },
    small: { fontSize: 12, fontStyle: 'italic', lineHeight: 20 },
    xSmall: { fontSize: 10, fontStyle: 'italic', lineHeight: 18 },
    xxSmall: { fontSize: 8, fontStyle: 'italic', lineHeight: 12 },
  },
} as const;

export default TYPOGRAPHY;
