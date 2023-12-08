import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: 'Malformatted parameters.' });
  }

  const bmi = calculateBmi(height, weight);
  
  res.status(200).send(`BMI: ${bmi}`);

});

app.post('/exercises', (req, res) => {
  //const { daily_exercises, targetHours } = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const exerciseHours: number[] = req.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const targetHours: number = req.body.target;

  if (!exerciseHours || !targetHours) {
    res.status(400).send({ error: 'parameters missing'});
  }
  if (
    exerciseHours.length != 7 ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    exerciseHours.some((num: any) => typeof num !== 'number' || isNaN(num)) || 
    isNaN(targetHours)
  ) {
    res.status(400).send({ error: 'malformatted parameters.'});
  }

  const result = calculateExercises(exerciseHours, targetHours);
  res.send({ result });
  
});



const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});