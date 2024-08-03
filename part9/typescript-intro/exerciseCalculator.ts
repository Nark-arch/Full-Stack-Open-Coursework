type rating = 1 | 2 | 3;

const target: number = 2;

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
const calculateExercises = (dailyHours: number[]): ExerciseResults => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]));
