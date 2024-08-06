import {
  NavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  HomeScreen: NavigatorScreenParams<BottomTabParamList> | undefined;
  DetailPost: { id: string };
  CreatePost: undefined;
  Register: undefined;
};

export type BottomTabParamList = {
  Home: NavigatorScreenParams<TopTabHomeParamList>;
  Profile: undefined;
};

export type TopTabHomeParamList = {
  Trending: undefined;
  Terbaru: { refetch?: boolean };
};

export type StackNavigation = NavigationProp<RootStackParamList>;

export type TopTabStackNavigation = NavigationProp<TopTabHomeParamList>;

export type BottomTabStackNavigation = NavigationProp<BottomTabParamList>;
