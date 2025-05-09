export const extractArgs = (args: string[]): number[] => {
  const [a, b, ...numbers] = args;
  const convertedArgs = numbers.map(Number);

  if (!convertedArgs.some((n) => isNaN(n))) {
    return convertedArgs;
  } else {
    throw new Error("Provided values were not numbers!");
  }
};
