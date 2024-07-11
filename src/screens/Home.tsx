import Icon from '@components/atoms/Icon';
import COLORS from '@constants/colors';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { useNavigationState } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import DefaultHome from './DefaultHome';
import Profile from './Profile';
import TYPOGRAPHY from '@constants/typography';
import Button from '@components/atoms/Button';
import HomeHeader from '@components/organisms/HomeHeader';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, route }: { focused: boolean; route: any }) => {
  console.log(route, focused);
  return (
    <Icon
      variant={route.name.toLowerCase()}
      size={24}
      style={{ color: focused ? COLORS.primary : COLORS.gray }}
    />
  );
};

const Home = () => {
  const navigationState = useNavigationState(state => state);

  const isHomeTabActive = () => {
    const currentRoute = navigationState.routes[navigationState.index];
    return currentRoute.state?.index === 0;
  };

  return (
    <View style={styles.container}>
      <HomeHeader />
      <Tab.Navigator
        screenOptions={({ route }): BottomTabNavigationOptions => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => TabBarIcon({ focused, route }),
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarActiveTintColor: COLORS.primary,
        })}>
        <Tab.Screen name="Home" component={DefaultHome} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
      {isHomeTabActive() ? (
        <View style={styles.promoContainer}>
          <Image source={require('@assets/images/investly-mascot.png')} />
          <View style={styles.promoTextContainer}>
            <Text style={styles.promoText}>Temukan inspirasi investasi,</Text>
            <Button variant="link" label="Masuk Yuk" />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  promoContainer: {
    position: 'absolute',
    bottom: 48,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: COLORS.purple100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
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
