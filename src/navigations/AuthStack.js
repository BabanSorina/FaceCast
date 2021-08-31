import React, { useEffect, useState } from 'react';
import OnboardingScreen from '../components/screens/OnboardingScreen';
import RegisterScreen from '../components/screens/RegisterScreen';
import RegisterScreen2 from '../components/screens/RegisterScreen2';
import LogInScreen from '../components/screens/LogInScreen';
import { createStackNavigator } from '@react-navigation/stack';



import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackRouter } from 'react-navigation';
import EditProfileScreen from '../components/screens/EditProfileScreen';

const Stack = createStackNavigator();
const AuthStack = () => {
  let routeName;

  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    })
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    routeName = 'Onboarding';
  }
  else {
    routeName = 'LogIn';
  }
  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="LogIn"
        component={LogInScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Register2"
        component={RegisterScreen2}
        options={{ header: () => null }}
      />
    </Stack.Navigator>

  )
};

export default AuthStack;