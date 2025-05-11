import request from "supertest";
import app from "../index";

describe("POST /exercises", () => {
  it("should return 200 and the correct result for calculate exercise", async () => {
    const res = await request(app)
      .post("/exercises")
      .send({
        daily_exercises: [1, 0, 2, 0, 3, 0, 2.5],
        target: 2.5,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      periodLength: 7,
      trainingDays: 4,
      success: false,
      rating: 1,
      ratingDescription: "Not to bad but could be better",
      target: 2.5,
      average: 1.2142857142857142,
    });
  });

  it("should return error if missing fields", async () => {
    const res = await request(app)
      .post("/exercises")
      .send({
        daily_exercises: [1, 0, 2, 0, 3, 0, 2.5],
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error:
        "Missing body: daily exercises (daily_exercises) and target are required.",
    });
  });

  it("should return error if missing fields", async () => {
    const res = await request(app)
      .post("/exercises")
      .send({
        daily_exercises: [1, 0, 2, 0, 3, 0, 2.5],
        target: "Good Job",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Provided values must be numbers." });
  });
});
