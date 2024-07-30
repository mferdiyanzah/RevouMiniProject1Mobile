import { AppContext } from '@contexts/app';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreatePost from '@screens/CreatePost';
import DetailPost from '@screens/DetailPost';
import React, { useMemo, useState } from 'react';
import { IData } from 'types/data';
import { RootStackParamList } from 'types/navigation';
import Home from './screens/Home';
import Login from './screens/Login';
import Onboarding from './screens/Onboarding';
import Register from '@screens/Register';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient();

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [feedData, setFeedData] = useState<IData[]>([]);
  const [selectedPost, setSelectedPost] = useState<IData | null>(null);

  const addFeedData = (data: IData) => {
    setFeedData(prevData => [data, ...prevData]);
  };

  const contextValue = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      feedData,
      setFeedData,
      selectedPost,
      setSelectedPost,
      addFeedData,
    }),
    [isLoggedIn, feedData, selectedPost],
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Onboarding">
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{
                title: 'Onboarding',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: 'Login',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="HomeScreen"
              component={Home}
              options={{
                title: 'Home',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="DetailPost"
              component={DetailPost}
              options={{
                title: 'Detail',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CreatePost"
              component={CreatePost}
              options={{
                title: 'Create Post',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                title: 'Register',
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
