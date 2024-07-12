import COLORS from '@constants/colors';
import TYPOGRAPHY from '@constants/typography';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Newest from './Newest';
import Trending from './Trending';

const TopTab = createMaterialTopTabNavigator();

interface HomeTopTabProps {
  generateData: () => void;
}

const HomeTopTab = ({ generateData }: HomeTopTabProps) => {
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
        children={() => <Trending generateData={generateData} />}
        options={{ tabBarLabel: 'Trending' }}
      />
      <TopTab.Screen
        name="Terbaru"
        children={() => <Newest generateData={generateData} />}
        options={{ tabBarLabel: 'Terbaru' }}
      />
    </TopTab.Navigator>
  );
};

export default HomeTopTab;

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
