import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

type InputType = 'text' | 'password' | 'email' | 'number';
type InputVariant = 'primary' | 'secondary' | 'tertiary';

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: InputType;
  variant?: InputVariant;
  value?: string;
  onChangeText?: (text: string) => void;
}

const Input: React.FC<InputProps> = props => {
  const { label, placeholder, type, variant, value, onChangeText } = props;

  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={type === 'password'}
      keyboardType={type === 'number' ? 'numeric' : 'default'}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default Input;

const styles = StyleSheet.create({});
