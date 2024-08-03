import calculateExercises from './calculateExercises';
import { parseNumArguments } from './utils';

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
