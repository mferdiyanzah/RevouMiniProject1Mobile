import React from 'react';
import Icon from '@components/atoms/Icon';
import COLORS from '@constants/colors';
import { ViewStyle } from 'react-native';

interface TabBarIconProps {
  focused: boolean;
  route: any;
}

const TabBarIcon = ({ focused, route }: TabBarIconProps) => {
  return (
    <Icon
      variant={route.name.toLowerCase()}
      size={24}
      style={{ color: focused ? COLORS.primary : COLORS.gray } as ViewStyle}
    />
  );
};

export default TabBarIcon;
