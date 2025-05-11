# 🧮 Calculator API

Calculator API sederhana masih dalam proses

---

## 🚀 Fitur

- BMI endpoint: `GET /bmi?height=[cm]&weight=[kg]`
- Exercises calculator endpoint: `POST /exercises`

---

## ▶️ Cara Menjalankan

```bash
pnpm install
pnpm run start
```

---

## 🧪 Contoh Request

### GET `/bmi`

`GET /bmi?height=180&weight=70`

### Response

`Normal`

### GET `/exercises`

```json
{
  "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
  "target": 2.5
}
```

### Response

```json
{
  "periodLength": 7,
  "trainingDays": 4,
  "success": false,
  "rating": 1,
  "ratingDescription": "Not to bad but could be better",
  "target": 2.5,
  "average": 1.2142857142857142
}
```

## 🧑‍💻 Author

Alo.
