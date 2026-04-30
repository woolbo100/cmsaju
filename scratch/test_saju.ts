import { calculateSaju } from "../src/lib/saju";

const result = calculateSaju({
  birthDate: "1990-01-01",
  birthTime: "12:00",
  calendarType: "solar",
  gender: "male",
});

console.log(JSON.stringify(result, null, 2));
