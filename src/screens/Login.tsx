import Button from '@components/atoms/Button';
import Input from '@components/atoms/Input';
import Typography from '@components/atoms/Typography';
import AuthHeader from '@components/organisms/AuthHeader';
import TYPOGRAPHY from '@constants/typography';
import useLogin, { LoginResponse } from '@hooks/mutations/useLogin';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import VALIDATOR from '@utils/validator';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import { RootStackParamList } from 'types/navigation';

import analytics from '@react-native-firebase/analytics';

import useAuthStore from '@stores/useAuthStore';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: LoginProps) => {
  const { mutateAsync: onLogin, isPending: isLoginProcess } = useLogin();

  const { setAccessToken, setRefreshToken } = useAuthStore();

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

  const handleSkip = useCallback(() => {
    navigation.navigate('HomeScreen');
  }, [navigation]);

  const handleLogin = useCallback(async () => {
    const loginPayload = { email, password };

    const response = (await onLogin(loginPayload)) as LoginResponse;
    if (!response.status) {
      await analytics().logEvent('failed_login_account', loginPayload);
      ToastAndroid.show('Email atau Password Salah', 500);
    } else {
      await analytics().logEvent('success_login_account', loginPayload);
      setAccessToken(response.data.access_token);
      setRefreshToken(response.data.refresh_token);
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      });
    }
  }, [email, navigation, onLogin, password, setAccessToken, setRefreshToken]);

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

  const goToRegister = useCallback(async () => {
    await analytics().logEvent('click_register_button');

    navigation.navigate('Register');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <AuthHeader
        rightAction={handleSkip}
        rightActionLabel="Lewati"
        goToPreviousScreen={goToPreviousScreen}
      />
      <View style={styles.formTitleContainer}>
        <Typography style={styles.formTitle}>Masuk ke Investly</Typography>
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
        <Input
          type="password"
          placeholder="Password"
          value={password}
          label="Password"
          onChangeText={setPassword}
          state={passwordState}
          errorMessage={passwordErrorMessage}
        />
      </View>
      <View style={styles.forgetPasswordAndCtaContainer}>
        <Button
          label="Lupa Password?"
          onPress={() => Alert.alert('Lupa Password?')}
          variant="link"
          size="small"
          width={100}
        />
        <Button
          onPress={handleLogin}
          width="full"
          label={isLoginProcess ? <ActivityIndicator /> : 'Masuk'}
          variant="primary"
          size="medium"
          disabled={isLoginButtonDisabled}
        />
      </View>
      <View style={styles.registerContainer}>
        <Button
          onPress={goToRegister}
          width="full"
          label="Daftar"
          variant="outline"
          size="medium"
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 12,
    paddingBottom: 44,
    paddingHorizontal: 24,
  },
  formContainer: {
    marginTop: 32,
    marginBottom: 16,
    gap: 24,
    width: '100%',
  },
  formTitleContainer: {
    marginTop: 24,
  },
  formTitle: {
    color: 'black',
    ...TYPOGRAPHY.heading.xLarge,
  },
  forgetPasswordAndCtaContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    gap: 24,
  },
  registerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
});
