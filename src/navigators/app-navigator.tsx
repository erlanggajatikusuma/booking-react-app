import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DetailScreen, HomeScreen} from '../screens';

export type AppNavigatorParamList = {
  'App.Home': undefined;
  'App.Home.Detail': undefined;
};

const Stack = createNativeStackNavigator<AppNavigatorParamList>();

export const AppStack = {
  index: 0,
  routes: [
    {
      name: 'App.Stack',
      state: {index: 0, routes: [{name: 'App.Home'}]},
    },
  ],
};

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="App.Home"
        options={{headerShown: false, title: ''}}
        component={HomeScreen}
      />
      <Stack.Screen
        name="App.Home.Detail"
        options={{
          headerShown: true,
          title: 'Payment Details',
          headerShadowVisible: false,
        }}
        component={DetailScreen}
      />
    </Stack.Navigator>
  );
};
