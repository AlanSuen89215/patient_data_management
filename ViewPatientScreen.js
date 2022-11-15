import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import EndPointConfig from "./EndPointConfig";

export default function ViewPatientScreen({navigation, route}) {
  const id = route.params?.id
  const [photoDisplayed, setPhotoDisplayed] = React.useState("")
  const [patientData, setPatientData] = React.useState("")

  const bloodPressureTypeName = "BP (X/Y mmHg)";
  const [bloodPressureReading, setBloodPressureReading] = React.useState("")
  const [bloodPressureDatetime, setBloodPressureDatetime] = React.useState("")
  const respiratoryRateTypeName = "PR (X/min)";
  const [respiratoryRateReading, setRespiratoryRateReading] = React.useState("")
  const [respiratoryRateDatetime, setRespiratoryRateDatetime] = React.useState("")
  const bloodOxygenTypeName = "BO (X%)";
  const [bloodOxygenReading, setBloodOxygenReading] = React.useState("")
  const [bloodOxygenDatetime, setBloodOxygenDatetime] = React.useState("")
  const heartBeatRateTypeName = "HB (X/min)";
  const [heartBeatRateReading, setHeartBeatRateReading] = React.useState("")
  const [heartBeatRateDatetime, setHeartBeatRateDatetime] = React.useState("")

  const onBtnViewRecordsPressed = () => {
    navigation.navigate("PatientRecord", { id: id });
  };
  const onBtnAddRecordPressed = () => {
    navigation.navigate("AddRecordStack", { id: id });
    
  };

  React.useEffect(() => {
    // download patient info from server
    const urlGetPatientById = EndPointConfig.urlGetPatientById.replace(":id", id)
    fetch(urlGetPatientById)
      .then(async (response) => {
        const data = await response.json();
        if (response.status == 200) {
          // calculate age
          const yearOfBirth = Number(data.date_of_birth.split('/')[2])
          const curDate = new Date()
          const age = curDate.getFullYear() - yearOfBirth

          const patientDataTemp = 'ID: ' + data._id + '\n'
            + 'Name: ' + data.first_name + ' ' + data.last_name + '\n'
            + 'Age: ' + age + '\n'
            + 'Date of birth: ' + data.date_of_birth + '\n'
            + 'Sex: ' + data.sex + '\n'
            + 'Tel: ' + data.phone_number + '\n'
            + 'Register Address:\n'
            + data.address + '\n'
            + 'Emergency contact person:\n'
            + data.emergency_contact_first_name + ' ' + data.emergency_contact_last_name
            + ' (' + data.emergency_contact_phone_number + ')\n'
            + 'Department: ' + data.department + '\n'
            + 'Doctor: ' + data.doctor + '\n'
            + 'Date of admission: ' + data.date_of_admission + '\n'
            + 'Bed: ' + data.bed_number
          
            setPatientData(patientDataTemp)
            setPhotoDisplayed(data.photo)
        }
        else {
          console.error("Fail to download patients' information")
        }
      })
      .catch( (error) => {
        // unknown error
        console.error("Fail to download patients' information. " + error);
      })

    // download patient clinical data from server
    const urlGetClinicalDataById = EndPointConfig.urlGetClinicalDataById.replace(':id', id)
    fetch(urlGetClinicalDataById)
      .then( async (response) => {
        const data = await response.json();
        if (response.status == 200) {
          for (let clinicalData of data) {
            switch (clinicalData.category) {
              case 'Blood pressure':
                // use diastolic pressure as blood pressure
                setBloodPressureReading(clinicalData.readings.diastolic)
                setBloodPressureDatetime(clinicalData.date + ' ' + clinicalData.time)
                break

              case 'Respiratory rate':
                setRespiratoryRateReading(clinicalData.readings)
                setRespiratoryRateDatetime(clinicalData.date + ' ' + clinicalData.time)
                break

              case 'Blood oxygen level':
                setBloodOxygenReading(clinicalData.readings)
                setBloodOxygenDatetime(clinicalData.date + ' ' + clinicalData.time)
                break

              case 'Heart beat rate':
                setHeartBeatRateReading(clinicalData.readings)
                setHeartBeatRateDatetime(clinicalData.date + ' ' + clinicalData.time)
                break

              default:
                break
            }
          }
        }
        else {
          console.error("Fail to download patients' clinical data")
        }
      })
      .catch( (error) => {
        // unknown error
        console.error("Fail to download patients' clinical data. " + error);
      })
  }, [])

  return (
    <View style={styles.container}>
      <View style = {{ flex: 3, justifyContent: "center", alignItems: "center", margin: 5}}>
        <Image 
          style={styles.patientPhoto}
          source={photoDisplayed}
        />
      </View>

      <View style={[styles.rowContainer, {flex: 4}]}>
        <Text styles={{ flex: 1, borderWidth: 1, fontSize: 14 }}>{patientData}</Text>
      </View>

      <View style={[styles.columnContainer, {flex: 3}]}>
        <ClinicalDataHeader />
        <ClinicalDataRow
          dataType={bloodPressureTypeName}
          reading={bloodPressureReading}
          datetime={bloodPressureDatetime}
        />
        <ClinicalDataRow
          dataType={respiratoryRateTypeName}
          reading={respiratoryRateReading}
          datetime={respiratoryRateDatetime}
        />
        <ClinicalDataRow
          dataType={bloodOxygenTypeName}
          reading={bloodOxygenReading}
          datetime={bloodOxygenDatetime}
        />
        <ClinicalDataRow
          dataType={heartBeatRateTypeName}
          reading={heartBeatRateReading}
          datetime={heartBeatRateDatetime}
        />
      </View>

      <View style={[styles.rowContainer, {flex: 2}]}>
        <Text style={{ flex: 0.1 }} />
        <View style={{ flex: 1, marginRight:5 }}>
          <Button
            title="View records"
            style={{ flex: 1 }}
            color="#4CAF50"
            onPress={onBtnViewRecordsPressed}
          />
        </View>
        
        <View style={{ flex: 1, marginLeft:5 }}>
          <Button
            title="Add Record"
            style={{ flex: 1 }}
            color="#4CAF50"
            onPress={onBtnAddRecordPressed}
          />
        </View>
        <Text style={{ flex: 0.1 }} />
      </View>
    </View>
  );
}

