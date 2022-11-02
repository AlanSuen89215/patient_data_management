import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, FlatList} from 'react-native';

export default function PatientListScreen({navigation}) {
  const onBtnAddPatientPressed = () => {
    navigation.navigate('AddPatient')
  }

  const onItemPressed = (patientName) => {
    navigation.navigate('ViewPatient')
  }

  let patientListData = [
    {
        id: '1',
        patientName: 'Patient 1'
    }    
  ]

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TextInput style={styles.searchBox} placeholder="Search patients"></TextInput>
        <Button style={styles.btnAddPatient} title="+" color= '#841584' onPress={onBtnAddPatientPressed} />
      </View>

      <SafeAreaView style={styles.rowContainer}>
        <FlatList
          data={patientListData}
          renderItem={({item}) => <Item patientName={item.patientName} onItemPressed={onItemPressed} />}
          keyExtractor={item => item.id} />
      </SafeAreaView>
    </View>
  )
}

function Item({patientName, onItemPressed}) {
  return (
    <View style={styles.item} onStartShouldSetResponder={ () => {onItemPressed(patientName)}}>
        <Text>{patientName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: 20
  },
  rowContainer: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  searchBox: {
    borderWidth: 1,
    flex: 1
  },
  btnAddPatient: {
    flex: 1
  },
  item: {
    flex: 1
  }
});