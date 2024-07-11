import COLORS from '@constants/colors';
import TYPOGRAPHY from '@constants/typography';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from './Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from './Button';

type InputType = 'text' | 'password' | 'email' | 'number';
type InputVariant = 'primary' | 'secondary' | 'tertiary';
type InputState = 'default' | 'focus' | 'error' | 'success' | 'disabled';
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
    state,
    errorMessage,
    onChangeText,
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [currentState, setCurrentState] = useState<InputState>('default');

  const handleFocus = () => {
    state !== 'error' && setCurrentState('focus');
  };

  const handleBlur = () => {
    state !== 'error' && setCurrentState('default');
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
          secureTextEntry={type === 'password' && !showPassword}
          keyboardType={type === 'number' ? 'numeric' : 'default'}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
        />
        {type === 'password' && (
          <Button
            variant="link"
            onPress={() => setShowPassword(!showPassword)}
            icon={<Icon variant={showPassword ? 'eye-off' : 'eye'} size={16} />}
            iconPosition="only"
          />
        )}
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
  },
  labelContainer: {
    marginBottom: 8,
    color: 'black',
    ...TYPOGRAPHY.heading.small,
  },
  inputText: {
    color: COLORS.neutral700,
    ...TYPOGRAPHY.paragraph.medium,
  },
  inputTextContainer: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorLabel: {
    color: COLORS.red500,
    ...TYPOGRAPHY.paragraph.small,
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
