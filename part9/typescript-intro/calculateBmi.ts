const bmiResultArray = [
  'Underweight (Severe thinness)',
  'Underweight (Moderate thinness)',
  'Underweight (Mild thinness)',
  'Normal range (healthy weight)',
  'Overweight (Class I)',
  'Obese (Class II)',
  'Obese (Class III)',
];

type bmiResult = (typeof bmiResultArray)[number];

const calculateBmi = (height: number, weight: number): bmiResult => {
  if (height === 0) {
    throw new Error('Height cannot be zero, cannot divide by zero');
  }
  const metreHeight: number = height / 100;
  const bmi: number = weight / metreHeight ** 2;
  if (bmi < 16) {
    return bmiResultArray[0];
  }
  if (bmi < 17) {
    return bmiResultArray[1];
  }
  if (bmi < 18.5) {
    return bmiResultArray[2];
  }
  if (bmi < 25) {
    return bmiResultArray[3];
  }
  if (bmi < 30) {
    return bmiResultArray[4];
  }
  if (bmi < 35) {
    return bmiResultArray[5];
  }
  if (bmi < 40) {
    return bmiResultArray[6];
  }
  if (bmi > 40) {
    return bmiResultArray[7];
  } else {
    throw new Error(`Something went very wrong, invalid BMI: ${bmi}`);
  }
};

export default calculateBmi;
