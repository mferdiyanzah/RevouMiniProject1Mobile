import { View, Text } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import COLORS from '@constants/colors';
import Trending from './Trending';

const TopTab = createMaterialTopTabNavigator();

const Newest = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Newest</Text>
    </View>
  );
};

const FeedsTabLayout = () => {
  return (
    <TopTab.Navigator
      initialRouteName="For You"
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '700' },
        tabBarStyle: { backgroundColor: 'white' },
      }}>
      <TopTab.Screen
        name="Trending"
        component={Trending}
        options={{ tabBarLabel: 'Trending' }}
      />
      <TopTab.Screen
        name="Terbaru"
        component={Newest}
        options={{ tabBarLabel: 'Terbaru' }}
      />
    </TopTab.Navigator>
  );
};

export default FeedsTabLayout;
