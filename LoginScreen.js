import React from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';

export default function LoginScreen() {
    return (
        <Text style={{fontSize: 20}}>Login</Text>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 20
    },
    rowContainer: {
      flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 40
    },
    textInput: {
      borderWidth: 1
    }
});
