import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView,
  FlatList,
  Pressable
} from "react-native";

export default function PatientListScreen({ navigation }) {
  const onBtnAddPatientPressed = () => {
    navigation.navigate("AddPatient");
  };

  const onItemPressed = (patientName) => {
    navigation.navigate("ViewPatient");
  };

  let patientListData = [
    {
      id: "1",
      patientName: "Patient 1",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search patients"
        ></TextInput>
        <Pressable
          style={styles.btnAddPatient}
          color="#841584"
          onPress={onBtnAddPatientPressed}
        >
          <Text style={styles.add}>➕</Text>
        </Pressable>
      </View>

      <SafeAreaView style={styles.rowContainer}>
        <FlatList
          data={patientListData}
          renderItem={({ item }) => (
            <Item
              patientName={item.patientName}
              onItemPressed={onItemPressed}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
}

function Item({ patientName, onItemPressed }) {
  return (
    <View
      style={styles.item}
      onStartShouldSetResponder={() => {
        onItemPressed(patientName);
      }}
    >
      <Text style={styles.text}>{patientName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: 20,
    padding: 5,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 100,
  },
  searchBox: {
    borderWidth: 1,
    // flex: 1,
    height: 50,
    width: "80%",
  },
  btnAddPatient: {
    // flex: 1,
    width: "20%",
    fontSize: 40,
  },
  add: {
    fontSize: 40,
  },
  text: {
    fontSize: 30,
  },
  item: {
    flex: 1,
  },
});
