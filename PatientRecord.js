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
import EndPointConfig from "./EndPointConfig";

export default function PatientRecord({navigation, route}) {
  const patientId = route.params?.patientId

  let patientRecord = [
  ];
  const onBtnReturnPressed = () => {
    navigation.navigate("ViewPatient");
  };

  // download treatment records of the patient from server
  const urlViewTreatmentRecordByPatientId = EndPointConfig.urlViewTreatmentRecordByPatientId.replace(':id', patientId)
  fetch(urlViewTreatmentRecordByPatientId)
    .then(async (response) => {
      const data = await response.json();
      if (response.status == 200) {
        for (let treatmentRecord of data) {
          patientRecord.push({
            treatmentId: treatmentRecord._id,
            treatment: treatmentRecord.treatment,
            dateOfTreatment: treatmentRecord.date,
            details: treatmentRecord.description
          })
        }
      }
      else {
        console.error("Fail to download treatment records")
      }
    })
    .catch( (error) => {
      // unknown error
      console.error("Fail to download treatment records. " + error);
    })

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
