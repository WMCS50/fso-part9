import express from 'express';
import patientsService from '../services/patientsService';
import {toNewPatientEntry} from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNoSSNPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientsService.findById(String(req.params.id));
  console.log('patient', patient);
  if (!patient) return res.status(404).send();
  return res.send(patient);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientsService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;