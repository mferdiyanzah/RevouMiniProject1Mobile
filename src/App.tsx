import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreatePost from '@screens/CreatePost';
import DetailPost from '@screens/DetailPost';
import Register from '@screens/Register';
import useAuthStore from '@stores/useAuthStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { RootStackParamList } from 'types/navigation';
import Home from './screens/Home';
import Login from './screens/Login';
import Onboarding from './screens/Onboarding';
import { ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient();

const App = () => {
  const { getCredentials, accessToken } = useAuthStore();

  const [initialRoute, setInitialRoute] = useState<
    keyof RootStackParamList | undefined
  >('Onboarding');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCredentials()
      .then(credentials => {
        if (credentials) {
          setInitialRoute('HomeScreen');
        } else {
          setInitialRoute('Onboarding');
        }
      })
      .catch(() => {
        setInitialRoute('Onboarding');
      })
      .finally(() => {
        setIsLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
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
    </QueryClientProvider>
  );
};

export default App;
