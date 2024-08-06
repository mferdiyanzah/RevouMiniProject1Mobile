import colors from '@constants/colors';
import typography from '@constants/typography';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import Typography from './Typography';
import { capitalizeFirstLetter } from '@utils/string';

type ButtonVariant = 'primary' | 'outline' | 'tertiary' | 'link' | 'custom';
type IconPosition = 'left' | 'right' | 'only';
type SizeVariant = 'small' | 'medium' | 'large';

interface ButtonProps {
  label?: string | JSX.Element;
  onPress?: () => void;
  variant?: ButtonVariant;
  icon?: JSX.Element;
  iconPosition?: IconPosition;
  disabled?: boolean;
  size?: SizeVariant;
  width?: number | 'full';
  labelStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  icon,
  iconPosition,
  disabled = false,
  size = 'medium',
  width,
  labelStyle,
}) => {
  const buttonStyle = [
    styles.button,
    styles[`button${capitalizeFirstLetter(size)}` as keyof typeof styles],
    styles[
      `button${capitalizeFirstLetter(variant)}${
        disabled ? 'Disabled' : ''
      }` as keyof typeof styles
    ],
    width === 'full' ? styles.fullWidth : { width },
    { gap: variant === 'custom' ? 4 : 8 },
  ];

  const textStyle = [
    styles.text,
    styles[`text${capitalizeFirstLetter(size)}` as keyof typeof styles],
    styles[
      `text${capitalizeFirstLetter(variant)}${
        disabled ? 'Disabled' : ''
      }` as keyof typeof styles
    ],
    labelStyle,
  ];

  const renderIcon = () => {
    if (!icon) {
      return null;
    }
    const iconStyle = [icon.props.style];
    return React.cloneElement(icon, { style: iconStyle });
  };

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} disabled={disabled}>
      {iconPosition === 'left' && renderIcon()}
      {iconPosition !== 'only' && label && (
        <Typography style={textStyle}>{label}</Typography>
      )}
      {iconPosition === 'right' && renderIcon()}
      {iconPosition === 'only' && renderIcon()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 96,
    height: 'auto',
    gap: 2,
  },
  text: {
    fontWeight: '700',
  },
  buttonSmall: { height: 32 },
  buttonMedium: { height: 40 },
  buttonLarge: { height: 48 },
  textSmall: { ...typography.heading.xSmall },
  textMedium: { ...typography.heading.small },
  textLarge: { ...typography.heading.medium },
  buttonPrimary: { backgroundColor: colors.primary },
  buttonPrimaryDisabled: { backgroundColor: colors.neutral400 },
  buttonOutline: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonOutlineDisabled: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.neutral400,
  },
  buttonTertiary: { backgroundColor: colors.secondary },
  buttonTertiaryDisabled: { backgroundColor: colors.neutral400 },
  buttonLink: { backgroundColor: colors.transparent },
  buttonLinkDisabled: { backgroundColor: colors.transparent },
  buttonCustom: {},
  buttonCustomDisabled: {},
  textPrimary: { color: colors.light },
  textPrimaryDisabled: { color: colors.neutral100 },
  textOutline: { color: colors.primary },
  textOutlineDisabled: { color: colors.neutral400 },
  textTertiary: { color: colors.primary },
  textTertiaryDisabled: { color: colors.neutral400 },
  textLink: { color: colors.primary },
  textLinkDisabled: { color: colors.neutral400 },
  textCustom: {},
  textCustomDisabled: {},
  fullWidth: { alignSelf: 'stretch' },
});

export default Button;
