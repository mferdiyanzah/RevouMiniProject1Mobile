import Button from '@components/atoms/Button';
import Input from '@components/atoms/Input';
import LoginHeader from '@components/organisms/LoginHeader';
import TYPOGRAPHY from '@constants/typography';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from 'types/navigation';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: LoginProps) => {
  const [email, setEmail] = useState<string>('');

  const isEmailValid = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email === '' ? true : emailRegex.test(email);
  }, [email]);
  console.log(isEmailValid, 'isEmailValid');

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handleSkip = () => {
    navigation.navigate('Onboarding');
  };

  const handleLogin = () => {
    // Handle login logic here
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
      <Button
        onPress={handleLogin}
        width="full"
        label="Masuk"
        variant="primary"
        size="large"
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
    flex: 12,
    width: '100%',
  },
  formTitleContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  formTitle: {
    color: 'black',
    ...TYPOGRAPHY.heading.xLarge,
  },
});
