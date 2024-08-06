import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { NewPatient, NonSensitivePatient, Patient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patients.map(({ ssn, entries, ...rest }) => rest);
};

const findPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patient = { id: uuid(), ...newPatient };
  patients.push(patient);
  return patient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  findPatientById,
  addPatient,
};
