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
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

export default function AddRecord({ navigation }) {
  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [treatment, setTreatment] = React.useState("");
  const [dateOfRecord, setDateOfRecord] = React.useState("");
  const [remark, setRemark] = React.useState("");

  const onCancelPress = () => {
    navigation.navigate("ViewPatient");
  };
  const onAddPress = () => {
    navigation.navigate("PatientList");
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
