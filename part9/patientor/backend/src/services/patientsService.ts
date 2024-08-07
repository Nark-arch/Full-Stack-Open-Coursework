import { v1 as uuid } from 'uuid';

import patients from '../../data/patients';
import {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patients.map(({ ssn, entries, ...rest }) => rest);
};

const findPatientById = (id: string): Patient | Error => {
  const patient = patients.find((patient) => patient.id === id);
  if (!patient) throw new Error('Invalid or malformatted id, no patient found');
  return patient;
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patient = { id: uuid(), ...newPatient };
  patients.push(patient);
  return patient;
};

const addEntryToPatient = (
  patientId: string,
  newEntry: NewEntry
): Entry | Error => {
  const entry = { id: uuid(), ...newEntry };
  const patient = patients.find((p) => p.id === patientId);
  if (!patient) throw new Error('Invalid or malformatted id, no patient found');
  patient.entries.push(entry);
  return entry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  findPatientById,
  addPatient,
  addEntryToPatient,
};
