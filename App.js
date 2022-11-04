import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddPatientScreen from './AddPatientScreen';
import LoginScreen from './LoginScreen'
import ViewPatientScreen from './ViewPatientScreen';
import PatientListScreen from './PatientListScreen';
import PatientInCriticalListScreen from './PatientInCriticalListScreen';
import AddRecordScreen from './AddRecordScreen';
export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="AddPatient" component={AddPatientScreen} options={{ title: 'Add Patient' }} />
        <Stack.Screen name="ViewPatient" component={ViewPatientScreen} options={{ title: "Patient's profile" }} />
        <Stack.Screen name="PatientList" component={PatientListScreen} options={{ title: "Patients" }} />
        <Stack.Screen name="PatientInCriticalList" component={PatientInCriticalListScreen} options={{ title: "Patients in critical condition" }} />
        <Stack.Screen name="AddRecord" component={AddRecordScreen} options={{ title: "Add Record" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