function ClinicalDataHeader() {
  return (
    <View
      style={[
        styles.rowContainer,
        { backgroundColor: "#BDBDBD", borderTopWidth: 1, borderBottomWidth: 1 },
      ]}
    >
      <View 
        style={
          [ styles.clinicalDataTableCell, styles.clinicalDataTableHeader, 
            { 
              flex: 1,
              borderLeftWidth: 1,
              borderRightWidth: 1,
            }
          ]
        }
      >
        <Text>Health Data</Text>
      </View>
      
      <View 
        style={
          [ styles.clinicalDataTableCell, styles.clinicalDataTableHeader, 
            { 
              flex: 1,
              borderRightWidth: 1,
            }
          ]
        }
      >
        <Text>Reading</Text>
      </View>

      <View 
        style={
          [ styles.clinicalDataTableCell, styles.clinicalDataTableHeader, 
            { 
              flex: 1,
              borderRightWidth: 1,
            }
          ]
        }
      >
        <Text>Date Time</Text>
      </View>
    </View>
  );
}

function ClinicalDataRow({ dataType, reading, datetime }) {
  return (
    <View style={[styles.rowContainer, { borderBottomWidth: 1 }]}>
      <View style={[styles.clinicalDataTableCell, { flex: 1, borderLeftWidth: 1, borderRightWidth: 1 }]}>
        <Text>{dataType}</Text>
      </View>
      
      <View style={[styles.clinicalDataTableCell, { flex: 1, borderRightWidth: 1 }]}>
        <Text>{reading}</Text>
      </View>

      <View style={[styles.clinicalDataTableCell, { flex: 1, borderRightWidth: 1 }]}>
        <Text>{datetime}</Text>
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
  },
  columnContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  textInput: {
    borderWidth: 1,
  },
  patientPhoto: {
    height: 150,
    width: 150,
  },
  clinicalDataTableCell: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  clinicalDataTableHeader: {
    fontSize: 20,
  }
});
