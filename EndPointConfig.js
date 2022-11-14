module.exports = {
    urlLogin: 'http://10.0.2.2:5000/login',
    urlListAllPatients: 'http://10.0.2.2:5000/patients',
    urlListAllPatientsInCritical: 'http://10.0.2.2:5000/critical-patients',
    urlAddPatient: 'http://10.0.2.2:5000/patients',
    urlGetPatientById: 'http://10.0.2.2:5000/patients/:id',
    urlGetClinicalDataById: 'http://10.0.2.2:5000/patients/:id/tests',
    urlAddTreatmentRecord: 'http://10.0.2.2:5000/patients/:id/treatments',
    urlViewTreatmentRecordByPatientId: 'http://10.0.2.2:5000/patients/:id/treatments'
}