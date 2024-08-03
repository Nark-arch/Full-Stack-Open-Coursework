import { parseNumArguments } from './utils';

type rating = 1 | 2 | 3;

const ratingDescriptionValues: string[] = [
  'poor effort',
  'not too bad but could be better',
  'excellent effort',
];

interface ExerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: rating;
  ratingDescriptions: (typeof ratingDescriptionValues)[number];
  target: number;
  average: number;
}

const calculateExercises = (
  target: number,
  dailyHours: number[]
): ExerciseResults => {
  let totalHours: number = 0;
  const periodLength: number = dailyHours.length;
  let trainingDays: number = 0;
  let success: boolean = false;
  let rating: rating = 1;

  for (let i = 0; i < periodLength; i++) {
    if (dailyHours[i] > 0) {
      trainingDays += 1;
      totalHours += dailyHours[i];
    }
  }

  const average = totalHours / periodLength;

  if (average >= target) {
    success = true;
    rating = 3;
  } else if (average >= target / 2) {
    rating = 2;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescriptions: ratingDescriptionValues[rating - 1],
    target,
    average,
  };
};

try {
  const [target, ...dailyHours]: number[] = parseNumArguments(
    process.argv.slice(2),
    process.argv.length - 2
  );
  console.log(calculateExercises(target, dailyHours));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
