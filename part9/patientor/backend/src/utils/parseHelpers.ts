import { Diagnosis, Discharge, SickLeave } from '../types';
import { isDate, isObjKey, isString } from './isHelpers';

export const fieldParser = <T, K>(
  obj: object,
  field: keyof K,
  validator: (value: unknown) => value is T
): T => {
  if (!isObjKey(field, obj))
    throw new Error(`${String(field)} missing from request`);
  if (!validator(obj[field]))
    throw new Error(`${String(field)} is malformmatted`);

  return obj[field];
};

export const parseDischarge = (value: object): Discharge => ({
  date: fieldParser<string, Discharge>(value, 'date', isDate),
  criteria: fieldParser<string, Discharge>(value, 'criteria', isString),
});

export const parseSickLeave = (value: object): SickLeave => ({
  startDate: fieldParser<string, SickLeave>(value, 'startDate', isDate),
  endDate: fieldParser<string, SickLeave>(value, 'endDate', isDate),
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
