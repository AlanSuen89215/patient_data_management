import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PatientListScreen from './PatientListScreen'
import ViewPatientScreen from './ViewPatientScreen'
import PatientRecord from './PatientRecord'
import AddPatientScreen from './AddPatientScreen'
import PatientInCriticalListScreen from './PatientInCriticalListScreen'
import AddRecordScreen from './AddRecordScreen'

const PatientListStack  = createStackNavigator()
export function PatientListStackScreen() {
  return (
    <PatientListStack.Navigator
      initialRouteName="PatientList"
    >
      <PatientListStack.Screen
        name="PatientList"
        component={PatientListScreen}
        options={{ title: 'Patients' }}
      />

      <PatientListStack.Screen
        name="ViewPatient"
        component={ViewPatientScreen}
        options={{ title: "Patient's profile" }}
      />

      <PatientListStack.Screen
        name="PatientRecord"
        component={PatientRecord}
        options={{ title: 'Patient Records' }}
      />

      <PatientListStack.Screen
        name="AddRecord"
        component={AddRecordScreen}
        options={{ title: 'Add patient record' }}
      />
    </PatientListStack.Navigator>
  )
}

const AddPatientStack = createStackNavigator()
export function AddPatientStackScreen() {
  return (
    <AddPatientStack.Navigator
      initialRouteName="AddPatient"
    >
      <AddPatientStack.Screen
        name="AddPatient"
        component={AddPatientScreen}
        options={{ title: 'Add patient' }}
      />
    </AddPatientStack.Navigator>
  )
}

const PatientInCriticalListStack = createStackNavigator()
export function PatientInCriticalListStackScreen() {
  return (
    <PatientInCriticalListStack.Navigator
      initialRouteName="PatientInCriticalList"
    >
      <PatientInCriticalListStack.Screen
        name="PatientInCriticalList"
        component={PatientInCriticalListScreen}
        options={{ title: 'Patients in critical condition' }}
      />
    </PatientInCriticalListStack.Navigator>
  )
}
