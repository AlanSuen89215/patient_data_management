import React from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, Pressable } from "react-native";

export default function LoginScreen({ navigation }) {
  const onBtnSignInPressed = () => {
    navigation.navigate("PatientList");
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Image style={styles.photo} source={require("./assets/logo.jpg")} />
      </View>
      <Text style={styles.text}> WeCare Elderly Home </Text>
      <Text style={styles.text}> Staff Portal</Text>
      {/* <Button title="Sign In" style={styles.rowContainer} onPress={onBtnSignInPressed} /> */}
      <View style={styles.rowContainer}>
        <Pressable style={styles.rowContainer} onPress={onBtnSignInPressed}>
          <Text style={styles.text}>Log In</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
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
});
