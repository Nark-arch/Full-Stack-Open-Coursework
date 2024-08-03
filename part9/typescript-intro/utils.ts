import { ParsedQs } from 'qs';

export const parseNumArguments = (
  args: string[],
  argCount: number
): number[] => {
  if (args.length < argCount) throw new Error('Not enough arguments');
  if (args.length > argCount) throw new Error('Too many arguments');
  const numArgs: number[] = [];
  for (let i = 0; i < argCount; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided values were not numbers!');
    }
    numArgs.push(Number(args[i]));
  }
  return numArgs;
};

export interface bmiQuery {
  height: string;
  weight: string;
}

export const parseToBmiQuery = (query: ParsedQs): bmiQuery => {
  if (!query) throw new Error('no query');
  if (typeof query.height !== 'string') throw new Error('missing height');
  if (typeof query.weight !== 'string') throw new Error('missing weight');
  return { height: query.height, weight: query.weight };
};

export interface exercisesQuery {
  daily_exercises: number[];
  target: number;
}

export const parseToExerciseQuery = (requestBody: unknown): exercisesQuery => {
  if (!requestBody) throw new Error('missing request body');
  if (typeof requestBody !== 'object') throw new Error('Invalid request body');

  if (!('target' in requestBody)) throw new Error('missing target');
  if (!('daily_exercises' in requestBody))
    throw new Error('missing daily exercises');

  if (typeof requestBody.target !== 'number')
    throw new Error('target is not a number');

  if (!Array.isArray(requestBody.daily_exercises))
    throw new Error('exercises is not an array');
  if (!requestBody.daily_exercises.every((e) => typeof e === 'number'))
    throw new Error('exercises is not an array of numbers');

  return {
    daily_exercises: requestBody.daily_exercises,
    target: requestBody.target,
  };
};
