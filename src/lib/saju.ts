import {
  calculateFourPillars,
  getEarthlyBranchElement,
  getHeavenlyStemElement,
  lunarToSolar,
  solarToLunar,
  type BirthInfo,
  type EarthlyBranch,
  type FiveElement,
  type FourPillarsDetail,
  type HeavenlyStem,
} from "manseryeok";

export type CalendarType = "solar" | "lunar";
export type Gender = "male" | "female";
export type FiveElements = "Wood" | "Fire" | "Earth" | "Metal" | "Water";

export interface SajuInput {
  birthDate: string;
  birthTime?: string;
  calendarType?: CalendarType;
  gender?: Gender;
  isLeapMonth?: boolean;
}

export interface SajuPillarSummary {
  label: "year" | "month" | "day" | "hour";
  korean: string;
  hanja: string;
  heavenlyStem: HeavenlyStem;
  earthlyBranch: EarthlyBranch;
  stemElement: FiveElements;
  branchElement: FiveElements;
}

export interface SajuResult {
  input: {
    birthDate: string;
    birthTime: string;
    calendarType: CalendarType;
    gender: Gender | null;
    isLeapMonth: boolean;
  };
  convertedDate: {
    solar: { year: number; month: number; day: number };
    lunar: { year: number; month: number; day: number; isLeapMonth: boolean };
  };
  pillars: {
    year: SajuPillarSummary;
    month: SajuPillarSummary;
    day: SajuPillarSummary;
    hour: SajuPillarSummary;
  };
  heavenlyStems: HeavenlyStem[];
  earthlyBranches: EarthlyBranch[];
  fiveElementCount: Record<FiveElements, number>;
  strongElements: FiveElements[];
  weakElements: FiveElements[];
  strongestElement: FiveElements;
  weakestElement: FiveElements;
  dayMaster: FiveElements;
  missingElement: FiveElements;
  pillarsForDisplay: Array<{
    label: string;
    hanja: string;
    hangeul: string;
    element: FiveElements;
  }>;
  raw: FourPillarsDetail;
}

interface ElementDetails {
  name: string;
  description: string;
  color: string;
  image: string;
  guardian: string;
  guardianTitle: string;
  guardianDesc: string;
}

const elementMap: Record<FiveElement, FiveElements> = {
  "\uBAA9": "Wood",
  "\uD654": "Fire",
  "\uD1A0": "Earth",
  "\uAE08": "Metal",
  "\uC218": "Water",
};

const pillarDisplayLabel: Record<SajuPillarSummary["label"], string> = {
  year: "\uB144",
  month: "\uC6D4",
  day: "\uC77C",
  hour: "\uC2DC",
};

