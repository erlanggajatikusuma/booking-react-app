import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DetailScreen, GuestScreen, HomeScreen} from '../screens';

export type AppNavigatorParamList = {
  'App.Home': undefined;
  'App.Home.Detail': undefined;
  'App.Home.Detail.Guest': undefined;
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
          headerTitle: 'Payment Details',
          headerShadowVisible: false,
        }}
        component={DetailScreen}
      />
      <Stack.Screen
        name="App.Home.Detail.Guest"
        options={{
          headerShown: true,
          title: 'Tambah Data Tamu',
          headerBackTitleVisible: false,
          headerShadowVisible: false,
        }}
        component={GuestScreen}
      />
    </Stack.Navigator>
  );
};