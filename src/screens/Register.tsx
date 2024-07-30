import AccountCredential from '@components/organisms/AccountCredential';
import InterestTopicSelection from '@components/organisms/InterestTopicSelection';
import PersonalInformation from '@components/organisms/PersonalInformation';
import useRegisterStore from '@stores/useRegisterStore';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

const Register = () => {
  const currentStep = useRegisterStore(state => state.currentStep);

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
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  formTitleContainer: {
    marginTop: 24,
  },
});
