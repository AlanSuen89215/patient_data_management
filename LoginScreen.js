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
      <View style={styles.columnContainer}>
        <Text style={[styles.rowContainer ,styles.text]}> WeCare Elderly Home </Text>
        <Text style={[styles.rowContainer ,styles.text]}> Staff Portal</Text>
        <Text style={[styles.rowContainer ,styles.text]}>User</Text>
        <TextInput style={[styles.rowContainer ,styles.textInput]}></TextInput>
        <Text style={[styles.rowContainer ,styles.text]}>Password</Text>
        <TextInput style={[styles.rowContainer ,styles.textInput]}></TextInput>
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
