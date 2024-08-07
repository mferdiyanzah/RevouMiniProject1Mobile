import Loader from '@components/atoms/Loader';
import COLORS from '@constants/colors';
import TYPOGRAPHY from '@constants/typography';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import React, { memo, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { TopTabHomeParamList } from 'types/navigation';
import Newest from './Newest';
import Trending from './Trending';

const TopTab = createMaterialTopTabNavigator<TopTabHomeParamList>();

const HomeTopTab = () => {
  const renderLoader = useCallback(() => <Loader isLoading={true} />, []);

  const screenOptions: MaterialTopTabNavigationOptions = useMemo(
    () => ({
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: 'black',
      tabBarLabelStyle: styles.tabBarLabel,
      tabBarStyle: styles.tabBar,
      tabBarIndicatorStyle: styles.tabBarIndicator,
      lazy: true,
      lazyPlaceholder: renderLoader,
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <TopTab.Navigator screenOptions={screenOptions}>
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

export default memo(HomeTopTab);

const styles = StyleSheet.create({
  tabBarLabel: {
    ...TYPOGRAPHY.heading.small,
    textTransform: 'none',
  },
  tabBar: {
    backgroundColor: COLORS.light,
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral300,
  },
  tabBarIndicator: {
    width: '42%',
    marginHorizontal: 16,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
