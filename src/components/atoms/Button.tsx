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
    variantStyles[variant],
    sizeStyles[size],
    width === 'full' && layoutStyles.fullWidth,
    typeof width === 'number' && { width },
    disabled && stateStyles.disabled,
  ];

  const textStyle = [
    variantTextStyles[variant],
    TYPOGRAPHY.paragraph[size],
    disabled && stateStyles.disabledText,
    baseStyles.text,
  ];

  const renderIcon = () => {
    if (!icon) {
      return null;
    }

    const iconStyle = [
      icon.props.style,
      iconStyles.base,
      { color: variantTextStyles[variant].color },
      disabled && stateStyles.disabledText,
    ];

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

const variantStyles = StyleSheet.create({
  primary: { backgroundColor: COLORS.primary },
  outline: {
    backgroundColor: COLORS.transparent,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  tertiary: { backgroundColor: COLORS.secondary },
  link: {
    backgroundColor: COLORS.transparent,
    paddingHorizontal: 0,
  },
});

const variantTextStyles = StyleSheet.create({
  primary: { color: '#FFFFFF' },
  outline: { color: COLORS.primary },
  tertiary: { color: COLORS.primary },
  link: { color: COLORS.primary },
});

const sizeStyles = StyleSheet.create({
  small: {
    height: 32,
  },
  medium: {
    height: 40,
  },
  large: {
    height: 48,
  },
});

const stateStyles = StyleSheet.create({
  disabled: { opacity: 0.5 },
  disabledText: { color: COLORS.gray },
});

const iconStyles = StyleSheet.create({
  base: { marginRight: 8 },
});

const layoutStyles = StyleSheet.create({
  fullWidth: { alignSelf: 'stretch' },
});

export default Button;
