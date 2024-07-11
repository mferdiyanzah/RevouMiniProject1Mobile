import COLORS from '@constants/colors';
import TYPOGRAPHY from '@constants/typography';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
  const screenOptions: MaterialTopTabNavigationOptions = useMemo(
    () => ({
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: 'black', // Set inactive tab title color to black
      tabBarLabelStyle: styles.tabBarLabel,
      tabBarStyle: styles.tabBar,
      tabBarIndicatorStyle: styles.tabBarIndicator,
    }),
    [],
  );

  return (
    <TopTab.Navigator initialRouteName="Trending" screenOptions={screenOptions}>
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

const styles = StyleSheet.create({
  tabBarLabel: {
    ...TYPOGRAPHY.heading.small,
    textTransform: 'none',
  },
  tabBar: {
    backgroundColor: COLORS.light,
  },
  tabBarIndicator: {
    width: '40%',
    marginHorizontal: 16,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
});
