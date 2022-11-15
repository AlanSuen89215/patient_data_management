import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";
import EndPointConfig from "./EndPointConfig";

export default function PatientInCriticalListScreen({ navigation }) {
  const [displayedList, setdisplayedList] = React.useState([]);
  const [patientInCriticalList, setPatientInCriticalList] = React.useState([]);

  const searchPatient = (name) => {
    if (name == "") {
      setdisplayedList(patientInCriticalList)
    }
    else {
      let resultList = []
      for (let patient of patientInCriticalList) {
        if (patient.patientName.includes(name)) {
          resultList.push(patient)
        }
      }
      setdisplayedList(resultList)
    }
  }

  const onItemPressed = (patientId) => {
    navigation.navigate("PatientListStack", 
      {
        screen: 'ViewPatient', 
        params: {id: patientId} 
      }
    );
  };

  React.useEffect(() => {
    // download list of patients who are in critical condition from server
    fetch(EndPointConfig.urlListAllPatientsInCritical)
      .then(async (response) => {
        const data = await response.json();
        if (response.status == 200) {
          let listContent = []
          for (let patient of data) {
            listContent.push({
              patientName: patient.first_name + ' ' + patient.last_name,
              id: patient.patient_id
            })
          }
          setPatientInCriticalList(listContent)
          setdisplayedList(listContent)
        }
        else {
          console.error("Fail to download list of patients who are in critical condition")
        }
      })
      .catch( (error) => {
        // unknown error
        console.error("Fail to download list of patients who are in critical condition. " + error);
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
      </View>

      <SafeAreaView style={styles.rowContainer}>
        <FlatList
          data={displayedList}
          renderItem={({ item }) => 
            <Item
              patientId = {item.id}
              patientName={item.patientName}
              onItemPressed={onItemPressed}
            />
          }
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
}

function Item({ patientId, patientName, onItemPressed }) {
  return (
    <View
      style = {styles.item}
      onStartShouldSetResponder = { () => {
        onItemPressed(patientId);
      }}
    >
      <Text style={styles.text} >{patientName}</Text>
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
    flex: 1,
    height: 50,
    fontSize: 30,
  },
  item: {
    flex: 1,
  },
  text: {
    fontSize: 30,
  },
});
