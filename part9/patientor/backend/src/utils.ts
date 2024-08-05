import { Gender, NewPatient } from './types';

export const toNewPatient = (obj: unknown): NewPatient => {
  if (!obj || typeof obj !== 'object')
    throw new Error('Request body invalid or missing');

  if (
    !(
      'name' in obj &&
      'dateOfBirth' in obj &&
      'ssn' in obj &&
      'gender' in obj &&
      'occupation' in obj
    )
  )
    throw new Error('Request body is missing required properties');

  return {
    name: parseStringProp(obj.name, 'name'),
    dateOfBirth: parseDateOfBirth(obj.dateOfBirth),
    ssn: parseStringProp(obj.ssn, 'ssn'),
    gender: parseGender(obj.gender),
    occupation: parseStringProp(obj.occupation, 'occupation'),
  };
};

const parseStringProp = (text: unknown, prop: string): string => {
  if (!isString(text)) throw new Error(`invalid ${prop} value`);
  return text;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth))
    throw new Error('invalid dateOfBirth value');
  return dateOfBirth;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender))
    throw new Error('invalid gender value');
  return gender;
};

const isString = (param: unknown): param is string => {
  return typeof param === 'string' || param instanceof String;
};

const isDate = (param: string): boolean => {
  return Boolean(Date.parse(param));
};

const isGender = (param: string): param is Gender =>
  Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
