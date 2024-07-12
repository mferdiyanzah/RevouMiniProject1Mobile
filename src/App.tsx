import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { RootStackParamList } from 'types/navigation';
import Home from './screens/Home';
import Login from './screens/Login';
import Onboarding from './screens/Onboarding';
import { AppContext } from '@contexts/app';
import { IData } from 'types/data';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [feedData, setFeedData] = useState<IData[]>([]);

  return (
    <AppContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, feedData, setFeedData }}>
      {children}
    </AppContext.Provider>
  );
};

function App(): React.JSX.Element {
  return (
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
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;
