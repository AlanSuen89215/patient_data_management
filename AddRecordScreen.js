import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  SafeAreaView,
  TextInput,
} from "react-native";
import EndPointConfig from "./EndPointConfig";

export default function AddRecord({ navigation }) {
  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [treatment, setTreatment] = React.useState("");
  const [dateOfRecord, setDateOfRecord] = React.useState("");
  const [remark, setRemark] = React.useState("");

  const onCancelPress = () => {
    navigation.navigate("ViewPatient");
  };
  const onAddPress = async () => {
    // validate the user entries
    if (id === undefined || id === null || id === "") {
      alert('id is empty')
      return
    }
    if (treatment === undefined || treatment === null || treatment === "") {
      alert('treatment is empty')
      return
    }
    let dateOfRecordSplited = dateOfRecord.split('/')
    if (dateOfRecordSplited.length != 3
      || isNaN(dateOfRecordSplited[0]) || parseInt(dateOfRecordSplited[0]) < 1 || parseInt(dateOfRecordSplited[0]) > 31 // check day
      || isNaN(dateOfRecordSplited[1]) || parseInt(dateOfRecordSplited[1]) < 1 || parseInt(dateOfRecordSplited[1]) > 12 // check month
      || isNaN(dateOfRecordSplited[2]) || parseInt(dateOfRecordSplited[2]) < 0 || parseInt(dateOfRecordSplited[2]) > 9999) // check year
    {
      alert('Date of record is not valid')
      return
    }
    if (remark === undefined || remark === null || remark === "") {
      alert('remark is empty')
      return
    }

    const urlAddTreatmentRecord = EndPointConfig.urlAddTreatmentRecord.replace(':id', id)
    const addTreatmentRecordParams = {
      patient_id: id,
      treatment: treatment,
      date: dateOfRecord,
      description: remark
    }
    await fetch(urlAddTreatmentRecord, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addTreatmentRecordParams)
    })
      .then(async (response) => {
        let data = await response.json();
        if (response.status == 201) {
          // success to add treatment record in the server
          navigation.navigate("PatientList");
        }
        else {
          // server reject the adding treatment record request
          alert(data.message); // display the server message of rejection
        }
      })
      .catch( (error) => {
        // unknown error
        console.error("Fail to add treatment record due to unknown error. " + error);
        alert("Fail to add treatment record due to unknown error");
      })
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={[styles.text, { flex: 1 }]}>Patient ID:</Text>
        <TextInput
          style={[styles.textInput, { flex: 2.5 }]}
          onChangeText={(text) => setId(text)}
          value={id}
        />
      </View>

      <View style={styles.rowContainer}>
        <Text style={[styles.text, { flex: 1 }]}>Patient Name:</Text>
        <TextInput
          style={[styles.textInput, { flex: 2.5 }]}
          onChangeText={(text) => setName(text)}
          value={name}
        />
      </View>

      <View style={styles.rowContainer}>
        <Text style={[styles.text, { flex: 1 }]}>Treatment:</Text>
        <TextInput
          style={[styles.textInput, { flex: 2.5 }]}
          onChangeText={(text) => setTreatment(text)}
          value={treatment}
        />
      </View>

      <View style={styles.rowContainer}>
        <Text style={[styles.text, { flex: 1 }]}>Date:</Text>
        <TextInput
          style={[styles.textInput, { flex: 2.5 }]}
          onChangeText={(text) => setDateOfRecord(text)}
          value={dateOfRecord}
        />
      </View>

      <View style={styles.rowContainer}>
        <Text style={[styles.text, { flex: 1 }]}>Remark:</Text>
        <TextInput
          style={[styles.remarkBox, { flex: 2.5 }]}
          onChangeText={(text) => setRemark(text)}
          value={remark}
        />
      </View>

      <View style={[styles.rowContainer, {flex: 2}]}>
        <Text style={{ flex: 0.1 }} />
        <View style={{ flex: 1, marginRight:5 }}>
          <Button
            title="Cancel"
            style={{ flex: 1 }}
            color="#4CAF50"
            onPress={onCancelPress}
          />
        </View>
        
        <View style={{ flex: 1, marginLeft:5 }}>
          <Button
            title="Submit"
            style={{ flex: 1 }}
            color="#4CAF50"
            onPress={onAddPress}
          />
        </View>
        <Text style={{ flex: 0.1 }} />
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
    padding: 5,
    maxHeight: 80
  },
  textInput: {
    borderWidth: 1,
    height: 30,
  },
  remarkBox: {
    borderWidth: 1,
    height: 70,
  },
  text: {
    fontSize: 14,
  },
});
