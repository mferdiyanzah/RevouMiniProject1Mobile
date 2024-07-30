import Button from '@components/atoms/Button';
import HomeTab from '@components/bottom-tabs/Home/HomeTab';
import ProfileTab from '@components/bottom-tabs/Home/ProfileTab';
import TabBarIcon from '@components/molecules/TabBarIcon';
import COLORS from '@constants/colors';
import TYPOGRAPHY from '@constants/typography';
import { useApp } from '@contexts/app';
import { HomeContext } from '@contexts/home';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from 'types/navigation';

const Tab = createBottomTabNavigator();

type HomeProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

const Home = ({ route, navigation }: HomeProps) => {
  const { isLoggedIn } = useApp();

  const goToLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const RenderLoginInvitation = useCallback(() => {
    if (isLoggedIn) {
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
  }, [isLoggedIn, goToLogin]);

  const screenOptions = useCallback(
    ({ route }: { route: any }): BottomTabNavigationOptions => ({
      headerShown: false,
      tabBarIcon: ({ focused }) => TabBarIcon({ focused, route }),
      tabBarLabelStyle: [styles.tabBarLabel],
      tabBarActiveTintColor: COLORS.primary,
      tabBarIconStyle: {
        borderWidth: 1,
        marginTop: 4,
      },
    }),
    [],
  );
  return (
    <HomeContext.Provider value={{ navigation, route }}>
      <View style={styles.container}>
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen name="Home" component={HomeTab} />
          <Tab.Screen name="Profile" component={ProfileTab} />
        </Tab.Navigator>
        {RenderLoginInvitation()}
      </View>
    </HomeContext.Provider>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  promoContainer: {
    position: 'absolute',
    bottom: 68,
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
