import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image} from 'react-native';
import EndPointConfig from './EndPointConfig';

export default function AddPatientScreen({navigation}) {
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [age, setAge] = React.useState(0)
  const [dateOfBirth, setDateOfBirth] = React.useState('')
  const [sex, setSex] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [emergencyContactFirstName, setEmergencyContactFirstName] = React.useState('')
  const [emergencyContactLastName, setEmergencyContactLastName] = React.useState('')
  const [emergencyContactPhoneNumber, setEmergencyContactPhoneNumber] = React.useState('')
  const [dateOfAdmission, setDateOfAdmission] = React.useState('')
  const [bed, setBed] = React.useState('')
  const [department, setDepartment] = React.useState('')
  const [doctor, setDoctor] = React.useState('')
  const [photo, setPhoto] = React.useState('')

  const onCancelPress = () => {
    navigation.navigate('PatientList')
  }

  // Send the data of the new patient to the server
  const onSubmitPress = async () => {
    const addPatientParams = {
      first_name: firstName,
      last_name: lastName,
      address: address,
      date_of_birth: dateOfBirth,
      department: department,
      doctor: doctor,
      sex: sex,
      phone_number: phoneNumber,
      emergency_contact_first_name: emergencyContactFirstName,
      emergency_contact_last_name: emergencyContactLastName,
      emergency_contact_phone_number: emergencyContactPhoneNumber,
      date_of_admission: dateOfAdmission,
      bed_number: bed,
      photo: photo
    }
    await fetch(EndPointConfig.urlAddPatient, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addPatientParams)
    })
    .then(async (response) => {
      let data = await response.json()
      if (response.status == 201) { // success to add a patient in the server
        navigation.navigate('PatientList') // navigate to the patient list screen
      }
      else { // server reject the adding patient request
        alert(data.message) // display the server message of rejection
      }
    })
    .catch((error) => { // unknown error
      console.error(error)
      alert('Fail to add patient due to unknown error')
    })
  }

  return (
    <View style={styles.container}>
      <Image style={styles.patientPhoto} source={require('./assets/box-arrow-in-up.png')} />

      <View style={styles.rowContainer}>
        <Text style={{flex: 1}}>First Name:</Text>
        <TextInput style={[styles.textInput, {flex: 1}]}
          onChangeText={text => setFirstName(text)}
          value={firstName} />
        <Text style={{flex: 1}}>Last Name:</Text>
        <TextInput style={[styles.textInput, {flex: 1}]}
          onChangeText={text => setLastName(text)}
          value={lastName} />
      </View>

      <View style={styles.rowContainer}>
        <Text style={{flex: 1}}>Age:</Text>
        <TextInput style={[styles.textInput, {flex: 1}]}
          onChangeText={text =>setAge(text)}
          value={age} />
          <Text style={{flex: 1}}>Date of birth:</Text>
        <TextInput style={[styles.textInput, {flex: 1}]}
          onChangeText={text =>setDateOfBirth(text)}
          value={dateOfBirth} />
      </View>

      <View style={styles.rowContainer}>
        <Text style={{flex: 1}}>Sex</Text>
        <TextInput style={[styles.textInput, {flex: 1}]}
          onChangeText={text =>setSex(text)}
          value={sex} />
        <Text style={{flex: 1}}>Tel:</Text>
        <TextInput style={[styles.textInput, {flex: 1}]}
          onChangeText={text =>setPhoneNumber(text)}
          value={phoneNumber} />
      </View>

      <View style={styles.rowContainer}>
        <Text>Register address:</Text>
      </View>

      <View style={styles.rowContainer}>
        <TextInput style={[styles.textInput, {flex: 1}]}
          onChangeText={text =>setAddress(text)}
          value={address} />
      </View>
      
      <View style={styles.rowContainer}>
        <Text>Emergency contact person:</Text>
      </View>

      <View style={styles.rowContainer}>
        <Text style={{flex: 1}}>First Name:</Text>
        <TextInput style={[styles.textInput, {flex: 1}]}
          onChangeText={text => setEmergencyContactFirstName(text)}
          value={emergencyContactFirstName} />
        <Text style={{flex: 1}}>Last Name:</Text>
        <TextInput style={[styles.textInput, {flex: 1}]}
          onChangeText={text => setEmergencyContactLastName(text)}
          value={emergencyContactLastName} />
      </View>

      <View style={styles.rowContainer}>
        <Text>Emergency contact person phone number:</Text>
      </View>

      <View style={styles.rowContainer}>
        <TextInput style={[styles.textInput, {flex: 1}]}
          onChangeText={text => setEmergencyContactPhoneNumber(text)}
          value={emergencyContactPhoneNumber} />
      </View>

      <View style={styles.rowContainer}>
        <Text style={{flex: 1}}>Date of admission:</Text>
        <TextInput style={[styles.textInput, {flex: 1}]}
          onChangeText={text => setDateOfAdmission(text)}
          value={dateOfAdmission} />
        <Text style={{flex: 1}}>Bed:</Text>
        <TextInput style={[styles.textInput, {flex: 1}]}
          onChangeText={text => setBed(text)}
          value={bed} />
      </View>

      <View style={styles.rowContainer}>
        <Button title='Cancel' style={[{flex: 1}]} color= '#841584' onPress={onCancelPress} />
        <Button title='Submit' style={[{flex: 1}]} color= '#841584' onPress={onSubmitPress} />
      </View>

    </View>
  );
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
    textInput: {
      borderWidth: 1
    },
    patientPhoto: {
      flex: 8
    }
});
