import {
  EntryType,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  NewEntry,
  OccupationalHealthcareEntry,
} from '../types';

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

  const type = fieldParser<EntryType, NewEntry>(obj, 'type', isEntryType);

  const newEntry: NewEntry = {
    description: fieldParser<string, NewEntry>(obj, 'description', isString),
    date: fieldParser<string, NewEntry>(obj, 'date', isDate),
    specialist: fieldParser<string, NewEntry>(obj, 'specialist', isString),
    ...typeEntryFields(type, obj),
  };

  const diagnosisCodes =
    parseDiagnosisCodes(obj).length > 0 ? parseDiagnosisCodes(obj) : null;
  if (diagnosisCodes) {
    newEntry.diagnosisCodes = diagnosisCodes;
  }
  return newEntry;
};

const typeEntryFields = (type: EntryType, obj: object) => {
  switch (type) {
    case 'Hospital':
      return {
        type,
        discharge: parseDischarge(
          fieldParser<object, HospitalEntry>(obj, 'discharge', isObj)
        ),
      };

    case 'HealthCheck':
      return {
        type,
        healthCheckRating: fieldParser<HealthCheckRating, HealthCheckEntry>(
          obj,
          'healthCheckRating',
          isHealthCheckRating
        ),
      };

    case 'OccupationalHealthcare':
      const employerName = fieldParser<string, OccupationalHealthcareEntry>(
        obj,
        'employerName',
        isString
      );
      if (isObjKey('sickLeave', obj)) {
        return {
          type,
          employerName,
          sickLeave: parseSickLeave(
            fieldParser<object, OccupationalHealthcareEntry>(
              obj,
              'sickLeave',
              isObj
            )
          ),
        };
      }
      return { employerName, type };

    default:
      throw new Error('yeah this wont happen');
  }
};
