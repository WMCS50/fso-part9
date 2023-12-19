import { useState, useEffect } from "react";
import { Patient, Gender, Diagnosis } from "../types";
import patientService from "../services/patients";
import diagnosesService from "../services/diagnoses";
import { useParams } from "react-router-dom";
import { Female, Male, Transgender } from "@mui/icons-material";

const GetById = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnosesData, setDiagnosesData] = useState<Diagnosis[]>([]);
  const id = String(useParams().id);
 
  useEffect(() => {
    const getDiagnoses = async () => {
      try {
        const diagnoses = await diagnosesService.getAll();
        setDiagnosesData(diagnoses);
      } catch (error) {
        console.error("Error fetching diagnoses data", error);
      }
    };
    getDiagnoses();
      const getPatient = async () => {
        try {
          const patient = await patientService.getById(id);
          setPatient(patient);
        } catch (error) {
          console.error("Error fetching patient:", error);
        }
      };
      getPatient();
  }, [id]);
  
  
  if (!patient) {
    return <></>;
  }

  const genderIcon = (gender: Gender) => {
    if (gender === 'female') {
      return <Female />;
    } else if (gender === 'male') {
      return <Male />;
    } else {
      return <Transgender />;
    }
  };

  const displayEntries = (patient: Patient) => {
    return patient.entries.map(entry => 
      <div key={entry.id}>
        <p>{entry.date} <i>{entry.description}</i></p>
        {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <div>
          <p>Diagnosis Codes:</p>
          <ul>
            {entry.diagnosisCodes.map((code, index) => {
              const diagnosis = diagnosesData.find(diagnosesData => diagnosesData.code === code);
              return (
              <li key={index}>
                {code && diagnosis ? `${diagnosis.code} ${diagnosis.name}` : 'Unknown Diagnosis'}
              </li>);
            })}
          </ul>
        </div>
      )}
      </div>
      );
    };

  return (
    <div>
      <h2>{patient.name} {genderIcon(patient.gender)} </h2>
      <p>{patient.ssn}</p>
      <p>{patient.occupation}</p>
      <h3>entries</h3>
      <p>{displayEntries(patient)}</p>
    </div>
  );
};

export default GetById;
