import { NewPatient } from '../types';
import { isDate, isGender, isObj, isString } from './isHelpers';
import { fieldParser } from './parseHelpers';

export const toNewPatient = (requestBody: unknown): NewPatient => {
  if (!isObj(requestBody)) throw new Error('Request Not an object');
  const obj = requestBody;
  return {
    name: fieldParser(obj, 'name', isString),
    dateOfBirth: fieldParser(obj, 'dateOfBirth', isDate),
    ssn: fieldParser(obj, 'ssn', isString),
    gender: fieldParser(obj, 'gender', isGender),
    occupation: fieldParser(obj, 'occupation', isString),
    entries: [],
  };
};
