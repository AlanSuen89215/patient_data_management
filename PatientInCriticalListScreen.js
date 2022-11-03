import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";

export default function PatientInCriticalListScreen() {
  let patientInCriticalListData = [];

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search patients"
        ></TextInput>
      </View>

      <SafeAreaView style={styles.rowContainer}>
        <FlatList
          data={patientInCriticalListData}
          renderItem={({ item }) => <Item patientName={item.patientName} />}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
}

function Item({ patientName }) {
  return (
    <View style={styles.item}>
      <Text>{patientName}</Text>
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
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  searchBox: {
    borderWidth: 1,
    flex: 1,
  },
  item: {
    flex: 1,
  },
});
