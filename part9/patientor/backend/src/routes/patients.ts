import express from 'express';

import patientsService from '../services/patientsService';
import { toNewPatient } from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

patientsRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  const requiredPatient = patientsService.findPatientById(id);
  requiredPatient ? res.send(requiredPatient) : res.sendStatus(404);
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
      res.status(500).send({ error: 'something went very wrong' });
    }
  }
});
export default patientsRouter;
