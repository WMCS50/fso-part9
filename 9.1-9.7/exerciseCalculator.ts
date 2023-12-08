interface ExerciseValues {
  exerciseHours: number[];
  targetHours: number;
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const hours = process.argv.slice(2).map(Number);
  const targetHours = hours[0]; //first argument after script name is target hours
  const exerciseHours = hours.slice(1); //remaining arguments are exerciseHours

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (exerciseHours.some((num: any) => typeof num !== 'number' || isNaN(num)) || 
  isNaN(targetHours)) {
    return { 
      exerciseHours,
      targetHours
    };
  } else {
      throw new Error('Inputs must be numbers'); 
  }
};

interface Recommendation {
  periodLength: number;
  trainingDays: number;
  ratingNumber: number;
  ratingDescription: string;
  success: boolean;
  target: number;
  averageHours: number;
}



export const calculateExercises = (exerciseHours: number[], targetHours: number) : Recommendation => {
  if (exerciseHours.length === 0 || targetHours === 0) {
    throw new Error('Exercise hours and target hours must be provided');
  }
  
  if (!Array.isArray(exerciseHours) || exerciseHours.some(isNaN) || targetHours <= 0) {
    throw new Error('Invalid input. Exercise hours must be numbers and target hours must be non-zero.');
  }

  //calculate period length
  const periodLength = exerciseHours.length;

  //calculate time
  const timeSum = exerciseHours.reduce((accumulator, currentValue) => 
    accumulator + currentValue, 0);
  const averageHours = timeSum/exerciseHours.length;
  const target = targetHours;

  //calculate days trained
  const trainingDays = exerciseHours.reduce((count, element) =>
    count + (element !== 0 ? 1 : 0), 0);

  //success achieved
  const success = averageHours >= targetHours;
  
  //calcualte ratingNumber
  const calcRatingNumber = (averageHours: number, targetHours: number) : number => {
    const hoursRatio = averageHours / targetHours;
  
    if (hoursRatio >= 1) {
      return 1;
    } else if (hoursRatio >= 0.50 && hoursRatio < 1) {
      return 2;
    } else {
      return 3;
    }
  };

  const ratingNumber = calcRatingNumber(averageHours, targetHours);
  
  //provide appropriate description of rating
  const detRatingDescription = (ratingNumber: number) : string => {
    switch(ratingNumber) {
      case 1:
        return 'great work';
      case 2:
        return 'not too bad but could be better';
      case 3:
        return 'common now, put in the work!';
      default:
        throw new Error('Calculation malfunction');
    }
  };

  const ratingDescription = detRatingDescription(ratingNumber);

  const recommendation: Recommendation = {
    periodLength,
    trainingDays,
    success,
    ratingNumber,
    ratingDescription,
    target,
    averageHours
  };
  
  return recommendation;
  
};

try {
  const { exerciseHours, targetHours } = parseExerciseArguments(process.argv);
  console.log('command line', calculateExercises(exerciseHours, targetHours));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

