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
      <View style={styles.columnContainer}>
        <View style={[styles.rowContainer, {margin: 2}]}>
          <Text style={{ fontSize: 20 }}>{props.item.treatment}</Text>
        </View>

        <View style={[styles.rowContainer, {margin: 2}]}>
          <Text style={{ fontSize: 15 }}>{props.item.dateOfTreatment} </Text>
        </View>

        <View style={[styles.rowContainer, {margin: 2}]}>
          <Text style={{ fontSize: 11 }}>{props.item.timeOfTreatment} </Text>
        </View>

        <View style={[styles.rowContainer, {margin: 2}]}>
          <Text style={{ fontSize: 11 }}>{props.item.details} </Text>
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
    alignItems: "flex-start",
    justifyContent: "flex-start",
    fontSize: 14,
    paddingBottom: 20,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  columnContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flex: 1,
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
