/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Introduction, Jobs, SavedJobs} from './pages'

const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Intro'
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
      >
        <Stack.Screen name="Intro" component={Introduction} />
        <Stack.Screen name="Jobs" component={Jobs} />
        <Stack.Screen name="SavedJobs" component={SavedJobs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
