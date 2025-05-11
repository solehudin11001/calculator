import express, { Express, Request, Response } from "express";
import calculateBMI from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app: Express = express();

interface ExercisesBody {
  daily_exercises: number[];
  target: number;
}

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("hello full stack");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    res
      .status(400)
      .json({ error: "Missing parameters: height and weight are required." });
    return;
  }

  const heightNum = Number(height);
  const weightNum = Number(weight);

  if (isNaN(heightNum) || isNaN(weightNum)) {
    res.status(400).json({ error: "Provided values must be numbers." });
    return;
  }

  try {
    const bmi = calculateBMI({ heightCM: heightNum, weightKG: weightNum });

    res.json({
      height: heightNum,
      weight: weightNum,
      bmi,
    });
  } catch (err: unknown) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong calculating BMI." });
  }
});

app.post(
  "/exercises",
  (req: Request<unknown, unknown, ExercisesBody>, res: Response) => {
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
      res.status(400).json({
        error:
          "Missing body: daily exercises (daily_exercises) and target are required.",
      });
      return;
    }

    if (daily_exercises.some((d) => isNaN(d)) || isNaN(target)) {
      res.status(400).json({ error: "Provided values must be numbers." });
      return;
    }

    try {
      const result = calculateExercises({
        targetDailyHours: target,
        dailyExerciseHours: daily_exercises,
      });

      res.json(result);
    } catch (err: unknown) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong calculating BMI." });
    }
  }
);

app.listen(3003, () => {
  console.log("server running on port:", 3003);
});

export default app;
