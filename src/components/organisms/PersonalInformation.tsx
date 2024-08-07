import Button from '@components/atoms/Button';
import Input from '@components/atoms/Input';
import Typography from '@components/atoms/Typography';
import COLORS from '@constants/colors';
import useFetchUsername from '@hooks/queries/useFetchUsername';
import useRegisterStore from '@stores/useRegisterStore';
import VALIDATOR from '@utils/validator';
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';
import AuthHeader from './AuthHeader';

import analytics from '@react-native-firebase/analytics';

const PersonalInformation = () => {
  const { name, username, email, setName, setUsername, setCurrentStep } =
    useRegisterStore();

  const {
    isSuccess: isUsernameExisted,
    isFetching: isCheckingUsername,
    refetch: checkUsername,
  } = useFetchUsername(username || '');

  const usernameValidationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>('');

  useEffect(() => {
    const validateUsername = async () => {
      if (!username) {
        setUsernameErrorMessage('Username tidak boleh kosong');
      } else if (isUsernameExisted) {
        setUsernameErrorMessage(
          'Username telah dipakai, gunakan username lain',
        );
        await analytics().logEvent('failed_validate_register_username', {
          username,
        });
      } else {
        setUsernameErrorMessage('');
      }
    };

    if (!username) {
      setUsernameErrorMessage('Username tidak boleh kosong');
      return;
    }

    if (usernameValidationTimeoutRef.current) {
      clearTimeout(usernameValidationTimeoutRef.current);
    }

    usernameValidationTimeoutRef.current = setTimeout(() => {
      checkUsername();
      validateUsername();
    }, 500);

    return () => {
      if (usernameValidationTimeoutRef.current) {
        clearTimeout(usernameValidationTimeoutRef.current);
      }
    };
  }, [username, checkUsername, isUsernameExisted]);

  const nameErrorMessage = useMemo(() => {
    return VALIDATOR.name(name || '');
  }, [name]);

  const isNextButtonDisabled = useMemo(() => {
    return !name || !username;
  }, [name, username]);

  const handleNextStep = useCallback(async () => {
    await analytics().logEvent('click_register_button_step_2', {
      username,
      email,
      name,
    });

    setCurrentStep(3);
  }, [email, name, setCurrentStep, username]);

  const handlePreviousStep = useCallback(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);

  const usernameState = useMemo(() => {
    return typeof username === 'string'
      ? usernameErrorMessage
        ? 'error'
        : 'success'
      : 'default';
  }, [username, usernameErrorMessage]);

  const nameState = useMemo(() => {
    return name ? (nameErrorMessage ? 'error' : 'success') : 'default';
  }, [name, nameErrorMessage]);

  return (
    <View style={styles.container}>
      <AuthHeader
        rightAction={() => {}}
        goToPreviousScreen={handlePreviousStep}
        isLogoHidden={true}
      />
      <View style={styles.formTitleContainer}>
        <Typography type="heading" size="xLarge">
          Buat Akun
        </Typography>
      </View>
      <View style={styles.formContainer}>
        <Input
          type="text"
          placeholder="Nama"
          value={name}
          label="Nama"
          onChangeText={setName}
          state={nameState}
          errorMessage={nameErrorMessage}
        />
        <Input
          type="text"
          placeholder="Username"
          value={username}
          label="Username"
          onChangeText={setUsername}
          state={usernameState}
          errorMessage={usernameErrorMessage}
          loading={isCheckingUsername}
        />
      </View>
      <View style={styles.registerContainer}>
        <View style={styles.stepperContainer}>
          <Typography type="paragraph" size="small">
            2 dari 3
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

export default memo(PersonalInformation);

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
    width: '66%',
  },
});
