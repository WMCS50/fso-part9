interface BmiValues {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return { 
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
      throw new Error('Inputs must be numbers'); 
  }
};

export const calculateBmi = (height: number, weight: number) : string => {
  if (height === 0 || weight === 0) {
    throw new Error('Height and weight must cannot be zero');
  }
 
  const bmi = weight / ((height/100) ** 2);
  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  } else if (bmi < 17) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (bmi < 25) {
    return 'Normal range';
  } else if (bmi < 30) {
    return 'Overweight (Pre-obese)';
  } else if (bmi < 35) {
    return 'Obese (Class I)';
  } else if (bmi < 40) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  const bmiResult = calculateBmi(height, weight);
  console.log(bmiResult);
  
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
}


