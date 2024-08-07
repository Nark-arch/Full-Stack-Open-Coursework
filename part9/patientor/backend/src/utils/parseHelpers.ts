import { Diagnosis, Discharge, SickLeave } from '../types';
import { isDate, isObjKey, isString } from './isHelpers';

export const fieldParser = <T>(
  obj: object,
  field: string,
  validator: (value: unknown) => value is T
): T => {
  if (!isObjKey(field, obj)) throw new Error(`${field} missing from request`);
  if (!validator(obj[field])) throw new Error(`${field} is malformmatted`);

  return obj[field] as T;
};

export const parseDischarge = (value: object): Discharge => ({
  date: fieldParser(value, 'date', isDate),
  criteria: fieldParser(value, 'criteria', isString),
});

export const parseSickLeave = (value: object): SickLeave => ({
  startDate: fieldParser(value, 'startDate', isDate),
  endDate: fieldParser(value, 'endDate', isString),
});

export const parseDiagnosisCodes = (
  object: unknown
): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};
