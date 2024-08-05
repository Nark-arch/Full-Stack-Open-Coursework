import patients from '../../data/patients';
import { NewPatient, NoSSNPatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';
const getPatients = (): Patient[] => {
  return patients;
};

const getNoSSNPatients = (): NoSSNPatient[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patients.map(({ ssn, ...rest }) => rest);
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patient = { id: uuid(), ...newPatient };
  patients.push(patient);
  return patient;
};

export default { getPatients, addPatient, getNoSSNPatients };
