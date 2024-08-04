import { NavigationProp } from '@react-navigation/native';

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  HomeScreen: HomeScreenParamList | undefined;
  DetailPost: { id: number };
  CreatePost: undefined;
  Register: undefined;
};

type HomeScreenParamList = {
  screen?: keyof BottomTabParamList;
  params?: { screen?: keyof TopTabHomeParamList };
};

export type BottomTabParamList = {
  Home: { screen?: keyof TopTabHomeParamList };
  Profile: undefined;
};

export type TopTabHomeParamList = {
  Trending: undefined;
  Terbaru: undefined;
};

export type StackNavigation = NavigationProp<RootStackParamList>;

export type TopTabStackNavigation = NavigationProp<TopTabHomeParamList>;

export type BottomTabStackNavigation = NavigationProp<BottomTabParamList>;
