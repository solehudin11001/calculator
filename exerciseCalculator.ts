import { extractArgs } from "./utils";

interface ValidatedExerciseArgs {
  targetDailyHours: number;
  dailyExerciseHours: number[];
}

interface TargetDailyExercise {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const validationExerciseArgs = (args: string[]): ValidatedExerciseArgs => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const [targetDailyHours, ...dailyExerciseHours] = extractArgs(args);
  return {
    targetDailyHours,
    dailyExerciseHours,
  };
};

export const calculateExercises = ({
  targetDailyHours,
  dailyExerciseHours,
}: ValidatedExerciseArgs): TargetDailyExercise => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((d) => !!d).length;
  const average =
    dailyExerciseHours.reduce((prev, curr) => prev + curr, 0) / periodLength;
  const success = average >= targetDailyHours;
  const rating = Math.round(average);
  const ratingDescription =
    average >= targetDailyHours
      ? "Good job, keep it up"
      : "Not to bad but could be better";
  const target = targetDailyHours;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const exerciseArgs = validationExerciseArgs(process.argv);
  console.log(calculateExercises(exerciseArgs));
} catch (error: unknown) {
  let errorMessage = "Something bad happened";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
