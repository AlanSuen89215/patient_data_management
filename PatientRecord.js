import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";

export default function PatientRecord({navigation}) {
  let patientRecord = [
    {
      treatmentId: "1",
      treatment: "take medicine",
      dateOfTreatment: "11 Dec 2022",
      timeOfTreatment: "1200",
      details: "Advil 200mg",
    },
    {
      treatmentId: "2",
      treatment: "injection",
      dateOfTreatment: "12 Nov 2022",
      timeOfTreatment: "1703",
      details: "Biontech",
    },
    {
      treatmentId: "3",
      treatment: "sugery",
      dateOfTreatment: "13 Oct 2022",
      timeOfTreatment: "0800",
      details: "knee",
    },
    {
      treatmentId: "4",
      treatment: "doctor appointment",
      dateOfTreatment: "14 Sep 2022",
      timeOfTreatment: "1030",
      details: "0",
    },
  ];
  const onBtnReturnPressed = () => {
    navigation.navigate("ViewPatient");
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.rowContainer}>
        <FlatList
          data={patientRecord}
          renderItem={({ item }) => <ListItem item={item} />}
          keyExtractor={(item) => item.treatmentId}
        />
      </SafeAreaView>

      <Pressable
        style={styles.btnReturn}
        color="#841584"
        onPress={onBtnReturnPressed}
      >
        <Text style={styles.text}>Return</Text>
      </Pressable>
    </View>
  );
}

function ListItem(props) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#ddd",
        borderColor: "black",
        borderWidth: 1,
      }}
    >
      <View style={styles.rowContainer}>
        <Text style={{ fontSize: 20 }}>{props.item.treatment}</Text>
      </View>

      <View style={styles.rowContainer}>
        <Text style={{ fontSize: 15 }}>{props.item.dateOfTreatment} </Text>
      </View>

      <View style={styles.rowContainer}>
        <Text style={{ fontSize: 11 }}>{props.item.timeOfTreatment} </Text>
      </View>

      <View style={styles.rowContainer}>
        <Text style={{ fontSize: 11 }}>{props.item.details} </Text>
      </View>
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
    justifyContent: "left",
    flex: 1,
    height: 100,
  },
  text: {
    fontSize: 30,
  },
  item: {
    flex: 1,
  },

  btnReturn: {
    fontSize: 40,
    padding: 30,
  },
});
