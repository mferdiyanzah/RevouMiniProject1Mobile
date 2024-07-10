import Icon from '@components/atoms/Icon';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import DefaultHome from './DefaultHome';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, route }) => {
  return <Icon variant={route.name.toLowerCase()} />;
};

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }): BottomTabNavigationOptions => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => TabBarIcon({ focused, route }),
      })}>
      <Tab.Screen name="Home" component={DefaultHome} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Home;
