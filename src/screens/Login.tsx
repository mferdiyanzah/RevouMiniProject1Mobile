import Input from '@components/atoms/Input';
import TYPOGRAPHY from '@constants/typography';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LeftArrowSVG from '../assets/icons/left-arrow.svg';
import LogoSVG from '../assets/icons/logo.svg';
import Button from '@components/atoms/Button';

const LoginHeader = () => {
  return (
    <View style={loginHeaderStyles.container}>
      <LeftArrowSVG />
      <LogoSVG />
      <Text>Lewati</Text>
    </View>
  );
};

const loginHeaderStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 16,
  },
});

const Login = () => {
  const [email, setEmail] = useState<string>('');

  const isEmailValid = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, [email]);

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  return (
    <View style={styles.container}>
      <LoginHeader />
      <View style={styles.formTitleContainer}>
        <Text style={styles.formTitle}>Masuk ke Investly</Text>
      </View>
      <View style={styles.formContainer}>
        <Input
          type="email"
          placeholder="Email"
          value=""
          label="Email"
          onChangeText={handleEmailChange}
          state={isEmailValid ? 'success' : 'error'}
          errorMessage="Email is not valid"
        />
        <Input
          type="password"
          placeholder="Password"
          value=""
          label="Password"
        />
      </View>
      <Button width="full" label="Masuk" variant="primary" size="large" />
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
  },
  formContainer: {
    flex: 12,
    width: '100%',
    // padding: 16,
  },
  formTitleContainer: {
    flex: 1,
    marginBottom: 16,
    marginTop: 16,
  },
  formTitle: {
    color: 'black',
    ...TYPOGRAPHY.heading.xLarge,
  },
});
