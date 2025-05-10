import { extractArgs } from "./utils";

interface ValidatedBMIArgs {
  heightCM: number;
  weightKG: number;
}

const validationBMIArgs = (args: string[]): ValidatedBMIArgs => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  const [heightCM, weightKG] = extractArgs(args);
  return {
    heightCM,
    weightKG,
  };
};

const calculateBMI = ({ heightCM, weightKG }: ValidatedBMIArgs): string => {
  const height = heightCM / 100;
  const bmi = weightKG / Math.pow(height, 2);

  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
};

try {
  const bmiArgs = validationBMIArgs(process.argv);
  console.log(calculateBMI(bmiArgs));
} catch (error: unknown) {
  let errorMessage = "Something bad happened";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

export default calculateBMI;
