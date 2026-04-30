"use client";

import { calculateSaju, type CalendarType, type Gender, type SajuResult } from "@/lib/saju";
import { motion } from "framer-motion";
import { ArrowRight, Check, Download, HeartHandshake, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type CompatibilityType =
  | "love"
  | "marriage"
  | "reunion"
  | "situationship"
  | "spouse"
  | "business"
  | "human"
  | "family";

type RelationshipType = CompatibilityType | "premium";

interface PersonFormState {
  name: string;
  gender: Gender;
  birthDate: string;
  birthTime: string;
  calendarType: CalendarType;
  isLeapMonth: boolean;
}

interface CompatibilityOption {
  id: CompatibilityType;
  label: string;
  subtitle: string;
  focus: string[];
  reading: string;
}

const compatibilityOptions: CompatibilityOption[] = [
  {
    id: "love",
    label: "연애 궁합",
    subtitle: "감정 흐름과 끌림의 방향",
    focus: ["감정 표현 방식", "오래 가는 관계인지", "이별 포인트", "결혼 가능성"],
    reading: "당신들은 사랑의 속도가 다르지만, 마음이 깊어지는 이유는 서로에게 없는 결을 발견하기 때문입니다.",
  },
  {
    id: "marriage",
    label: "결혼 궁합",
    subtitle: "함께 살아가는 리듬과 안정성",
    focus: ["생활 리듬", "현실 감각", "갈등 조율 방식", "장기 안정성"],
    reading: "이 관계는 감정보다 생활의 리듬을 어떻게 맞추느냐에 따라 훨씬 오래 갑니다.",
  },
  {
    id: "reunion",
    label: "재회 가능성",
    subtitle: "멀어진 흐름이 다시 이어지는가",
    focus: ["다시 가까워지는 시기", "끊어진 원인", "재회 가능 포인트", "놓치기 쉬운 신호"],
    reading: "이 인연은 감정보다 타이밍이 더 중요해서, 서두르면 멀어지고 기다리면 다시 이어질 수 있습니다.",
  },
  {
    id: "situationship",
    label: "썸 흐름",
    subtitle: "아직 이름 붙지 않은 관계의 결",
    focus: ["끌림의 방향", "속도 차이", "관계가 깊어지는 계기", "애매함이 생기는 이유"],
    reading: "관계의 이름이 늦게 붙는 대신, 한 번 방향이 정해지면 빠르게 깊어질 수 있는 흐름입니다.",
  },
  {
    id: "spouse",
    label: "부부 궁합",
    subtitle: "가까운 거리에서 드러나는 진짜 호흡",
    focus: ["생활 속 갈등", "정서적 기대치", "함께 강해지는 부분", "지치는 패턴"],
    reading: "가까울수록 표현 방식의 차이가 크게 느껴지지만, 익숙해지면 서로를 가장 안정시키는 조합입니다.",
  },
  {
    id: "business",
    label: "사업 궁합",
    subtitle: "돈과 역할의 흐름을 보는 관계",
    focus: ["역할 분담", "돈의 흐름", "의사결정 충돌", "함께 강한 부분"],
    reading: "한 사람은 추진하고 한 사람은 정리할 때 가장 강해지는 관계이며, 역할이 바뀌면 마찰이 커집니다.",
  },
  {
    id: "human",
    label: "인간관계 궁합",
    subtitle: "함께 있을 때 편안한가, 긴장되는가",
    focus: ["정서적 거리감", "말이 통하는 지점", "갈등의 반복 이유", "관계 유지 방식"],
    reading: "이 관계는 친밀감보다 이해의 속도가 중요해서, 말보다 맥락을 읽을 때 훨씬 편안해집니다.",
  },
  {
    id: "family",
    label: "가족 궁합",
    subtitle: "오래된 관계의 깊은 패턴",
    focus: ["정서적 역할", "반복되는 충돌", "서로 기대하는 것", "관계 회복의 열쇠"],
    reading: "가까운 만큼 감정이 먼저 부딪히지만, 결국 서로의 역할을 인정할 때 가장 빨리 풀리는 관계입니다.",
  },
];

const singleCompatibilitySections = [
  "A/B 각각의 기본 사주 요약",
  "일간, 오행 분포, 강한 기운, 부족한 기운",
  "잘 맞는 부분과 충돌하는 부분",
  "서로에게 끌리는 이유와 반복 갈등 패턴",
  "선택한 궁합 1개 상세 해석",
  "관계의 한 줄 해석 카드",
  "궁합 수묵화 아트 1종 다운로드",
];

const premiumCompatibilitySections = [
  "단일 궁합 리포트의 모든 내용 포함",
  "연애·결혼·장기 관계 안정성 전체 분석",
  "가까워지는 시기, 멀어지는 시기, 재회 가능 시기",
  "왜 만나게 되었는가에 대한 인연 흐름 분석",
  "서로에게 배우는 것과 관계의 숙제",
  "프리미엄 한 줄 리딩",
  "프리미엄 궁합 아트 컬렉션 제공",
];

const relationshipMeta: Record<
  RelationshipType,
  {
    title: string;
    price: string;
    intro: string;
    summary: string;
  }
> = {
  love: {
    title: "단일 궁합 리포트",
    price: "₩9,900",
    intro: "가장 궁금한 관계 질문 하나를 깊이 있게 읽는 리포트",
    summary: "감정의 흐름, 끌림의 이유, 오래 가는지 아닌지를 중심으로 해석합니다.",
  },
  marriage: {
    title: "단일 궁합 리포트",
    price: "₩9,900",
    intro: "가장 궁금한 관계 질문 하나를 깊이 있게 읽는 리포트",
    summary: "함께 살아가는 호흡과 현실적 안정성을 중심으로 해석합니다.",
  },
  reunion: {
    title: "단일 궁합 리포트",
    price: "₩9,900",
    intro: "가장 궁금한 관계 질문 하나를 깊이 있게 읽는 리포트",
    summary: "멀어진 흐름이 다시 이어질 수 있는지, 타이밍과 계기를 중심으로 해석합니다.",
  },
  situationship: {
    title: "단일 궁합 리포트",
    price: "₩9,900",
    intro: "가장 궁금한 관계 질문 하나를 깊이 있게 읽는 리포트",
    summary: "이름 붙기 전의 미묘한 흐름과 감정의 방향을 중심으로 해석합니다.",
  },
  spouse: {
    title: "단일 궁합 리포트",
    price: "₩9,900",
    intro: "가장 궁금한 관계 질문 하나를 깊이 있게 읽는 리포트",
    summary: "가까운 거리에서 반복되는 패턴과 안정성을 중심으로 해석합니다.",
  },
  business: {
    title: "단일 궁합 리포트",
    price: "₩9,900",
    intro: "가장 궁금한 관계 질문 하나를 깊이 있게 읽는 리포트",
    summary: "돈의 흐름과 역할 분담, 충돌 포인트를 중심으로 해석합니다.",
  },
  human: {
    title: "단일 궁합 리포트",
    price: "₩9,900",
    intro: "가장 궁금한 관계 질문 하나를 깊이 있게 읽는 리포트",
    summary: "관계가 편안한 이유와 긴장되는 지점을 중심으로 해석합니다.",
  },
  family: {
    title: "단일 궁합 리포트",
    price: "₩9,900",
    intro: "가장 궁금한 관계 질문 하나를 깊이 있게 읽는 리포트",
    summary: "가족 관계에 오래 남아 있는 정서 패턴을 중심으로 해석합니다.",
  },
  premium: {
    title: "프리미엄 궁합 리포트",
    price: "₩19,000",
    intro: "두 사람의 흐름 전체를 깊이 분석하는 프리미엄 관계 리포트",
    summary: "왜 만나게 되었는가부터 장기 관계의 의미까지 전체 흐름을 묶어 읽습니다.",
  },
};

const defaultA: PersonFormState = {
  name: "A",
  gender: "female",
  birthDate: "1992-10-24",
  birthTime: "05:30",
  calendarType: "solar",
  isLeapMonth: false,
};

const defaultB: PersonFormState = {
  name: "B",
  gender: "male",
  birthDate: "1990-01-01",
  birthTime: "12:00",
  calendarType: "solar",
  isLeapMonth: false,
};

export default function GalleryTwo() {
  const [personA, setPersonA] = useState<PersonFormState>(defaultA);
  const [personB, setPersonB] = useState<PersonFormState>(defaultB);
  const [selectedCompatibility, setSelectedCompatibility] = useState<CompatibilityType>("love");
  const [relationshipType, setRelationshipType] = useState<RelationshipType>("love");

  const sajuA = useMemo<SajuResult>(
    () =>
      calculateSaju({
        birthDate: personA.birthDate,
        birthTime: personA.birthTime,
        calendarType: personA.calendarType,
        gender: personA.gender,
        isLeapMonth: personA.isLeapMonth,
      }),
    [personA],
  );

  const sajuB = useMemo<SajuResult>(
    () =>
      calculateSaju({
        birthDate: personB.birthDate,
        birthTime: personB.birthTime,
        calendarType: personB.calendarType,
        gender: personB.gender,
        isLeapMonth: personB.isLeapMonth,
      }),
    [personB],
  );

  const selectedOption =
    compatibilityOptions.find((option) => option.id === selectedCompatibility) ?? compatibilityOptions[0];
  const currentMeta = relationshipMeta[relationshipType];

  const pairedArt = sajuA.dayMaster === sajuB.dayMaster ? "/assets/rel_water_wood.png" : "/assets/rel_clash.png";
  const relationshipLine =
    relationshipType === "premium"
      ? "이 관계는 사랑보다 이해를 먼저 배우게 하는 인연입니다."
      : selectedOption.reading;

  const updatePerson =
    (person: "a" | "b") =>
    <K extends keyof PersonFormState>(key: K, value: PersonFormState[K]) => {
      const updater = person === "a" ? setPersonA : setPersonB;
      updater((current) => ({ ...current, [key]: value }));
    };

  const selectSingleCompatibility = (id: CompatibilityType) => {
    setSelectedCompatibility(id);
    setRelationshipType(id);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 pb-40 pt-40 sm:px-8 lg:px-12">
      <div className="space-y-28">
        <section className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="space-y-5">
              <p className="font-sans text-[11px] uppercase tracking-[0.46em] text-[rgba(62,54,42,0.52)]">
                Exhibit No. 02
              </p>
              <h1 className="text-5xl leading-[1.18] tracking-[0.08em] text-[var(--color-ink-soft)] md:text-7xl">
                두 사람의 흐름을 보다
              </h1>
              <p className="max-w-xl text-[16px] leading-8 text-[rgba(62,54,42,0.72)]">
                잘 맞는지 점수로 재는 대신, 왜 만나게 되었는지와 왜 힘든지까지 읽어내는 관계 해석형 제2전시실입니다.
              </p>
            </div>

            <div className="space-y-6 border-l border-[rgba(197,160,89,0.22)] pl-6">
              <p className="text-xl italic leading-9 text-[rgba(62,54,42,0.88)]">
                “인연은 우연이 아니라 흐름입니다.”
              </p>
              <p className="max-w-lg text-[15px] leading-8 text-[rgba(62,54,42,0.68)]">
                이 전시실은 “잘 맞나요?”보다 “우리는 왜 이렇게 힘들까요?”라는 질문에 더 깊게 답하도록 설계했습니다.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="gallery-card relative overflow-hidden rounded-[2.2rem] p-5 shadow-[0_30px_70px_rgba(66,52,26,0.08)]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem]">
              <Image
                src={pairedArt}
                alt="두 사람의 관계 흐름을 상징하는 수묵화"
                fill
                className="object-cover grayscale-[0.14]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,245,240,0.02),rgba(248,245,240,0.62))]" />
              <div className="absolute inset-5 rounded-[1.5rem] border border-white/40" />
              <div className="absolute bottom-8 left-8 max-w-sm space-y-3">
                <p className="font-sans text-[10px] uppercase tracking-[0.36em] text-[rgba(255,248,236,0.72)]">
                  Relationship Preview
                </p>
                <p className="text-2xl leading-9 text-white/90">우리는 왜 만나게 되었을까</p>
                <p className="text-sm leading-7 text-white/72">
                  서로 다른 두 흐름이 만나는 이유와, 가까워질수록 드러나는 관계의 결을 함께 읽습니다.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <motion.button
            type="button"
            onClick={() => selectSingleCompatibility(selectedCompatibility)}
            whileHover={{ y: -4 }}
            className={`gallery-card rounded-[2rem] border p-8 text-left transition-all duration-300 ${
              relationshipType !== "premium"
                ? "border-[rgba(197,160,89,0.58)] shadow-[0_24px_50px_rgba(89,71,36,0.08)]"
                : "border-[rgba(197,160,89,0.16)]"
            }`}
          >
            <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[rgba(62,54,42,0.54)]">
              가볍게 궁금하다면
            </p>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div className="space-y-3">
                <h2 className="text-3xl leading-tight text-[var(--color-ink-soft)]">단일 궁합 리포트</h2>
                <p className="max-w-md text-[15px] leading-8 text-[rgba(62,54,42,0.68)]">
                  가장 궁금한 관계 질문 하나를 골라, 그 관계가 왜 흔들리고 왜 끌리는지 선명하게 읽습니다.
                </p>
              </div>
              <p className="font-sans text-xl tracking-[0.08em] text-[rgba(128,97,36,0.92)]">₩9,900</p>
            </div>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => setRelationshipType("premium")}
            whileHover={{ y: -4 }}
            className={`gallery-card relative rounded-[2rem] border p-8 text-left transition-all duration-300 ${
              relationshipType === "premium"
                ? "border-[rgba(197,160,89,0.72)] shadow-[0_26px_56px_rgba(89,71,36,0.1)]"
                : "border-[rgba(197,160,89,0.16)]"
            }`}
          >
            <div className="absolute right-8 top-8 rounded-full border border-[rgba(197,160,89,0.3)] bg-[rgba(197,160,89,0.08)] px-4 py-2">
              <span className="font-sans text-[10px] uppercase tracking-[0.34em] text-[rgba(128,97,36,0.92)]">Best</span>
            </div>
            <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[rgba(62,54,42,0.54)]">
              우리의 흐름을 깊이 알고 싶다면
            </p>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div className="space-y-3">
                <h2 className="text-3xl leading-tight text-[var(--color-ink-soft)]">프리미엄 궁합 리포트</h2>
                <p className="max-w-md text-[15px] leading-8 text-[rgba(62,54,42,0.68)]">
                  두 사람의 장기 흐름, 가까워지는 시기, 멀어지는 시기, 이 인연의 의미까지 전체 맥락을 담습니다.
                </p>
              </div>
              <p className="font-sans text-xl tracking-[0.08em] text-[rgba(128,97,36,0.92)]">₩19,000</p>
            </div>
          </motion.button>
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="gallery-card rounded-[2rem] p-8">
            <div className="space-y-4">
              <p className="font-sans text-[11px] uppercase tracking-[0.38em] text-[rgba(62,54,42,0.52)]">
                두 사람 입력
              </p>
              <h3 className="text-3xl leading-tight text-[var(--color-ink-soft)]">
                만세력은 각자 계산한 뒤, 관계 흐름으로 이어집니다
              </h3>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <PersonCard title="A 사람" person={personA} setValue={updatePerson("a")} />
              <PersonCard title="B 사람" person={personB} setValue={updatePerson("b")} />
            </div>
          </div>

          <div className="gallery-card rounded-[2rem] p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-2">
                <p className="font-sans text-[11px] uppercase tracking-[0.38em] text-[rgba(62,54,42,0.52)]">
                  현재 선택
                </p>
                <h3 className="text-3xl leading-tight text-[var(--color-ink-soft)]">{currentMeta.title}</h3>
                <p className="text-[15px] leading-8 text-[rgba(62,54,42,0.66)]">{currentMeta.intro}</p>
              </div>
              <div className="text-right">
                <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[rgba(62,54,42,0.46)]">
                  저장값
                </p>
                <p className="mt-2 font-sans text-lg tracking-[0.08em] text-[rgba(128,97,36,0.94)]">
                  relationshipType: {relationshipType}
                </p>
                {relationshipType !== "premium" ? (
                  <p className="mt-1 font-sans text-sm tracking-[0.08em] text-[rgba(62,54,42,0.58)]">
                    selectedCompatibility: {selectedCompatibility}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-[rgba(197,160,89,0.16)] bg-white/60 p-6">
              <p className="text-lg leading-8 text-[rgba(62,54,42,0.82)]">{currentMeta.summary}</p>
              {relationshipType !== "premium" ? (
                <div className="mt-5 space-y-3">
                  <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-[rgba(62,54,42,0.5)]">
                    선택 해석 포인트
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedOption.focus.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[rgba(197,160,89,0.18)] bg-[rgba(248,245,240,0.9)] px-4 py-2 text-sm text-[rgba(62,54,42,0.72)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <Link
              href={`/result?kind=gallery2&relationshipType=${relationshipType}&selectedCompatibility=${selectedCompatibility}&birthDate=${personA.birthDate}&birthTime=${personA.birthTime}&calendarType=${personA.calendarType}&gender=${personA.gender}`}
              className="hero-cta mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full px-7 py-4"
            >
              <span className="font-sans text-[11px] uppercase tracking-[0.38em]">
                {relationshipType === "premium"
                  ? "프리미엄 궁합 결과 미리보기"
                  : `${selectedOption.label} 결과 미리보기`}
              </span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="gallery-card rounded-[2rem] p-8">
            <div className="space-y-4">
              <p className="font-sans text-[11px] uppercase tracking-[0.38em] text-[rgba(62,54,42,0.52)]">
                궁합 유형 선택
              </p>
              <h3 className="text-3xl leading-tight text-[var(--color-ink-soft)]">
                지금 이 관계에서 가장 궁금한 질문 하나를 고르세요
              </h3>
            </div>

            <div className="mt-8 grid gap-3">
              {compatibilityOptions.map((option) => {
                const active = selectedCompatibility === option.id && relationshipType !== "premium";

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => selectSingleCompatibility(option.id)}
                    className={`rounded-[1.4rem] border px-5 py-5 text-left transition-all ${
                      active
                        ? "border-[rgba(197,160,89,0.64)] bg-[rgba(255,251,244,0.92)] shadow-[0_18px_34px_rgba(89,71,36,0.06)]"
                        : "border-[rgba(197,160,89,0.14)] bg-white/55"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-xl text-[var(--color-ink-soft)]">{option.label}</p>
                        <p className="text-sm text-[rgba(62,54,42,0.58)]">{option.subtitle}</p>
                      </div>
                      {active ? <Check className="h-5 w-5 text-[rgba(128,97,36,0.92)]" /> : null}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="gallery-card rounded-[2rem] p-8">
            <div className="flex items-center gap-3">
              <HeartHandshake className="h-4 w-4 text-[rgba(128,97,36,0.84)]" />
              <p className="font-sans text-[11px] uppercase tracking-[0.38em] text-[rgba(62,54,42,0.52)]">
                관계의 한 줄 해석
              </p>
            </div>
            <p className="mt-6 text-3xl leading-[1.7] text-[rgba(62,54,42,0.9)]">
              “{relationshipLine}”
            </p>
            <p className="mt-6 text-[15px] leading-8 text-[rgba(62,54,42,0.68)]">
              감정 몰입이 먼저 생겨야 결제가 일어나는 구조를 반영해, 점수 대신 관계의 결을 먼저 읽히도록 구성했습니다.
            </p>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="gallery-card rounded-[2rem] p-8">
            <div className="space-y-4">
              <p className="font-sans text-[11px] uppercase tracking-[0.38em] text-[rgba(62,54,42,0.52)]">
                두 사람의 기본 사주 요약
              </p>
              <h3 className="text-3xl leading-tight text-[var(--color-ink-soft)]">
                복잡하지 않게, 관계를 읽는 데 필요한 만큼만
              </h3>
            </div>

            <div className="mt-8 grid gap-6">
              <SajuSummaryCard title={personA.name || "A"} result={sajuA} />
              <SajuSummaryCard title={personB.name || "B"} result={sajuB} />
            </div>
          </div>

          <div className="grid gap-8">
            <div className="gallery-card rounded-[2rem] p-8">
              <div className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-[rgba(128,97,36,0.84)]" />
                <p className="font-sans text-[11px] uppercase tracking-[0.38em] text-[rgba(62,54,42,0.52)]">
                  포함 내용 비교
                </p>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-[rgba(197,160,89,0.16)] bg-white/60 p-6">
                  <p className="text-xl text-[var(--color-ink-soft)]">단일 궁합 리포트</p>
                  <p className="mt-2 font-sans text-sm tracking-[0.06em] text-[rgba(128,97,36,0.92)]">₩9,900</p>
                  <div className="mt-5 space-y-3">
                    {singleCompatibilitySections.map((item) => (
                      <div key={item} className="flex gap-3 text-sm leading-7 text-[rgba(62,54,42,0.72)]">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-[rgba(128,97,36,0.9)]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-[rgba(197,160,89,0.28)] bg-[rgba(255,251,244,0.9)] p-6">
                  <p className="text-xl text-[var(--color-ink-soft)]">프리미엄 궁합 리포트</p>
                  <p className="mt-2 font-sans text-sm tracking-[0.06em] text-[rgba(128,97,36,0.92)]">₩19,000</p>
                  <div className="mt-5 space-y-3">
                    {premiumCompatibilitySections.map((item) => (
                      <div key={item} className="flex gap-3 text-sm leading-7 text-[rgba(62,54,42,0.72)]">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-[rgba(128,97,36,0.9)]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              <div className="gallery-card rounded-[2rem] p-8">
                <p className="font-sans text-[11px] uppercase tracking-[0.38em] text-[rgba(62,54,42,0.52)]">
                  궁합 핵심 분석
                </p>
                <div className="mt-5 space-y-4 text-[15px] leading-8 text-[rgba(62,54,42,0.72)]">
                  <p>잘 맞는 부분: 한 사람은 안정, 한 사람은 확신을 원해 서로의 빈 곳을 채웁니다.</p>
                  <p>충돌하는 부분: 감정 표현의 속도 차이가 커질수록 오해가 반복됩니다.</p>
                  <p>끌리는 이유: 서로에게 없는 기질을 발견할 때 이 관계는 더 강하게 당겨집니다.</p>
                  <p>갈등 패턴: 문제의 내용보다 타이밍이 어긋날 때 더 크게 흔들립니다.</p>
                </div>
              </div>

              <div className="gallery-card rounded-[2rem] p-8">
                <p className="font-sans text-[11px] uppercase tracking-[0.38em] text-[rgba(62,54,42,0.52)]">
                  궁합 수묵화 아트
                </p>
                <div className="mt-5 rounded-[1.5rem] overflow-hidden border border-[rgba(197,160,89,0.14)]">
                  <div className="relative aspect-[5/4]">
                    <Image
                      src={pairedArt}
                      alt="관계 흐름에 맞는 감성 수묵화"
                      fill
                      className="object-cover grayscale-[0.1]"
                    />
                  </div>
                </div>
                <button className="mt-6 inline-flex items-center gap-3 rounded-full border border-[rgba(197,160,89,0.26)] px-5 py-3 text-[rgba(128,97,36,0.92)] transition hover:bg-[rgba(197,160,89,0.06)]">
                  <Download className="h-4 w-4" />
                  <span className="font-sans text-[11px] uppercase tracking-[0.32em]">궁합 수묵화 다운로드</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function PersonCard({
  title,
  person,
  setValue,
}: {
  title: string;
  person: PersonFormState;
  setValue: <K extends keyof PersonFormState>(key: K, value: PersonFormState[K]) => void;
}) {
  return (
    <div className="rounded-[1.6rem] border border-[rgba(197,160,89,0.14)] bg-white/60 p-5">
      <p className="text-xl text-[var(--color-ink-soft)]">{title}</p>
      <div className="mt-5 grid gap-4">
        <label className="space-y-2">
          <span className="font-sans text-[10px] uppercase tracking-[0.26em] text-[rgba(62,54,42,0.52)]">이름 또는 닉네임</span>
          <input
            type="text"
            value={person.name}
            onChange={(event) => setValue("name", event.target.value)}
            className="w-full rounded-2xl border border-[rgba(197,160,89,0.18)] bg-[rgba(248,245,240,0.88)] px-4 py-3 outline-none transition focus:border-[rgba(197,160,89,0.72)]"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="font-sans text-[10px] uppercase tracking-[0.26em] text-[rgba(62,54,42,0.52)]">성별</span>
            <select
              value={person.gender}
              onChange={(event) => setValue("gender", event.target.value as Gender)}
              className="w-full rounded-2xl border border-[rgba(197,160,89,0.18)] bg-[rgba(248,245,240,0.88)] px-4 py-3 outline-none transition focus:border-[rgba(197,160,89,0.72)]"
            >
              <option value="female">여성</option>
              <option value="male">남성</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="font-sans text-[10px] uppercase tracking-[0.26em] text-[rgba(62,54,42,0.52)]">양력 / 음력</span>
            <select
              value={person.calendarType}
              onChange={(event) => setValue("calendarType", event.target.value as CalendarType)}
              className="w-full rounded-2xl border border-[rgba(197,160,89,0.18)] bg-[rgba(248,245,240,0.88)] px-4 py-3 outline-none transition focus:border-[rgba(197,160,89,0.72)]"
            >
              <option value="solar">양력</option>
              <option value="lunar">음력</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="font-sans text-[10px] uppercase tracking-[0.26em] text-[rgba(62,54,42,0.52)]">생년월일</span>
            <input
              type="date"
              value={person.birthDate}
              onChange={(event) => setValue("birthDate", event.target.value)}
              className="w-full rounded-2xl border border-[rgba(197,160,89,0.18)] bg-[rgba(248,245,240,0.88)] px-4 py-3 outline-none transition focus:border-[rgba(197,160,89,0.72)]"
            />
          </label>

          <label className="space-y-2">
            <span className="font-sans text-[10px] uppercase tracking-[0.26em] text-[rgba(62,54,42,0.52)]">출생시간</span>
            <input
              type="time"
              value={person.birthTime}
              onChange={(event) => setValue("birthTime", event.target.value)}
              className="w-full rounded-2xl border border-[rgba(197,160,89,0.18)] bg-[rgba(248,245,240,0.88)] px-4 py-3 outline-none transition focus:border-[rgba(197,160,89,0.72)]"
            />
          </label>
        </div>

        {person.calendarType === "lunar" ? (
          <label className="flex items-center gap-3 rounded-2xl border border-[rgba(197,160,89,0.12)] bg-[rgba(248,245,240,0.75)] px-4 py-3 text-sm text-[rgba(62,54,42,0.68)]">
            <input
              type="checkbox"
              checked={person.isLeapMonth}
              onChange={(event) => setValue("isLeapMonth", event.target.checked)}
              className="h-4 w-4 accent-[rgba(128,97,36,0.92)]"
            />
            윤달인 경우 체크
          </label>
        ) : null}
      </div>
    </div>
  );
}

function SajuSummaryCard({ title, result }: { title: string; result: SajuResult }) {
  return (
    <div className="rounded-[1.5rem] border border-[rgba(197,160,89,0.14)] bg-white/60 p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xl text-[var(--color-ink-soft)]">{title}</p>
        <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-[rgba(62,54,42,0.48)]">
          일간 {result.dayMaster}
        </p>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {result.pillarsForDisplay.map((pillar) => (
          <div key={`${title}-${pillar.label}`} className="rounded-[1.2rem] bg-[rgba(248,245,240,0.9)] px-4 py-4">
            <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-[rgba(62,54,42,0.48)]">{pillar.label}주</p>
            <p className="mt-2 text-2xl text-[var(--color-ink-soft)]">{pillar.hanja}</p>
            <p className="mt-1 text-sm tracking-[0.2em] text-[rgba(62,54,42,0.66)]">{pillar.hangeul}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm leading-7 text-[rgba(62,54,42,0.72)]">
        강한 기운: {result.strongElements.join(", ")} / 부족한 기운: {result.weakElements.join(", ")}
      </p>
    </div>
  );
}
