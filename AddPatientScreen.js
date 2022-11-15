import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import EndPointConfig from "./EndPointConfig";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

export default function AddPatientScreen({ navigation }) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [age, setAge] = React.useState(0);
  const [dateOfBirth, setDateOfBirth] = React.useState("");
  const [sex, setSex] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [emergencyContactFirstName, setEmergencyContactFirstName] =
    React.useState("");
  const [emergencyContactLastName, setEmergencyContactLastName] =
    React.useState("");
  const [emergencyContactPhoneNumber, setEmergencyContactPhoneNumber] =
    React.useState("");
  const [dateOfAdmission, setDateOfAdmission] = React.useState("");
  const [bed, setBed] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [doctor, setDoctor] = React.useState("");
  const [photo, setPhoto] = React.useState("");
  const [photoDisplayed, setPhotoDisplayed] = React.useState(
    require("./assets/text-upload-patient-photo.png")
  );

  const onPhotoPressed = async () => {
    const file = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    let fileData = await FileSystem.readAsStringAsync(file.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    fileData = "data:" + file.mimeType + ";base64," + fileData;
    setPhoto(fileData);
    setPhotoDisplayed({ uri: fileData });
  };

  const onCancelPress = () => {
    navigation.goBack()
  };

  // Send the data of the new patient to the server
  const onSubmitPress = async () => {
    // validate the user entries
    if (isNaN(age)) {
      alert('Age is not valid')
      return
    }
    if (isNaN(phoneNumber)) {
      alert('Tel is not valid')
      return
    }
    if (isNaN(emergencyContactPhoneNumber)) {
      alert('Emergency contact person phone number is not valid')
      return
    }
    let dateOfBirthSplited = dateOfBirth.split('/')
    if (dateOfBirthSplited.length != 3
      || isNaN(dateOfBirthSplited[0]) || parseInt(dateOfBirthSplited[0]) < 1 || parseInt(dateOfBirthSplited[0]) > 31 // check day
      || isNaN(dateOfBirthSplited[1]) || parseInt(dateOfBirthSplited[1]) < 1 || parseInt(dateOfBirthSplited[1]) > 12 // check month
      || isNaN(dateOfBirthSplited[2]) || parseInt(dateOfBirthSplited[2]) < 0 || parseInt(dateOfBirthSplited[2]) > 9999) // check year
    {
      alert('Date of birth is not valid')
      return
    }
    let dateOfAdmissionSplited = dateOfAdmission.split('/')
    if (dateOfAdmissionSplited.length != 3
      || isNaN(dateOfAdmissionSplited[0]) || parseInt(dateOfAdmissionSplited[0]) < 1 || parseInt(dateOfAdmissionSplited[0]) > 31 // check day
      || isNaN(dateOfAdmissionSplited[1]) || parseInt(dateOfAdmissionSplited[1]) < 1 || parseInt(dateOfAdmissionSplited[1]) > 12 // check month
      || isNaN(dateOfAdmissionSplited[2]) || parseInt(dateOfAdmissionSplited[2]) < 0 || parseInt(dateOfAdmissionSplited[2]) > 9999) // check year
    {
      alert('Date of Admission is not valid')
      return
    }
    if (photo === undefined || photo === null || photo === "") {
      alert("Haven't select a patient photo for uploading")
      return
    }

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
      photo: photo,
    };
    await fetch(EndPointConfig.urlAddPatient, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addPatientParams),
    })
      .then(async (response) => {
        let data = await response.json();
        if (response.status == 201) {
          // success to add a patient in the server
          navigation.goBack(); // navigate back to the patient list screen
        } else {
          // server reject the adding patient request
          alert(data.message); // display the server message of rejection
        }
      })
      .catch((error) => {
        // unknown error
        console.error(error);
        alert("Fail to add patient due to unknown error");
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ flex: 8, justifyContent: "center", alignItems: "center", margin: 5}}
        onPress={onPhotoPressed}
      >
        <Image style={styles.patientPhoto} source={photoDisplayed} />
      </TouchableOpacity>

      <View style={styles.rowContainer}>
        <Text style={[styles.text, { flex: 1 }]}>First Name:</Text>
        <TextInput
          style={[styles.textInput, { flex: 1 }]}
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
        />
        <Text style={[styles.text, { flex: 1 }]}>Last Name:</Text>
        <TextInput
          style={[styles.textInput, { flex: 1 }]}
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
      </View>

      <View style={styles.rowContainer}>
        <Text style={[styles.text, { flex: 1 }]}>Age:</Text>
        <TextInput
          style={[styles.textInput, { flex: 1 }]}
          onChangeText={(text) => setAge(text)}
          value={age}
        />
        <Text style={[styles.text, { flex: 2 }]}>Date of birth:</Text>
        <TextInput
          style={[styles.textInput, { flex: 2 }]}
          onChangeText={(text) => setDateOfBirth(text)}
          value={dateOfBirth}
          placeholder='dd/mm/yyyy'
        />
      </View>

      <View style={styles.rowContainer}>
        <Text style={[styles.text, { flex: 1 }]}>Sex</Text>
        <TextInput
          style={[styles.textInput, { flex: 1 }]}
          onChangeText={(text) => setSex(text)}
          value={sex}
        />
        <Text style={[styles.text, { flex: 1 }]}>Tel:</Text>
        <TextInput
          style={[styles.textInput, { flex: 1, flexGrow: 3 }]}
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}
        />
      </View>

      <View style={styles.rowContainer}>
        <Text style={styles.text}>Register address:</Text>
      </View>

      <View style={styles.rowContainer}>
        <TextInput
          style={[styles.textInput, { flex: 1 }]}
          onChangeText={(text) => setAddress(text)}
          value={address}
        />
      </View>

      <View style={styles.rowContainer}>
        <Text style={styles.text}>Emergency contact person:</Text>
      </View>

      <View style={styles.rowContainer}>
        <Text style={[styles.text, { flex: 1 }]}>First Name:</Text>
        <TextInput
          style={[styles.textInput, { flex: 1 }]}
          onChangeText={(text) => setEmergencyContactFirstName(text)}
          value={emergencyContactFirstName}
        />
        <Text style={[styles.text, { flex: 1 }]}>Last Name:</Text>
        <TextInput
          style={[styles.textInput, { flex: 1 }]}
          onChangeText={(text) => setEmergencyContactLastName(text)}
          value={emergencyContactLastName}
        />
      </View>

      <View style={styles.rowContainer}>
        <Text style={styles.text}>Emergency contact person phone number:</Text>
      </View>

      <View style={styles.rowContainer}>
        <TextInput
          style={[styles.textInput, { flex: 1 }]}
          onChangeText={(text) => setEmergencyContactPhoneNumber(text)}
          value={emergencyContactPhoneNumber}
        />
      </View>

      <View style={styles.rowContainer}>
        <Text style={[styles.text, { flex: 1 }]}>Department:</Text>
        <TextInput
          style={[styles.textInput, { flex: 2, flexGrow: 1.2 }]}
          onChangeText={(text) => setDepartment(text)}
          value={department}
        />
        <Text style={[styles.text, { flex: 1 }]}>Doctor:</Text>
        <TextInput
          style={[styles.textInput, { flex: 2, flexGrow: 1.2 }]}
          onChangeText={(text) => setDoctor(text)}
          value={doctor}
        />
      </View>

      <View style={styles.rowContainer}>
        <Text style={[styles.text, { flex: 2 }]}>Date of admission:</Text>
        <TextInput
          style={[styles.textInput, { flex: 2 }]}
          onChangeText={(text) => setDateOfAdmission(text)}
          value={dateOfAdmission}
          placeholder='dd/mm/yyyy'
        />
        <Text style={[styles.text, { flex: 1 }]}>Bed:</Text>
        <TextInput
          style={[styles.textInput, { flex: 1 }]}
          onChangeText={(text) => setBed(text)}
          value={bed}
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
            onPress={onSubmitPress}
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
  },
  textInput: {
    borderWidth: 1,
  },
  patientPhoto: {
    height: 120,
    width: 120,
  },
  text: {
    fontSize: 14,
    marginLeft: 5,
  },
});
