import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './LoginScreen'
import DrawerItems from './DrawerItems';
import DrawerHeader from './DrawerHeader';
import AuthInfo from './AuthInfo';
import EndPointConfig from './EndPointConfig';

const Drawer = createDrawerNavigator();

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SIGN_IN':
          AuthInfo.userType = action.userType
          return {
            ...prevState,
            isSignedIn: true,
            userType: action.userType
          }
      }
    },
    {
      isSignedIn: false,
      userType: ''
    }
  )

  const authContext = React.useMemo( () => ({
    signIn: async (user, password) => {
      const loginParams = {
        user_name: user,
        password: password
      }
      await fetch(EndPointConfig.urlLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginParams)
      })
        .then(async (response) => {
          if (response.status == 200) {
            // login success
            let data = await response.json()
            dispatch({ type: 'SIGN_IN', userType: data.user_type})
          }
          else {
            // server reject the login
            alert("Fail to login")
          }
        })
        .catch( (error) => {
          // unknown error
          console.error("Fail to login due to unknown error. " + error)
          alert("Fail to login due to unknown error")
        })
    }
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
    <AuthInfo.AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerType = "front"
          screenOptions = {{
            activeTintColor: '#e91e63',
            itemStyle: { marginVertical: 10 },
            unmountOnBlur: true
          }}
        >
          {
            state.isSignedIn ?
              DrawerItems[state.userType].map(
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
    </AuthInfo.AuthContext.Provider>
  );
}