import Button from '@components/atoms/Button';
import Input from '@components/atoms/Input';
import LoginHeader from '@components/organisms/LoginHeader';
import TYPOGRAPHY from '@constants/typography';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from 'types/navigation';
import VALIDATOR from '@utils/validator';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: LoginProps) => {
  const [email, setEmail] = useState<string>('');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');

  const [password, setPassword] = useState<string>('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');

  useEffect(() => {
    const emailValidatorResponse = VALIDATOR.email(email);
    setEmailErrorMessage(emailValidatorResponse);
  }, [email]);

  useEffect(() => {
    const passwordValidatorResponse = VALIDATOR.password(password);
    setPasswordErrorMessage(passwordValidatorResponse);
  }, [password]);

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handleSkip = () => {
    navigation.navigate('Onboarding');
  };

  const handleLogin = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <LoginHeader onSkip={handleSkip} />
      <View style={styles.formTitleContainer}>
        <Text style={styles.formTitle}>Masuk ke Investly</Text>
      </View>
      <View style={styles.formContainer}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          label="Email"
          onChangeText={handleEmailChange}
          state={
            email ? (emailErrorMessage === '' ? 'success' : 'error') : 'default'
          }
          errorMessage={emailErrorMessage}
        />
        <View>
          <Input
            type="password"
            placeholder="Password"
            value=""
            label="Password"
            onChangeText={value => setPassword(value)}
            state={
              password
                ? passwordErrorMessage === ''
                  ? 'success'
                  : 'error'
                : 'default'
            }
            errorMessage={passwordErrorMessage}
          />
          <Button
            label="Lupa Password?"
            onPress={() => Alert.alert('Lupa Password?')}
            variant="link"
            size="small"
            width={100}
          />
        </View>
      </View>
      <Button
        onPress={handleLogin}
        width="full"
        label="Masuk"
        variant="primary"
        size="medium"
        disabled={emailErrorMessage !== '' || passwordErrorMessage !== ''}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
  formContainer: {
    marginTop: 32,
    flex: 12,
    gap: 20,
    width: '100%',
  },
  formTitleContainer: {
    flex: 1,
    marginTop: 24,
  },
  formTitle: {
    color: 'black',
    ...TYPOGRAPHY.heading.xLarge,
  },
});
