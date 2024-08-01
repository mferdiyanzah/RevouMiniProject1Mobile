import AccountCredential from '@components/organisms/AccountCredential';
import InterestTopicSelection from '@components/organisms/InterestTopicSelection';
import PersonalInformation from '@components/organisms/PersonalInformation';
import { useNavigation } from '@react-navigation/native';
import useRegisterStore from '@stores/useRegisterStore';
import React, { useEffect, useMemo } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { StackNavigation } from 'types/navigation';

const Register = () => {
  const { currentStep, setCurrentStep } = useRegisterStore();

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

  const RenderCurrentForm = useMemo(() => {
    switch (currentStep) {
      case 1:
        return <AccountCredential />;
      case 2:
        return <PersonalInformation />;
      case 3:
        return <InterestTopicSelection />;
      default:
        return <AccountCredential />;
    }
  }, [currentStep]);

  return <View style={styles.container}>{RenderCurrentForm}</View>;
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 12,
    paddingBottom: 44,
    paddingHorizontal: 24,
  },
  formTitleContainer: {
    marginTop: 24,
  },
});
