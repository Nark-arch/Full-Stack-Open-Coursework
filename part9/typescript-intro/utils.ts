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
