import Button from '@components/atoms/Button';
import HomeTab from '@components/bottom-tabs/Home/HomeTab';
import ProfileTab from '@components/bottom-tabs/Home/ProfileTab';
import TabBar from '@components/organisms/TabBar';
import COLORS from '@constants/colors';
import TYPOGRAPHY from '@constants/typography';
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useAuthStore from '@stores/useAuthStore';
import React, { memo, useCallback } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from 'types/navigation';

const Tab = createBottomTabNavigator();

type HomeProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

const Home = ({ navigation }: HomeProps) => {
  const { accessToken } = useAuthStore();

  const goToLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const RenderLoginInvitation = useCallback(() => {
    if (accessToken) {
      return null;
    }

    return (
      <View style={styles.promoContainer}>
        <Image source={require('@assets/images/investly-mascot.png')} />
        <View style={styles.promoTextContainer}>
          <Text style={styles.promoText}>Temukan inspirasi investasi,</Text>
          <Button variant="link" label="Masuk Yuk" onPress={goToLogin} />
        </View>
      </View>
    );
  }, [accessToken, goToLogin]);

  const screenOptions = useCallback(
    (): BottomTabNavigationOptions => ({
      headerShown: false,
    }),
    [],
  );

  const renderTabBar = useCallback(
    (props: BottomTabBarProps) => <TabBar {...props} />,
    [],
  );

  return (
    <View style={styles.container}>
      <Tab.Navigator screenOptions={screenOptions} tabBar={renderTabBar}>
        <Tab.Screen name="Home" component={HomeTab} />
        <Tab.Screen name="Profile" component={ProfileTab} />
      </Tab.Navigator>
      {RenderLoginInvitation()}
    </View>
  );
};

export default memo(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  promoContainer: {
    position: 'absolute',
    bottom: 88,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: COLORS.purple100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingLeft: 16,
  },
  promoTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  promoText: {
    ...TYPOGRAPHY.paragraph.small,
  },
  loginExclamation: {
    ...TYPOGRAPHY.paragraph.small,
    color: COLORS.primary,
  },
  tabBarLabel: {
    ...TYPOGRAPHY.heading.xSmall,
  },
});
