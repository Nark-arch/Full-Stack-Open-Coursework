import { Gender, NewPatient } from '../types';

import { isDate, isGender, isObj, isString } from './isHelpers';
import { fieldParser } from './parseHelpers';

export const toNewPatient = (requestBody: unknown): NewPatient => {
  if (!isObj(requestBody)) throw new Error('Request empty or not an object');
  const obj = requestBody;
  return {
    name: fieldParser<string, NewPatient>(obj, 'name', isString),
    dateOfBirth: fieldParser<string, NewPatient>(obj, 'dateOfBirth', isDate),
    ssn: fieldParser<string, NewPatient>(obj, 'ssn', isString),
    gender: fieldParser<Gender, NewPatient>(obj, 'gender', isGender),
    occupation: fieldParser<string, NewPatient>(obj, 'occupation', isString),
    entries: [],
  };
};
