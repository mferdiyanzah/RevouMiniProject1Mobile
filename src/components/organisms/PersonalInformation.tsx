import Button from '@components/atoms/Button';
import Input from '@components/atoms/Input';
import Typography from '@components/atoms/Typography';
import COLORS from '@constants/colors';
import { useNavigation } from '@react-navigation/native';
import useRegisterStore from '@stores/useRegisterStore';
import React, { useCallback, useEffect, useMemo } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { StackNavigation } from 'types/navigation';
import AuthHeader from './AuthHeader';

const PersonalInformation = () => {
  const { name, username, setName, setUsername, currentStep, setCurrentStep } =
    useRegisterStore();

  const navigation = useNavigation<StackNavigation>();

  useEffect(() => {
    const handleBackButton = () => {
      const previousStep = currentStep - 1;

      if (currentStep === 1) {
        navigation.goBack();
      } else {
        setCurrentStep(previousStep);
      }
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isNextButtonDisabled = useMemo(() => {
    return !name || !username;
  }, [name, username]);

  const handleNextStep = useCallback(() => {
    setCurrentStep(3);
  }, [setCurrentStep]);

  const handlePreviousStep = useCallback(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);

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
          placeholder="Nama Lengkap"
          value={name}
          label="Nama Lengkap"
          onChangeText={setName}
          state="default"
        />
        <Input
          type="text"
          placeholder="Username"
          value={username}
          label="Username"
          onChangeText={setUsername}
          state="default"
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

export default React.memo(PersonalInformation);

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
