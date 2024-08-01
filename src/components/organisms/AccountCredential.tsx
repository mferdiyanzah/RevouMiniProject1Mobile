import Button from '@components/atoms/Button';
import Input from '@components/atoms/Input';
import Typography from '@components/atoms/Typography';
import COLORS from '@constants/colors';
import { useNavigation } from '@react-navigation/native';
import useRegisterStore from '@stores/useRegisterStore';
import VALIDATOR from '@utils/validator';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigation } from 'types/navigation';
import AuthHeader from './AuthHeader';
import useCheckEmail from '@hooks/mutations/useCheckEmail';
import analytics from '@react-native-firebase/analytics';

const AccountCredential = () => {
  const {
    email,
    password,
    confirmPassword,
    setEmail,
    setPassword,
    setConfirmPassword,
    setCurrentStep,
  } = useRegisterStore();

  const { mutateAsync: checkEmail, isPending: isCheckingEmail } =
    useCheckEmail();

  const [emailErrorMessage, setEmailErrorMessage] = useState<
    string | undefined
  >();
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');

  const navigation = useNavigation<StackNavigation>();

  const emailValidationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof email === 'string') {
      const emailValidatorResponse = VALIDATOR.email(email);
      if (emailValidatorResponse) {
        setEmailErrorMessage(emailValidatorResponse);
      } else {
        if (emailValidationTimeoutRef.current) {
          clearTimeout(emailValidationTimeoutRef.current);
        }
        emailValidationTimeoutRef.current = setTimeout(async () => {
          try {
            const isEmailExisted = await checkEmail(email);
            setEmailErrorMessage(
              isEmailExisted ? 'Email telah dipakai, gunakan email lain' : '',
            );
            if (isEmailExisted) {
              await analytics().logEvent('failed_validate_register_email', {
                email,
              });
            }
          } catch (error) {
            setEmailErrorMessage('Terjadi kesalahan saat memeriksa email');
          }
        }, 500);
      }
    }
  }, [email, checkEmail]);

  useEffect(() => {
    const passwordValidatorResponse = VALIDATOR.password(password || '');
    setPasswordErrorMessage(passwordValidatorResponse);
  }, [password]);

  const handleEmailChange = (value: string) => {
    const formattedEmail = value.toLowerCase();
    setEmail(formattedEmail);
  };

  const isNextButtonDisabled = useMemo(() => {
    return (
      !email ||
      !password ||
      !confirmPassword ||
      emailErrorMessage !== '' ||
      passwordErrorMessage !== '' ||
      confirmPassword !== password
    );
  }, [
    email,
    password,
    confirmPassword,
    emailErrorMessage,
    passwordErrorMessage,
  ]);

  const handleNextStep = useCallback(async () => {
    await analytics().logEvent('click_register_button_step_1', { email });

    setCurrentStep(2);
  }, [setCurrentStep, email]);

  const goToLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const emailState = useMemo(() => {
    return typeof email === 'string'
      ? emailErrorMessage === ''
        ? 'success'
        : 'error'
      : 'default';
  }, [email, emailErrorMessage]);

  const passwordState = useMemo(() => {
    return typeof password === 'string'
      ? passwordErrorMessage === ''
        ? 'success'
        : 'error'
      : 'default';
  }, [password, passwordErrorMessage]);

  const confirmPasswordState = useMemo(() => {
    return confirmPassword
      ? confirmPassword === password
        ? 'success'
        : 'error'
      : 'default';
  }, [confirmPassword, password]);

  const goToPreviousScreen = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <AuthHeader
        rightAction={goToLogin}
        rightActionLabel="Masuk"
        goToPreviousScreen={goToPreviousScreen}
      />
      <View style={styles.formTitleContainer}>
        <Typography type="heading" size="xLarge">
          Buat Akun
        </Typography>
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
          loading={isCheckingEmail}
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
        <Input
          type="password"
          placeholder="Konfirmasi Password"
          value={confirmPassword}
          label="Konfirmasi Password"
          onChangeText={setConfirmPassword}
          state={confirmPasswordState}
          errorMessage="Password tidak sama"
        />
      </View>
      <View style={styles.registerContainer}>
        <View style={styles.stepperContainer}>
          <Typography type="paragraph" size="small">
            1 dari 3
          </Typography>
          <View style={styles.dashedLineContainer}>
            <View style={styles.dashedLine} />
          </View>
        </View>
        <Button
          width="full"
          label="Selanjutnya"
          variant="primary"
          size="medium"
          disabled={isNextButtonDisabled}
          onPress={handleNextStep}
        />
      </View>
    </View>
  );
};

export default React.memo(AccountCredential);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
  },
  formTitleContainer: {
    marginBottom: 16,
  },
  formContainer: {
    marginTop: 32,
    marginBottom: 16,
    gap: 24,
    width: '100%',
  },
  registerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    gap: 16,
  },
  stepperContainer: {
    marginTop: 16,
  },
  dashedLineContainer: {
    height: 4,
    backgroundColor: COLORS.neutral300,
    width: '100%',
  },
  dashedLine: {
    height: 4,
    backgroundColor: COLORS.primary,
    width: '33%',
  },
});
