import Icon, { IconVariant } from '@components/atoms/Icon';
import Typography from '@components/atoms/Typography';
import COLORS from '@constants/colors';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import CodePush from 'react-native-code-push';

const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconVariant = label.toString().toLowerCase() as IconVariant;

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tab}>
            <Icon
              variant={iconVariant}
              style={
                {
                  color: isFocused ? COLORS.primary : COLORS.neutral400,
                } as ViewStyle
              }
            />

            <Typography
              type="heading"
              size="xSmall"
              style={[
                styles.label,
                isFocused ? styles.labelFocused : styles.labelUnfocused,
              ]}>
              {label as string}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 89,
    paddingTop: 13,
    paddingRight: 0,
    paddingBottom: 32,
    paddingLeft: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopColor: COLORS.neutral300,
    borderTopWidth: 1,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
  },
  labelFocused: {
    color: COLORS.primary,
  },
  labelUnfocused: {
    color: COLORS.neutral400,
  },
});

export default CodePush(TabBar);
