import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TextInput,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";
import EndPointConfig from "./EndPointConfig";
import AuthInfo from "./AuthInfo";

export default function PatientListScreen({ navigation }) {
  const [displayedList, setdisplayedList] = React.useState([]);
  const [patientList, setPatientList] = React.useState([]);

  const onBtnAddPatientPressed = () => {
    navigation.navigate("AddPatientStack");
  };

  const onItemPressed = (patientId) => {
    navigation.navigate("ViewPatient", { id: patientId });
  };

  const searchPatient = (name) => {
    if (name == "") {
      setdisplayedList(patientList)
    }
    else {
      let resultList = []
      for (let patient of patientList) {
        if (patient.patientName.includes(name)) {
          resultList.push(patient)
        }
      }
      setdisplayedList(resultList)
    }
  }

  React.useEffect(() => {
    // download patient list from server
    fetch(EndPointConfig.urlListAllPatients)
      .then(async (response) => {
        const data = await response.json();
        if (response.status == 200) {
          let listContent = []
          for (let patient of data) {
            listContent.push({
              patientName: patient.first_name + ' ' + patient.last_name,
              id: patient._id
            })
          }
          setPatientList(listContent)
          setdisplayedList(listContent)
        }
        else {
          console.error("Fail to download patient list")
        }
      })
      .catch( (error) => {
        // unknown error
        console.error("Fail to download patient list. " + error);
      })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search patients"
          onChangeText={(text) => searchPatient(text)}
        ></TextInput>
        {
          AuthInfo.userType == "admin" ?
            <Pressable
              style={styles.btnAddPatient}
              color="#841584"
              onPress={onBtnAddPatientPressed}
            >
              <Text style={styles.add}>➕</Text>
            </Pressable>
          :
          <></>
        }
      </View>

      <SafeAreaView style={styles.rowContainer}>
        <FlatList
          data={displayedList}
          onStartShouldSetResponder = { (evt) => true }
          renderItem={({ item }) => (
            <Item
              patientId = {item.id}
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

function Item({ patientId, patientName, onItemPressed }) {
  return (
    <TouchableWithoutFeedback
      style={styles.item}
      onPress = {() => {
        onItemPressed(patientId);
      }}
    >
      <Text style={styles.text}>{patientName}</Text>
    </TouchableWithoutFeedback>
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
    fontSize: 20,
    paddingBottom: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  searchBox: {
    borderWidth: 1,
    flex: 5,
    height: 50,
    fontSize: 30,
  },
  btnAddPatient: {
    flex: 1,
    fontSize: 40,
    marginLeft: 20
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
