import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";

export default function ViewPatientScreen({navigation}) {
  const [photoDisplayed, setPhotoDisplayed] = React.useState(
    require("./assets/logo.jpg")
  )
  const [patientData, setPatientData] = React.useState("Name: John Smith\nAge: 60\nDate of Birth: 1-1-1962\nSex: M\nTel: +1 416 442 4067\nRegister Address: \nG01, 937 Progress Ave, Centennial Place\nEmergency contact person:\nMichelle Elizabeth Rosen (+1 416 442 4068)\nDepartment: Normal\nDoctor: Alan Suen\nDate of Admission: 10-6-2022\nBed: 5A")

  const bloodPressureTypeName = "BP (X/Y mmHg)";
  const [bloodPressureReading, setBloodPressureReading] = React.useState("120")
  const [bloodPressureDatetime, setBloodPressureDatetime] = React.useState("11-10-2022 10:00:00")
  const respiratoryRateTypeName = "PR (X/min)";
  const [respiratoryRateReading, setRespiratoryRateReading] = React.useState("12")
  const [respiratoryRateDatetime, setRespiratoryRateDatetime] = React.useState("11-10-2022 10:00:00")
  const bloodOxygenTypeName = "BO (X%)";
  const [bloodOxygenReading, setBloodOxygenReading] = React.useState("95")
  const [bloodOxygenDatetime, setBloodOxygenDatetime] = React.useState("11-10-2022 10:00:00")
  const heartBeatRateTypeName = "HB (X/min)";
  const [heartBeatRateReading, setHeartBeatRateReading] = React.useState("80")
  const [heartBeatRateDatetime, setHeartBeatRateDatetime] = React.useState("11-10-2022 10:00:00")

  const onBtnViewRecordsPressed = () => {
    navigation.navigate("PatientRecord");
  };
  const onBtnAddRecordPressed = () => {
    navigation.navigate("AddRecord");
    
  };
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
