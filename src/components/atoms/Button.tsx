import React from 'react';
import { Pressable, Text, StyleSheet, TextStyle } from 'react-native';
import COLORS from '@constants/colors';

type ButtonVariant = 'primary' | 'outline' | 'tertiary' | 'link';
type IconPosition = 'left' | 'right' | 'only';
type SizeVariant = 'small' | 'medium' | 'large';

interface ButtonProps {
  label?: string;
  onPress: () => void;
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
  const getButtonStyle = () => [
    styles.button,
    styles[variant],
    width === 'full' && styles.fullWidth,
    typeof width === 'number' && { width },
    disabled && styles.disabled,
  ];

  const getTextStyle = () => [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
  ];

  const renderIcon = () => {
    if (!icon) {
      return null;
    }

    const iconStyle = [
      icon.props.style,
      styles.icon,
      { color: (getTextStyle()[1] as TextStyle).color },
      disabled && styles.disabledText,
    ];

    return React.cloneElement(icon, { style: iconStyle });
  };

  const shouldRenderLabel = () => iconPosition !== 'only' && label;

  return (
    <Pressable style={getButtonStyle()} onPress={onPress} disabled={disabled}>
      {iconPosition === 'left' && renderIcon()}
      {shouldRenderLabel() && <Text style={getTextStyle()}>{label}</Text>}
      {iconPosition === 'right' && renderIcon()}
      {iconPosition === 'only' && renderIcon()}
    </Pressable>
  );
};

const baseTextStyle: TextStyle = {
  fontSize: 16,
  fontWeight: 'bold',
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
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
  text: baseTextStyle,
  primaryText: { color: COLORS.light },
  outlineText: { color: COLORS.primary },
  tertiaryText: { color: COLORS.primary },
  linkText: { color: COLORS.primary },
  disabled: { opacity: 0.5 },
  disabledText: { color: COLORS.gray },
  icon: { marginRight: 8 },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  smallText: { fontSize: 12 },
  mediumText: { fontSize: 16 },
  largeText: { fontSize: 20 },
});

export default Button;
