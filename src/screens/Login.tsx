import Button from '@components/atoms/Button';
import Input from '@components/atoms/Input';
import LoginHeader from '@components/organisms/LoginHeader';
import { CORRECT_EMAIL, CORRECT_PASSWORD } from '@constants/general';
import TYPOGRAPHY from '@constants/typography';
import { useApp } from '@contexts/app';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import VALIDATOR from '@utils/validator';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from 'types/navigation';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: LoginProps) => {
  const { setIsLoggedIn } = useApp();

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
    const formattedEmail = value.toLowerCase();
    setEmail(formattedEmail);
  };

  const handleSkip = () => {
    navigation.navigate('HomeScreen');
  };

  const handleLogin = () => {
    if (email === CORRECT_EMAIL && password === CORRECT_PASSWORD) {
      setIsLoggedIn(true);
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      });
      return;
    }

    Alert.alert('Email atau password salah');
  };

  const goToPreviousScreen = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const emailState = useMemo(() => {
    return email ? (emailErrorMessage === '' ? 'success' : 'error') : 'default';
  }, [email, emailErrorMessage]);

  const passwordState = useMemo(() => {
    return password
      ? passwordErrorMessage === ''
        ? 'success'
        : 'error'
      : 'default';
  }, [password, passwordErrorMessage]);

  const isLoginButtonDisabled = useMemo(() => {
    return emailErrorMessage !== '' || passwordErrorMessage !== '';
  }, [emailErrorMessage, passwordErrorMessage]);

  return (
    <View style={styles.container}>
      <LoginHeader
        onSkip={handleSkip}
        goToPreviousScreen={goToPreviousScreen}
      />
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
          state={emailState}
          errorMessage={emailErrorMessage}
        />
        <View>
          <Input
            type="password"
            placeholder="Password"
            value=""
            label="Password"
            onChangeText={setPassword}
            state={passwordState}
            errorMessage={passwordErrorMessage}
          />
        </View>
        <Button
          label="Lupa Password?"
          onPress={() => Alert.alert('Lupa Password?')}
          variant="link"
          size="small"
          width={100}
        />
      </View>
      <Button
        onPress={handleLogin}
        width="full"
        label="Masuk"
        variant="primary"
        size="medium"
        disabled={isLoginButtonDisabled}
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
