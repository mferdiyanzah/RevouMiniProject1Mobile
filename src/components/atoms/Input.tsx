import COLORS from '@constants/colors';
import TYPOGRAPHY from '@constants/typography';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, View } from 'react-native';
import Button from './Button';
import Icon from './Icon';
import Typography from './Typography';

type InputType = 'text' | 'password' | 'email' | 'number';
type InputVariant = 'primary' | 'secondary' | 'tertiary';
type InputState = 'default' | 'focus' | 'error' | 'success' | 'disabled';
interface InputProps extends React.ComponentProps<typeof TextInput> {
  label?: string;
  placeholder?: string;
  type?: InputType;
  variant?: InputVariant;
  value?: string;
  state: InputState;
  errorMessage?: string;
  loading?: boolean;
}

const Input: React.FC<InputProps> = props => {
  const {
    label,
    placeholder,
    type,
    state,
    errorMessage,
    onChangeText,
    onPress,
    value,
    loading,
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

    if (state === 'default') {
      inputStyle.push(inputStyles[currentState]);
    } else {
      inputStyle.push(inputStyles[state]);
    }

    return inputStyle;
  }, [currentState, state]);

  return (
    <View style={styles.container}>
      {label && (
        <View>
          <Typography style={styles.labelContainer}>{label}</Typography>
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
          onPress={onPress}
          value={value}
        />
        {type === 'password' ? (
          <View style={styles.buttonContainer}>
            <Button
              variant="link"
              onPress={() => setShowPassword(!showPassword)}
              icon={
                <Icon variant={showPassword ? 'eye' : 'eye-off'} size={20} />
              }
              iconPosition="only"
            />
          </View>
        ) : null}
        {loading ? (
          <View style={styles.buttonContainer}>
            <ActivityIndicator size="small" color={COLORS.neutral700} />
          </View>
        ) : null}
      </View>
      {state === 'error' && (
        <Typography style={styles.errorLabel}>{errorMessage}</Typography>
      )}
    </View>
  );
};

export default React.memo(Input);

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
    paddingHorizontal: 16,
    flex: 1,
    ...TYPOGRAPHY.paragraph.medium,
  },
  inputTextContainer: {
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorLabel: {
    color: COLORS.red500,
    ...TYPOGRAPHY.paragraph.small,
  },
  buttonContainer: {
    marginEnd: 12,
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
