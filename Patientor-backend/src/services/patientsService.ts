import { v1 as uuid } from 'uuid';
const id = uuid();
import patients from '../../data/patients';

import { Patient, NoSSNPatient, NewPatientEntry } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getNoSSNPatients = (): NoSSNPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
  
  const newPatientEntry = {
    id: id,
    ...entry
  };
  
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
  getPatients,
  getNoSSNPatients,
  findById,
  addPatient 
};