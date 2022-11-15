import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddPatientScreen from './AddPatientScreen';
import LoginScreen from './LoginScreen'
import ViewPatientScreen from './ViewPatientScreen';
import PatientListScreen from './PatientListScreen';
import PatientInCriticalListScreen from './PatientInCriticalListScreen';
import DrawerItems from './DrawerItems';
import DrawerHeader from './DrawerHeader';
import PatientRecord from './PatientRecord'
import AddRecordScreen  from './AddRecordScreen';
import AuthContext from './AuthContext';

const Drawer = createDrawerNavigator();

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignedIn: true
          }
      }
    },
    {
      isSignedIn: false
    }
  )

  const authContext = React.useMemo( () => ({
    signIn: () => dispatch({ type: 'SIGN_IN' })
  }), [])

  const getScreen = (name) => {
    switch(name) {
      case "Login":
        return LoginScreen
      case "AddPatient":
        return AddPatientScreen
      case "ViewPatient":
        return ViewPatientScreen
      case "PatientList":
        return PatientListScreen
      case "PatientInCriticalList":
        return PatientInCriticalListScreen
      case "PatientRecord":
        return PatientRecord
        case "AddRecord":
        return AddRecordScreen
      default:
        return LoginScreen
    }
  }

  const getDrawerDisplayedName = (name) => {
    switch(name) {
      case "Login":
        return "Login"
      case "AddPatient":
        return "Add patient"
      case "ViewPatient":
        return "View Patient"
      case "PatientList":
        return "Patients"
      case "PatientInCriticalList":
        return "Critical"
      case "PatientRecord":
        return "Patient Record"
        case "AddRecord":
        return "Add record"
      default:
        return ""
    }
  }

  const getScreenHeaderTitle = (name) => {
    switch(name) {
      case "Login":
        return "Login"
      case "AddPatient":
        return "Add patient"
      case "ViewPatient":
        return "Patient's profile"
      case "PatientList":
        return "Patients"
      case "PatientInCriticalList":
        return "Patients in critical condition"
      case "PatientRecord":
        return "Patient Records"
        case "AddRecord":
        return "Add patient record"
      default:
        return ""
    }
  }

  const getDrawerOption = (name) => {
    return {
      headerShown: true,
      headerTitle: getScreenHeaderTitle(name),
      title: getDrawerDisplayedName(name),
      header: (scene) => {
        const title = scene.options.headerTitle
        
        return (
          <DrawerHeader screen={title}/>
        )
      }
    }
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerType = "front"
          screenOptions = {{
            activeTintColor: '#e91e63',
            itemStyle: { marginVertical: 10 }
          }}
        >
          {
            state.isSignedIn ?
              DrawerItems.DoctorAndNurseItems.map(
                drawer => 
                  <Drawer.Screen 
                    key = { drawer.name }
                    name = { drawer.name }
                    component = { getScreen(drawer.name) }
                    options = { getDrawerOption(drawer.name) }
                  />
              )
            :
              <Drawer.Screen 
                key = { 'Login' }
                name = { 'Login' }
                component = { getScreen('Login') }
                options = { getDrawerOption('Login') }
              />
          }
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}