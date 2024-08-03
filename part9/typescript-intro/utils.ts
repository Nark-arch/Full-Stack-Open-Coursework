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
  if (!query) throw new Error('query undefined');
  if (typeof query.height !== 'string') throw new Error('missing height');
  if (typeof query.weight !== 'string') throw new Error('missing weight');
  return { height: query.height, weight: query.weight };
};
