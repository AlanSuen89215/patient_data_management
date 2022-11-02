import React from 'react';
import { StyleSheet, Text, View, Button, Image} from 'react-native';

export default function ViewPatientScreen() {
  const bloodPressureTypeName = 'BP (X/Y mmHg)'
  let bloodPressureReading = ''
  let bloodPressureDatetime = ''
  const respiratoryRateTypeName = 'PR (X/min)'
  let respiratoryRateReading = ''
  let respiratoryRateDatetime = ''
  const bloodOxygenTypeName = 'BO (X%)'
  let bloodOxygenReading = ''
  let bloodOxygenDatetime = ''
  const heartBeatRateTypeName = 'HB (X/min)'
  let heartBeatRateReading = ''
  let heartBeatRateDatetime = ''

  const onBtnViewRecordsPressed = () => {

  }

  return (
    <View style={styles.container}>
      <Image style={styles.patientPhoto} source={require('./assets/box-arrow-in-up.png')} />

      <View style={styles.rowContainer}>
        <Text styles={{flex: 1, borderWidth: 1}}></Text>
      </View>

      <View style={styles.columnContainer}>
        <ClinicalDataHeader />
        <ClinicalDataRow dataType={bloodPressureTypeName} reading={bloodPressureReading} datetime={bloodPressureDatetime} />
        <ClinicalDataRow dataType={respiratoryRateTypeName} reading={respiratoryRateReading} datetime={respiratoryRateDatetime} />
        <ClinicalDataRow dataType={bloodOxygenTypeName} reading={bloodOxygenReading} datetime={bloodOxygenDatetime} />
        <ClinicalDataRow dataType={heartBeatRateTypeName} reading={heartBeatRateReading} datetime={heartBeatRateDatetime} />
      </View>

      <Button title='View records' style={{flex: 1}} color= '#841584' onPress={onBtnViewRecordsPressed} />
    </View>
  )
}

function ClinicalDataHeader() {
  return (
    <View style={[styles.rowContainer, {backgroundColor: '#BDBDBD', borderTopWidth: 1, borderBottomWidth: 1}]}>
      <Text style={{flex: 1, borderLeftWidth: 1, borderRightWidth: 1}}>Health Data</Text>
      <Text style={{flex: 1, borderRightWidth: 1}}>Reading</Text>
      <Text style={{flex: 1, borderRightWidth: 1}}>Date Time</Text>
    </View>
  )
}

function ClinicalDataRow({dataType, reading, datetime}) {
  return (
    <View style={[styles.rowContainer, {borderBottomWidth: 1}]}>
      <Text style={{flex: 1, borderLeftWidth: 1, borderRightWidth: 1}}>{dataType}</Text>
      <Text style={{flex: 1, borderRightWidth: 1}}>{reading}</Text>
      <Text style={{flex: 1, borderRightWidth: 1}}>{datetime}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 20
    },
    rowContainer: {
      flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
    },
    columnContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
    },
    textInput: {
      borderWidth: 1
    },
    patientPhoto: {
      flex: 1
    }
});
