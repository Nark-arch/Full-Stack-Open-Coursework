import express from 'express';

import patientsService from '../services/patientsService';
import { toNewEntry } from '../utils/toNewEntry';
import { toNewPatient } from '../utils/toNewPatient';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

patientsRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  try {
    const patient = patientsService.findPatientById(id);
    res.send(patient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).send({ error: error.message });
    } else {
      console.log(error);
      res.status(500).send({ error: 'something went very wrong' });
    }
  }
});

patientsRouter.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);

    res.send(addedPatient);
  } catch (error) {
    let errorMessage = 'Something went wrong.';

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
      res.status(400).send(errorMessage);
    } else {
      console.log(error);
      res.status(500).send('Something went VERY wrong');
    }
  }
});

patientsRouter.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientsService.addEntryToPatient(id, newEntry);

    res.send(addedEntry);
  } catch (error) {
    let errorMessage = 'Something went wrong.';

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
      res.status(400).send(errorMessage);
    } else {
      console.log(error);
      res.status(500).send('Something went VERY wrong');
    }
  }
});

export default patientsRouter;
