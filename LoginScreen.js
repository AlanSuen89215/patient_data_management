import React from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';

export default function LoginScreen({navigation}) {
    const onBtnSignInPressed = () => {
        navigation.navigate('PatientList')
    }

    return (
        <View style={styles.container}>
          <Button title="Sign In" style={styles.rowContainer} onPress={onBtnSignInPressed} />
        </View>
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
