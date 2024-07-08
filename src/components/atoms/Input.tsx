import COLORS from '@constants/colors';
import TYPOGRAPHY from '@constants/typography';
import React, { useMemo, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type InputType = 'text' | 'password' | 'email' | 'number';
type InputVariant = 'primary' | 'secondary' | 'tertiary';
type InputState = 'default' | 'focus' | 'error' | 'success' | 'disabled';

// Input:
// 1. Type: Text, Password, Email, Number
// 2. Label, No Label
// 3. State: Active, Error, Success, Disabled

interface InputProps extends React.ComponentProps<typeof TextInput> {
  label?: string;
  placeholder?: string;
  type?: InputType;
  variant?: InputVariant;
  value?: string;
  state?: InputState;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = props => {
  const {
    label,
    placeholder,
    type,
    variant,
    value,
    onChangeText,
    state,
    errorMessage,
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [currentState, setCurrentState] = useState<InputState>('default');

  const handleFocus = () => {
    setCurrentState('focus');
  };

  const handleBlur = () => {
    setCurrentState('default');
  };

  const textInputStyles = useMemo(() => {
    const inputStyle = [styles.inputTextContainer, inputStyles.default];

    if (state) {
      inputStyle.push(inputStyles[state]);
    } else {
      inputStyle.push(inputStyles[currentState]);
    }

    return inputStyle;
  }, [currentState, state]);

  return (
    <View style={styles.container}>
      {label && (
        <View>
          <Text style={styles.labelContainer}>{label}</Text>
        </View>
      )}
      <View style={textInputStyles}>
        <TextInput
          style={styles.inputText}
          placeholder={placeholder}
          secureTextEntry={type === 'password'}
          keyboardType={type === 'number' ? 'numeric' : 'default'}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
        />
      </View>
      {state === 'error' && (
        <Text style={styles.errorLabel}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  labelContainer: {
    marginBottom: 8,
    color: 'black',
    ...TYPOGRAPHY.heading.small,
  },
  inputText: {
    fontSize: 14,
    color: COLORS.neutral700,
  },
  inputTextContainer: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorLabel: {
    color: COLORS.red500,
  },
});

const inputStyles = StyleSheet.create({
  default: {
    borderColor: COLORS.neutral300,
    backgroundColor: COLORS.neutral200,
  },
  focus: {
    borderColor: COLORS.purple500,
    backgroundColor: COLORS.purple100,
  },
  error: {
    borderColor: COLORS.red500,
    backgroundColor: COLORS.red100,
  },
  success: {
    borderColor: COLORS.green500,
    backgroundColor: COLORS.green100,
  },
  disabled: {
    borderColor: COLORS.neutral300,
    backgroundColor: COLORS.neutral100,
  },
});
