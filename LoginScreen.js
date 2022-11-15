import React from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, Pressable } from "react-native";
import AuthInfo from "./AuthInfo";

export default function LoginScreen({ navigation }) {
  const { signIn } = React.useContext(AuthInfo.AuthContext)
  const [user, setUser] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onBtnSignInPressed = async () => {
    // validate the user entries
    if (user === undefined || user === null || user === "") {
      alert('user is empty')
      return
    }
    if (password === undefined || password === null || password === "") {
      alert('password is empty')
      return
    }

    signIn(user, password)
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Image style={styles.photo} source={require("./assets/logo.jpg")} />
      </View>
      <View style={styles.columnContainer}>
        <Text style={[styles.rowContainer ,styles.text]}> WeCare </Text>
        <Text style={[styles.rowContainer ,styles.text]}> Staff Portal</Text>
        <Text style={[styles.rowContainer ,styles.text]}>User</Text>
        <TextInput 
          style={[styles.rowContainer ,styles.textInput]}
          onChangeText={(text) => setUser(text)}
          value={user}
        />
        <Text style={[styles.rowContainer ,styles.text]}>Password</Text>
        <TextInput
          style={[styles.rowContainer ,styles.textInput]}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <View style={styles.rowContainer}>
          <Pressable style={styles.rowContainer} onPress={onBtnSignInPressed}>
            <Text style={[styles.text, {color: '#FFFFFF', backgroundColor: '#388E3C'}]}>Log In</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    left: 0,
    width: '100%',
    height: '100%',
    paddingHorizontal: 5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: 14,
    paddingBottom: 20,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  columnContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  textInput: {
    borderWidth: 1,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
  photo: {
    height: 300,
    width: 300,
  },
  textInput: {
    borderWidth: 1,
    width: 300
  },
});
