import { extractArgs } from "./utils";

interface ValidatedExerciseArgs {
  targetDailyHours: number;
  dailyExerciseHours: number[];
}

const validationExerciseArgs = (args: string[]): ValidatedExerciseArgs => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const [targetDailyHours, ...dailyExerciseHours] = extractArgs(args);
  return {
    targetDailyHours,
    dailyExerciseHours,
  };
};

interface TargetDailyExercise {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  avarage: number;
}

const calculateExercises = ({
  targetDailyHours,
  dailyExerciseHours,
}: ValidatedExerciseArgs): TargetDailyExercise => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((d) => !!d).length;
  const avarage =
    dailyExerciseHours.reduce((prev, curr) => prev + curr, 0) / periodLength;
  const success = avarage >= targetDailyHours;
  const rating = Math.round(avarage);
  const ratingDescription =
    avarage >= targetDailyHours
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
    avarage,
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
