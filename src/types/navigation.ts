import { NavigationProp } from '@react-navigation/native';

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  HomeScreen: HomeScreenParamList | undefined;
  DetailPost: undefined;
  CreatePost: undefined;
  Register: undefined;
};

export type StackNavigation = NavigationProp<RootStackParamList>;

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
