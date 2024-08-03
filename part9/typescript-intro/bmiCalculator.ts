import calculateBmi from './calculateBmi';
import { parseNumArguments } from './utils';

try {
  const [height, weight] = parseNumArguments(process.argv.slice(2), 2);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
