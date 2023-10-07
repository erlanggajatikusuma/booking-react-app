/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StoreProvider} from './src/context/store-context';
import {AppNavigator} from './src/navigators/app-navigator';

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

type NavigatorParamList = {
  'App.Stack': undefined;
};

const Stack = createNativeStackNavigator<NavigatorParamList>();

function App(props: NavigationProps): JSX.Element {
  return (
    <StoreProvider>
      <SafeAreaProvider>
        <NavigationContainer theme={DefaultTheme} {...props}>
          <Stack.Navigator initialRouteName="App.Stack">
            <Stack.Screen name="App.Stack" options={{headerShown: false}}>
              {AppNavigator}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </StoreProvider>
  );
}

export default App;
