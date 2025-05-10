import express from "express";
import calculateBMI from "./bmiCalculator";

const app = express();

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

app.listen(3003, () => {
  console.log("server running on port:", 3003);
});
