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

//const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {

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
      default:
        return LoginScreen
    }
  }

  return (
    <NavigationContainer>
     <Drawer.Navigator
        drawerType = "front"
        initialRouteName = "Login"
        screenOptions = {{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 10 }
        }}
      >
        {
          DrawerItems.map(
            drawer => 
              <Drawer.Screen 
               key = {drawer.name}
               name = {drawer.name}
               component = { getScreen(drawer.name) }
               options = {{
                 headerShown: true,
                 header: (scene) => {
                   //const descriptor = scene.descriptor
                   const title = scene.route.name
                   
                   return (
                     <DrawerHeader screen={title}/>
                   )
                 }
               }}
              />
          )
        }
      </Drawer.Navigator>
    </NavigationContainer>
    






    //<NavigationContainer>
    //  <Stack.Navigator initialRouteName="Login">
    //    <Stack.Screen name="Login" component={LoginScreen}/>
    //    <Stack.Screen name="AddPatient" component={AddPatientScreen} options={{ title: 'Add Patient' }} />
    //    <Stack.Screen name="ViewPatient" component={ViewPatientScreen} options={{ title: "Patient's profile" }} />
    //    <Stack.Screen name="PatientList" component={PatientListScreen} options={{ title: "Patients" }} />
    //    <Stack.Screen name="PatientInCriticalList" component={PatientInCriticalListScreen} options={{ title: "Patients in critical condition" }} />
    //  </Stack.Navigator>
    //</NavigationContainer>
  );
}