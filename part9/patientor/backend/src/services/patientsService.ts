import patients from '../../data/patients';
import { NoSSNPatient, Patient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getNoSSNPatients = (): NoSSNPatient[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patients.map(({ ssn, ...rest }) => rest);
};

export default { getPatients, getNoSSNPatients };
