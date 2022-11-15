import {
  PatientListStackScreen, 
  AddPatientStackScreen,
  PatientInCriticalListStackScreen,
  AddRecordStackScreen
} from './NavigationStacks'

export default {
  DoctorAndNurseItems: [
    {
      name: "PatientListStack",
      component: PatientListStackScreen,
      displayedName: 'Patients'
    },
    {
      name: "AddPatientStack",
      component: AddPatientStackScreen,
      displayedName: 'Add patient'
    },
    {
      name: "PatientInCriticalListStack",
      component: PatientInCriticalListStackScreen,
      displayedName: 'Critical'
    },
    { 
      name: "AddRecordStack",
      component: AddRecordStackScreen,
      displayedName: 'Add record'
    },
  ]
}