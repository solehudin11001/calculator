export const extractArgs = (args: string[]): number[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_a, _b, ...numbers] = args;
  const convertedArgs = numbers.map(Number);

  if (!convertedArgs.some((n) => isNaN(n))) {
    return convertedArgs;
  } else {
    const e = new Error("Provided values were not numbers!");
    e.name = "USER_BAD_INPUT";
    throw e;
  }
};
