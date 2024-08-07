import { EntryType, HealthCheckRating, NewBaseEntry, NewEntry } from '../types';

import {
  isDate,
  isEntryType,
  isHealthCheckRating,
  isObj,
  isObjKey,
  isString,
} from './isHelpers';
import {
  fieldParser,
  parseDiagnosisCodes,
  parseDischarge,
  parseSickLeave,
} from './parseHelpers';

export const toNewEntry = (requestBody: unknown): NewEntry => {
  if (!isObj(requestBody)) throw new Error('Request Not an object');

  const obj = requestBody;

  const newBaseEntry: NewBaseEntry = {
    description: fieldParser<string>(obj, 'description', isString),
    date: fieldParser<string>(obj, 'date', isDate),
    specialist: fieldParser<string>(obj, 'specialist', isString),
    diagnosisCodes: parseDiagnosisCodes(obj),
  };

  const type = fieldParser<EntryType>(obj, 'type', isEntryType);

  return toTypeEntry(type, newBaseEntry, obj);
};

const toTypeEntry = (
  type: EntryType,
  newBaseEntry: NewBaseEntry,
  obj: object
): NewEntry => {
  switch (type) {
    case 'Hospital':
      const dischObj = fieldParser<object>(obj, 'discharge', isObj);
      const discharge = parseDischarge(dischObj);

      return { type, discharge, ...newBaseEntry };

    case 'HealthCheck':
      const healthCheckRating = fieldParser<HealthCheckRating>(
        obj,
        'healthCheckRating',
        isHealthCheckRating
      );

      return { type, healthCheckRating, ...newBaseEntry };

    case 'OccupationalHealthcare':
      const employerName = fieldParser<string>(obj, 'employerName', isString);
      const occupationalEntry = { type, employerName, ...newBaseEntry };

      if (isObjKey('sickLeave', obj)) {
        const sickObj = fieldParser<object>(obj, 'sickLeave', isObj);
        const sickLeave = parseSickLeave(sickObj);

        return { sickLeave, ...occupationalEntry };
      }

      return occupationalEntry;

    default:
      throw new Error('yeah this wont happen');
  }
};
