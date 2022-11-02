import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddPatientScreen from './AddPatientScreen';
import LoginScreen from './LoginScreen'

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login" component={LoginScreen}/>
        <Stack.Screen
          name="AddPatient" component={AddPatientScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
