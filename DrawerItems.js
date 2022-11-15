import {
  PatientListStackScreen, 
  AddPatientStackScreen,
  PatientInCriticalListStackScreen,
  AddRecordStackScreen
} from './NavigationStacks'

export default {
  doctor: [
    {
      name: "PatientListStack",
      component: PatientListStackScreen,
      displayedName: 'Patients'
    },
    {
      name: "PatientInCriticalListStack",
      component: PatientInCriticalListStackScreen,
      displayedName: 'Critical'
    }
  ],
  nurse: [
    {
      name: "PatientListStack",
      component: PatientListStackScreen,
      displayedName: 'Patients'
    },
    {
      name: "PatientInCriticalListStack",
      component: PatientInCriticalListStackScreen,
      displayedName: 'Critical'
    }
  ],
  admin: [
    {
      name: "PatientListStack",
      component: PatientListStackScreen,
      displayedName: 'Patients'
    },
    {
      name: "AddPatientStack",
      component: AddPatientStackScreen,
      displayedName: 'Add patient'
    }
  ]
}