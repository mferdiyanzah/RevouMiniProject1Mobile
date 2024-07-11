import COLORS from '@constants/colors';
import TYPOGRAPHY from '@constants/typography';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type ButtonVariant = 'primary' | 'outline' | 'tertiary' | 'link';
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
}) => {
  const buttonStyle = [
    baseStyles.button,
    buttonSizeStyles[size],
    buttonVariantStyles[`${variant}-${disabled ? 'disabled' : 'default'}`],
    width === 'full' ? layoutStyles.fullWidth : { width },
  ];

  const textStyle = [
    baseStyles.text,
    textSizeStyles[size],
    textVariantStyles[`${variant}-${disabled ? 'disabled' : 'default'}`],
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
        <Text style={textStyle}>{label}</Text>
      )}
      {iconPosition === 'right' && renderIcon()}
      {iconPosition === 'only' && renderIcon()}
    </TouchableOpacity>
  );
};

const baseStyles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    height: 'auto',
    gap: 8,
  },
  text: {
    fontWeight: '700',
  },
});

const buttonSizeStyles = StyleSheet.create({
  small: { height: 32 },
  medium: { height: 40 },
  large: { height: 48 },
});

const textSizeStyles = StyleSheet.create({
  small: { ...TYPOGRAPHY.heading.xSmall },
  medium: { ...TYPOGRAPHY.heading.small },
  large: { ...TYPOGRAPHY.heading.medium },
});

const buttonVariantStyles = StyleSheet.create({
  'primary-default': { backgroundColor: COLORS.primary },
  'primary-disabled': { backgroundColor: COLORS.neutral400 },
  'outline-default': {
    backgroundColor: COLORS.transparent,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  'outline-disabled': {
    backgroundColor: COLORS.transparent,
    borderWidth: 1,
    borderColor: COLORS.neutral400,
  },
  'tertiary-default': { backgroundColor: COLORS.secondary },
  'tertiary-disabled': { backgroundColor: COLORS.neutral400 },
  'link-default': { backgroundColor: COLORS.transparent },
  'link-disabled': { backgroundColor: COLORS.transparent },
});

const textVariantStyles = StyleSheet.create({
  'primary-default': { color: COLORS.light },
  'primary-disabled': { color: COLORS.neutral100 },
  'outline-default': { color: COLORS.primary },
  'outline-disabled': { color: COLORS.neutral400 },
  'tertiary-default': { color: COLORS.primary },
  'tertiary-disabled': { color: COLORS.neutral400 },
  'link-default': { color: COLORS.primary },
  'link-disabled': { color: COLORS.neutral400 },
});

const layoutStyles = StyleSheet.create({
  fullWidth: { alignSelf: 'stretch' },
});

export default Button;