const elementDetailsMap: Record<FiveElements, ElementDetails> = {
  Wood: {
    name: "\uBAA9 | \uC790\uB77C\uB098\uB294 \uAE30\uC6B4",
    description: "\uC131\uC7A5\uACFC \uD655\uC7A5, \uADF8\uB9AC\uACE0 \uBD80\uB4DC\uB7EC\uC6B4 \uC0DD\uBA85\uB825\uC744 \uB4DC\uB7EC\uB0B4\uB294 \uC624\uD589\uC785\uB2C8\uB2E4.",
    color: "#4A5D4E",
    image: "/assets/element_wood.png",
    guardian: "/assets/element_wood.png",
    guardianTitle: "\uC0DD\uC7A5\uC758 \uD48D\uACBD",
    guardianDesc: "\uC790\uB77C\uB0A8\uACFC \uD655\uC7A5\uC758 \uAE30\uC6B4\uC744 \uC740\uC740\uD558\uAC8C \uBCF4\uC644\uD558\uB294 \uC218\uD638\uD654\uC785\uB2C8\uB2E4.",
  },
  Fire: {
    name: "\uD654 | \uBE5B\uACFC \uC5F4\uAE30",
    description: "\uC628\uAE30, \uD45C\uD604\uB825, \uC0DD\uB3D9\uAC10\uC744 \uB4DC\uB7EC\uB0B4\uB294 \uC624\uD589\uC785\uB2C8\uB2E4.",
    color: "#7D4A4A",
    image: "/assets/element_fire.png",
    guardian: "/assets/guardian_fire.png",
    guardianTitle: "\uBE5B\uC758 \uC5F0\uCD9C",
    guardianDesc: "\uCC28\uAC11\uC9C0 \uC54A\uC740 \uC628\uAE30\uC640 \uC0DD\uAE30\uB97C \uCC44\uC6CC \uC8FC\uB294 \uC218\uD638 \uC791\uD488\uC785\uB2C8\uB2E4.",
  },
  Earth: {
    name: "\uD1A0 | \uC911\uC2EC\uACFC \uC548\uC815",
    description: "\uADE0\uD615\uAC10, \uC2E0\uB8B0, \uBC1B\uCCD0 \uC8FC\uB294 \uD798\uC744 \uB098\uD0C0\uB0B4\uB294 \uC624\uD589\uC785\uB2C8\uB2E4.",
    color: "#7D6B4A",
    image: "/assets/element_earth.png",
    guardian: "/assets/element_earth.png",
    guardianTitle: "\uB300\uC9C0\uC758 \uACB0",
    guardianDesc: "\uD750\uD2B8\uB7EC\uC9C4 \uAE30\uC6B4\uC744 \uBC1B\uC544 \uC548\uC815\uAC10 \uC788\uAC8C \uC815\uB9AC\uD574 \uC8FC\uB294 \uC218\uD638\uD654\uC785\uB2C8\uB2E4.",
  },
  Metal: {
    name: "\uAE08 | \uACB0\uC815\uACFC \uC815\uC81C",
    description: "\uAE4A\uC774 \uC788\uB294 \uD310\uB2E8\uB825\uACFC \uC815\uC81C\uB41C \uC5D0\uB108\uC9C0\uB97C \uC758\uBBF8\uD558\uB294 \uC624\uD589\uC785\uB2C8\uB2E4.",
    color: "#5D5D5D",
    image: "/assets/element_metal.png",
    guardian: "/assets/element_metal.png",
    guardianTitle: "\uC815\uC81C\uB41C \uBC29\uD5A5",
    guardianDesc: "\uD769\uC5B4\uC9C4 \uAE30\uC6B4\uC744 \uB2E8\uC815\uD558\uAC8C \uC138\uC6CC \uC8FC\uB294 \uC815\uC81C\uC758 \uC218\uD638\uD654\uC785\uB2C8\uB2E4.",
  },
  Water: {
    name: "\uC218 | \uD750\uB984\uACFC \uC9C0\uD61C",
    description: "\uC720\uC5F0\uD568, \uD1B5\uCC30, \uAE4A\uC740 \uAC10\uC751\uC744 \uB2F4\uC544\uB0B4\uB294 \uC624\uD589\uC785\uB2C8\uB2E4.",
    color: "#4A546D",
    image: "/assets/element_water.png",
    guardian: "/assets/guardian_water.png",
    guardianTitle: "\uACE0\uC694\uD55C \uBC14\uB2E4",
    guardianDesc: "\uBD80\uC871\uD55C \uD750\uB984\uACFC \uD1B5\uCC30\uC758 \uAE30\uC6B4\uC744 \uC794\uC794\uD558\uAC8C \uCC44\uC6CC \uC8FC\uB294 \uC218\uD638\uD654\uC785\uB2C8\uB2E4.",
  },
};

const initialElementCount = (): Record<FiveElements, number> => ({
  Wood: 0,
  Fire: 0,
  Earth: 0,
  Metal: 0,
  Water: 0,
});

const parseBirthDate = (birthDate: string) => {
  const [year, month, day] = birthDate.split("-").map(Number);

  if (![year, month, day].every(Number.isFinite)) {
    throw new Error("Invalid birthDate");
  }

  return { year, month, day };
};

const parseBirthTime = (birthTime?: string) => {
  const normalized = birthTime && birthTime.trim() ? birthTime : "12:00";
  const [hour, minute] = normalized.split(":").map(Number);

  if (![hour, minute].every(Number.isFinite)) {
    throw new Error("Invalid birthTime");
  }

  return { hour, minute, normalized };
};

const buildBirthInfo = (input: SajuInput): BirthInfo => {
  const { year, month, day } = parseBirthDate(input.birthDate);
  const { hour, minute } = parseBirthTime(input.birthTime);

  return {
    year,
    month,
    day,
    hour,
    minute,
    isLunar: input.calendarType === "lunar",
    isLeapMonth: input.calendarType === "lunar" ? Boolean(input.isLeapMonth) : false,
  };
};

