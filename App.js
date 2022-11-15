import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './LoginScreen'
import DrawerItems from './DrawerItems';
import DrawerHeader from './DrawerHeader';
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

  const getDrawerOption = (displayedName) => {
    return {
      headerShown: true,
      title: displayedName,
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
                    component = { drawer.component }
                    options = { getDrawerOption(drawer.displayedName) }
                  />
              )
            :
              <Drawer.Screen 
                key = { 'Login' }
                name = { 'Login' }
                component = { LoginScreen }
                options = { getDrawerOption('Login') }
              />
          }
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}