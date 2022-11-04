import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  SafeAreaView,
} from "react-native";
import EndPointConfig from "./EndPointConfig";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

export default function AddRecord() {
  const [name, setName] = useState("");
  const [treatment, setTreatment] = useState("");
  const [dateOfRecord, setDateOfRecord] = useState("");
  const [remark, setRemark] = useState("");

  const onCancelPress = () => {
    navigate.navigate("PatientList");
  };
  const onAddPress = () => {
    navigation.navigate("PatientList");
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={[styles.text, { flex: 1 }]}>Patient Name:</Text>
        {/* or should it be patient Id or treatment type? because you navigate to this page only after you tab the patient's name */}
        {/* Or, if you keep the name, it should be a props */}
        <TextInput
          style={[styles.textInput, { flex: 1 }]}
          onChangeText={(text) => setName(text)}
          value={name}
        />
      </View>

      <View style={styles.rowContainer}>
        <Text style={[styles.text, { flex: 1 }]}>Treatment:</Text>
        <TextInput
          style={[styles.textInput, { flex: 1 }]}
          onChangeText={(text) => setTreatment(text)}
          value={treatment}
        />
      </View>

      <View style={styles.rowContainer}>
        <Text style={[styles.text, { flex: 1 }]}>Date:</Text>
        <TextInput
          style={[styles.textInput, { flex: 1 }]}
          onChangeText={(text) => setDateOfRecord(text)}
          value={dateOfRecord}
        />
      </View>

      <View style={styles.rowContainer}>
        <Text style={[styles.text, { flex: 1 }]}>Remark:</Text>
        <TextInput
          style={[styles.remarkBox, { flex: 1 }]}
          onChangeText={(text) => setRemark(text)}
          value={remark}
        />
      </View>

      <View style={styles.rowContainer}>
        <Button
          title="Cancel"
          style={[{ flex: 1, padding: 10 }]}
          color="#841584"
          onPress={onCancelPress}
        />
        <Button
          title="Submit"
          style={[{ flex: 1, padding: 10 }]}
          color="#841584"
          onPress={onAddPress}
        />
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
    paddingBottom: 20,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 5,
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