const summarizePillar = (
  label: SajuPillarSummary["label"],
  korean: string,
  hanja: string,
  heavenlyStem: HeavenlyStem,
  earthlyBranch: EarthlyBranch,
): SajuPillarSummary => ({
  label,
  korean,
  hanja,
  heavenlyStem,
  earthlyBranch,
  stemElement: elementMap[getHeavenlyStemElement(heavenlyStem)],
  branchElement: elementMap[getEarthlyBranchElement(earthlyBranch)],
});

export function calculateSaju(input: SajuInput): SajuResult;
export function calculateSaju(
  birthDate: string,
  birthTime?: string,
  calendarType?: CalendarType,
  gender?: Gender,
): SajuResult;
export function calculateSaju(
  inputOrBirthDate: SajuInput | string,
  birthTime?: string,
  calendarType?: CalendarType,
  gender?: Gender,
): SajuResult {
  const input: SajuInput =
    typeof inputOrBirthDate === "string"
      ? {
          birthDate: inputOrBirthDate,
          birthTime,
          calendarType,
          gender,
        }
      : inputOrBirthDate;

  const birthInfo = buildBirthInfo(input);
  const raw = calculateFourPillars(birthInfo);

  const pillars = {
    year: summarizePillar(
      "year",
      raw.yearString,
      raw.yearHanja,
      raw.year.heavenlyStem,
      raw.year.earthlyBranch,
    ),
    month: summarizePillar(
      "month",
      raw.monthString,
      raw.monthHanja,
      raw.month.heavenlyStem,
      raw.month.earthlyBranch,
    ),
    day: summarizePillar(
      "day",
      raw.dayString,
      raw.dayHanja,
      raw.day.heavenlyStem,
      raw.day.earthlyBranch,
    ),
    hour: summarizePillar(
      "hour",
      raw.hourString,
      raw.hourHanja,
      raw.hour.heavenlyStem,
      raw.hour.earthlyBranch,
    ),
  };

  const heavenlyStems = [
    pillars.year.heavenlyStem,
    pillars.month.heavenlyStem,
    pillars.day.heavenlyStem,
    pillars.hour.heavenlyStem,
  ];

  const earthlyBranches = [
    pillars.year.earthlyBranch,
    pillars.month.earthlyBranch,
    pillars.day.earthlyBranch,
    pillars.hour.earthlyBranch,
  ];

  const fiveElementCount = initialElementCount();

  Object.values(pillars).forEach((pillar) => {
    fiveElementCount[pillar.stemElement] += 1;
    fiveElementCount[pillar.branchElement] += 1;
  });

  const counts = Object.values(fiveElementCount);
  const maxCount = Math.max(...counts);
  const minCount = Math.min(...counts);

  const strongElements = (Object.entries(fiveElementCount) as Array<[FiveElements, number]>)
    .filter(([, count]) => count === maxCount)
    .map(([element]) => element);

  const weakElements = (Object.entries(fiveElementCount) as Array<[FiveElements, number]>)
    .filter(([, count]) => count === minCount)
    .map(([element]) => element);

  const solarDate =
    input.calendarType === "lunar"
      ? lunarToSolar(birthInfo.year, birthInfo.month, birthInfo.day, Boolean(birthInfo.isLeapMonth))
      : { year: birthInfo.year, month: birthInfo.month, day: birthInfo.day };

  const lunarDate =
    input.calendarType === "lunar"
      ? {
          year: birthInfo.year,
          month: birthInfo.month,
          day: birthInfo.day,
          isLeapMonth: Boolean(birthInfo.isLeapMonth),
        }
      : solarToLunar(birthInfo.year, birthInfo.month, birthInfo.day);

  return {
    input: {
      birthDate: input.birthDate,
      birthTime: parseBirthTime(input.birthTime).normalized,
      calendarType: input.calendarType ?? "solar",
      gender: input.gender ?? null,
      isLeapMonth: Boolean(input.isLeapMonth),
    },
    convertedDate: {
      solar: solarDate,
      lunar: lunarDate,
    },
    pillars,
    heavenlyStems,
    earthlyBranches,
    fiveElementCount,
    strongElements,
    weakElements,
    strongestElement: strongElements[0],
    weakestElement: weakElements[0],
    dayMaster: pillars.day.stemElement,
    missingElement: weakElements[0],
    pillarsForDisplay: Object.values(pillars).map((pillar) => ({
      label: pillarDisplayLabel[pillar.label],
      hanja: pillar.hanja,
      hangeul: pillar.korean,
      element: pillar.stemElement,
    })),
    raw,
  };
}

export const getElementDetails = (element: FiveElements) => elementDetailsMap[element];
