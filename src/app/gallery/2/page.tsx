"use client";

import { calculateSaju, type CalendarType, type Gender, type SajuResult } from "@/lib/saju";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
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

const premiumCompatibilitySections = [
  "단일 궁합 리포트의 모든 내용 포함",
  "전체 관계 흐름 분석",
  "시기 운 (가까워지는 시기, 멀어지는 시기)",
  "재회 가능 시기와 관계 전환 포인트",
  "Karmic relationship (인연의 숙제) 해석",
  "프리미엄 수묵화 아트 컬렉션",
];

const defaultA: PersonFormState = {
  name: "",
  gender: "female",
  birthDate: "1992-10-24",
  birthTime: "05:30",
  calendarType: "solar",
  isLeapMonth: false,
};

const defaultB: PersonFormState = {
  name: "",
  gender: "male",
  birthDate: "1990-01-01",
  birthTime: "12:00",
  calendarType: "solar",
  isLeapMonth: false,
};

export default function GalleryTwo() {
  const [view, setView] = useState<"main" | "single-select" | "input" | "premium-summary">("main");
  const [personA, setPersonA] = useState<PersonFormState>(defaultA);
  const [personB, setPersonB] = useState<PersonFormState>(defaultB);
  const [selectedCompatibility, setSelectedCompatibility] = useState<CompatibilityType>("love");
  const [relationshipType, setRelationshipType] = useState<RelationshipType>("love");

  const updatePerson =
    (person: "a" | "b") =>
    <K extends keyof PersonFormState>(key: K, value: PersonFormState[K]) => {
      const updater = person === "a" ? setPersonA : setPersonB;
      updater((current) => ({ ...current, [key]: value }));
    };

  const handleStartSingle = () => {
    setRelationshipType("love"); // Default start
    setView("single-select");
  };

  const handleStartPremium = () => {
    setRelationshipType("premium");
    setView("premium-summary");
  };

  const handleSelectType = (id: CompatibilityType) => {
    setSelectedCompatibility(id);
    setRelationshipType(id);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--color-hanji)]">
      {/* Background Layer */}
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-paper absolute inset-0" />
        <div className="hero-landscape-overlay absolute inset-0">
          <Image
            src="/image/main3.png"
            alt="제 2 전시실 통배경"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-40 pt-52 sm:px-8 lg:px-12">
        <div className="space-y-20">
          {/* Step 1: Main */}
          {view === "main" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-24">
              <section className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center">
                <div className="space-y-10">
                  <div className="space-y-5">
                    <p className="font-sans text-[11px] uppercase tracking-[0.46em] text-[rgba(62,54,42,0.52)]">
                      Exhibit No. 02
                    </p>
                    <h1 className="text-5xl leading-[1.18] tracking-[0.08em] text-[var(--color-ink-soft)] md:text-7xl">
                      우리의 흐름을 보다
                    </h1>
                    <p className="max-w-xl text-[16px] leading-8 text-[rgba(62,54,42,0.72)]">
                      제2전시실은 두 사람의 사주가 만나 만드는 제3의 에너지를 읽어내는 공간입니다.
                      단순한 점수가 아닌, 왜 만나게 되었고 어디로 흘러가는지를 한 편의 작품처럼 담아냅니다.
                    </p>
                  </div>
                </div>

                <div className="gallery-card relative overflow-hidden rounded-[2.2rem] p-5 shadow-[0_30px_70px_rgba(66,52,26,0.08)]">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-[1.8rem] sm:aspect-[21/9]">
                    <Image
                      src="/assets/rel_water_wood.png"
                      alt="우리의 수묵 조화"
                      fill
                      className="object-cover grayscale-[0.2] opacity-80"
                    />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(248,245,240,0.8)] to-transparent" />
                  <div className="absolute bottom-6 left-8">
                    <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[rgba(62,54,42,0.5)]">Entrance</p>
                    <p className="mt-1 text-xl tracking-[0.1em] text-[var(--color-ink-soft)]">전시관 입장</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-8 lg:grid-cols-2">
              <motion.div
                whileHover={{ y: -8 }}
                className="gallery-card flex flex-col justify-between rounded-[2.2rem] border border-[rgba(197,160,89,0.18)] p-10 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(89,71,36,0.12)]"
              >
                <div className="space-y-6">
                  <p className="font-sans text-[11px] uppercase tracking-[0.45em] text-[rgba(128,97,36,0.6)]">Single Compatibility</p>
                  <h2 className="text-4xl tracking-[0.05em] text-[var(--color-ink-soft)]">단일 궁합 리포트</h2>
                  <p className="max-w-sm text-[16px] leading-8 text-[rgba(62,54,42,0.65)]">
                    연애, 재회, 결혼 등 지금 가장 궁금한 한 가지 주제에 대해 두 사람의 기운이 섞이는 방식을 분석합니다.
                  </p>
                  <p className="font-sans text-2xl tracking-[0.1em] text-[var(--color-gold)]">₩9,900</p>
                </div>
                <button
                  type="button"
                  onClick={handleStartSingle}
                  className="hero-cta mt-12 flex w-full items-center justify-center gap-4 rounded-full py-5 transition-all"
                >
                  <span className="font-sans text-[12px] uppercase tracking-[0.4em]">관계 읽기 시작</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>

              <motion.div
                whileHover={{ y: -8 }}
                className="gallery-card relative flex flex-col justify-between rounded-[2.2rem] border border-[rgba(197,160,89,0.3)] bg-[rgba(255,251,244,0.4)] p-10 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(89,71,36,0.14)]"
              >
                <div className="absolute right-10 top-10 rounded-full border border-[rgba(197,160,89,0.4)] bg-[rgba(197,160,89,0.1)] px-4 py-1.5">
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">Signature</span>
                </div>
                <div className="space-y-6">
                  <p className="font-sans text-[11px] uppercase tracking-[0.45em] text-[rgba(128,97,36,0.6)]">Premium Compatibility</p>
                  <h2 className="text-4xl tracking-[0.05em] text-[var(--color-ink-soft)]">프리미엄 궁합 리포트</h2>
                  <p className="max-w-sm text-[16px] leading-8 text-[rgba(62,54,42,0.65)]">
                    두 사람의 과거와 현재, 그리고 미래의 갈림길까지 포함된 시기별 관계 흐름을 종합 큐레이션합니다.
                  </p>
                  <p className="font-sans text-2xl tracking-[0.1em] text-[var(--color-gold)]">₩19,000</p>
                </div>
                <button
                  type="button"
                  onClick={handleStartPremium}
                  className="hero-cta mt-12 flex w-full items-center justify-center gap-4 rounded-full py-5 transition-all"
                >
                  <span className="font-sans text-[12px] uppercase tracking-[0.4em]">우리의 흐름 깊이 보기</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            </section>
          </motion.div>
        )}

        {/* Step 2: Single Type Selection */}
        {view === "single-select" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-16">
            <div className="flex flex-col items-center justify-between gap-6 border-b border-[rgba(197,160,89,0.15)] pb-10 sm:flex-row">
              <div className="space-y-3">
                <button 
                  onClick={() => setView("main")}
                  className="font-sans text-[10px] uppercase tracking-[0.3em] text-[rgba(62,54,42,0.5)] hover:text-[var(--color-gold)] transition-colors"
                >
                  ← 돌아가기
                </button>
                <h2 className="text-4xl tracking-[0.05em] text-[var(--color-ink-soft)]">궁합 유형 선택</h2>
              </div>
              <p className="font-sans text-xl tracking-[0.1em] text-[var(--color-gold)]">단일 리포트 · ₩9,900</p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {compatibilityOptions.map((option) => {
                const active = selectedCompatibility === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectType(option.id)}
                    className={`group relative overflow-hidden rounded-[1.8rem] border p-7 text-left transition-all duration-300 ${
                      active
                        ? "border-[rgba(197,160,89,0.6)] bg-[rgba(255,251,244,0.8)] shadow-[0_20px_40px_rgba(89,71,36,0.06)]"
                        : "border-[rgba(197,160,89,0.15)] bg-white/40 hover:border-[rgba(197,160,89,0.3)]"
                    }`}
                  >
                    <div className="space-y-2">
                      <h3 className="text-xl text-[var(--color-ink-soft)]">{option.label}</h3>
                      <p className="text-[13px] leading-relaxed text-[rgba(62,54,42,0.6)]">{option.subtitle}</p>
                    </div>
                    {active && <div className="absolute bottom-4 right-4 h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-center pt-8">
              <button
                onClick={() => setView("input")}
                className="hero-cta flex items-center gap-4 rounded-full px-16 py-5 transition-all"
              >
                <span className="font-sans text-[12px] uppercase tracking-[0.4em]">다음 단계</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Input Form */}
        {view === "input" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-16">
            <div className="flex flex-col items-center justify-between gap-6 border-b border-[rgba(197,160,89,0.15)] pb-10 sm:flex-row">
              <div className="space-y-3">
                <button 
                  onClick={() => setView(relationshipType === "premium" ? "premium-summary" : "single-select")}
                  className="font-sans text-[10px] uppercase tracking-[0.3em] text-[rgba(62,54,42,0.5)] hover:text-[var(--color-gold)] transition-colors"
                >
                  ← 돌아가기
                </button>
                <h2 className="text-4xl tracking-[0.05em] text-[var(--color-ink-soft)]">두 사람 정보 입력</h2>
              </div>
              <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[rgba(62,54,42,0.5)] italic">Private Consultation Room</p>
            </div>

            <div className="grid gap-10 lg:grid-cols-2">
              <PersonCard title="A 사람" person={personA} setValue={updatePerson("a")} />
              <PersonCard title="B 사람" person={personB} setValue={updatePerson("b")} />
            </div>

            <div className="flex flex-col items-center gap-6 pt-10">
              <Link
                href={`/result?kind=gallery2&relationshipType=${relationshipType}&selectedCompatibility=${selectedCompatibility}&birthDateA=${personA.birthDate}&birthTimeA=${personA.birthTime}&birthDateB=${personB.birthDate}&birthTimeB=${personB.birthTime}`}
                className="hero-cta flex w-full max-w-md items-center justify-center gap-4 rounded-full py-6 shadow-[0_20px_40px_rgba(197,160,89,0.15)]"
              >
                <span className="font-sans text-[13px] uppercase tracking-[0.5em]">관계 흐름 미리보기</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <p className="text-[13px] text-[rgba(62,54,42,0.4)]">입력하신 정보는 오직 사주 분석을 위해서만 사용됩니다.</p>
            </div>
          </motion.div>
        )}

        {/* Step 4: Premium Summary */}
        {view === "premium-summary" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-16">
            <div className="flex flex-col items-center justify-between gap-6 border-b border-[rgba(197,160,89,0.15)] pb-10 sm:flex-row">
              <div className="space-y-3">
                <button 
                  onClick={() => setView("main")}
                  className="font-sans text-[10px] uppercase tracking-[0.3em] text-[rgba(62,54,42,0.5)] hover:text-[var(--color-gold)] transition-colors"
                >
                  ← 돌아가기
                </button>
                <h2 className="text-4xl tracking-[0.05em] text-[var(--color-ink-soft)]">프리미엄 리포트 구성</h2>
              </div>
              <p className="font-sans text-xl tracking-[0.1em] text-[var(--color-gold)]">₩19,000</p>
            </div>

            <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
              <div className="gallery-card rounded-[2.2rem] p-10">
                <div className="grid gap-10 sm:grid-cols-2">
                  <div className="space-y-6">
                    <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[rgba(128,97,36,0.7)]">Deep Analysis</p>
                    <div className="space-y-4">
                      {premiumCompatibilitySections.slice(0, 3).map((item) => (
                        <div key={item} className="flex gap-4 text-[15px] leading-7 text-[rgba(62,54,42,0.75)]">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--color-gold)]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6 sm:mt-11">
                    <div className="space-y-4">
                      {premiumCompatibilitySections.slice(3).map((item) => (
                        <div key={item} className="flex gap-4 text-[15px] leading-7 text-[rgba(62,54,42,0.75)]">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--color-gold)]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="gallery-card rounded-[2.2rem] p-8 text-center border-dashed border-[rgba(197,160,89,0.3)]">
                  <p className="text-[16px] leading-8 text-[rgba(62,54,42,0.7)]">
                    "우리가 왜 만났는지,<br />어디로 가야 하는지 조용히 들려드립니다."
                  </p>
                </div>

                <button
                  onClick={() => setView("input")}
                  className="hero-cta flex w-full items-center justify-center gap-4 rounded-full py-6 shadow-[0_20px_40px_rgba(197,160,89,0.15)]"
                >
                  <span className="font-sans text-[13px] uppercase tracking-[0.5em]">프리미엄 결과 미리보기</span>
                  <ArrowRight className="h-5 w-5" />
                </button>

                <p className="text-center font-sans text-[10px] uppercase tracking-[0.3em] text-[rgba(62,54,42,0.4)]">
                  Deeply curated for your shared fate
                </p>
              </div>
            </div>
          </motion.div>
        )}
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
    <div className="rounded-[1.6rem] border border-[rgba(197,160,89,0.14)] bg-white/60 p-8 shadow-[0_20px_50px_rgba(89,71,36,0.04)]">
      <p className="text-2xl text-[var(--color-ink-soft)]">{title}</p>
      <div className="mt-8 grid gap-6">
        <label className="space-y-2.5">
          <span className="font-sans text-[11px] uppercase tracking-[0.26em] text-[rgba(62,54,42,0.5)]">이름 또는 닉네임</span>
          <input
            type="text"
            placeholder="이름을 입력하세요"
            value={person.name}
            onChange={(event) => setValue("name", event.target.value)}
            className="w-full rounded-2xl border border-[rgba(197,160,89,0.12)] bg-[rgba(248,245,240,0.6)] px-5 py-4 outline-none transition focus:border-[rgba(197,160,89,0.5)] focus:bg-white"
          />
        </label>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="space-y-2.5">
            <span className="font-sans text-[11px] uppercase tracking-[0.26em] text-[rgba(62,54,42,0.5)]">성별</span>
            <select
              value={person.gender}
              onChange={(event) => setValue("gender", event.target.value as Gender)}
              className="w-full rounded-2xl border border-[rgba(197,160,89,0.12)] bg-[rgba(248,245,240,0.6)] px-5 py-4 outline-none transition focus:border-[rgba(197,160,89,0.5)] focus:bg-white"
            >
              <option value="female">여성</option>
              <option value="male">남성</option>
            </select>
          </label>

          <label className="space-y-2.5">
            <span className="font-sans text-[11px] uppercase tracking-[0.26em] text-[rgba(62,54,42,0.5)]">양력 / 음력</span>
            <select
              value={person.calendarType}
              onChange={(event) => setValue("calendarType", event.target.value as CalendarType)}
              className="w-full rounded-2xl border border-[rgba(197,160,89,0.12)] bg-[rgba(248,245,240,0.6)] px-5 py-4 outline-none transition focus:border-[rgba(197,160,89,0.5)] focus:bg-white"
            >
              <option value="solar">양력</option>
              <option value="lunar">음력</option>
            </select>
          </label>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="space-y-2.5">
            <span className="font-sans text-[11px] uppercase tracking-[0.26em] text-[rgba(62,54,42,0.5)]">생년월일</span>
            <input
              type="date"
              value={person.birthDate}
              onChange={(event) => setValue("birthDate", event.target.value)}
              className="w-full rounded-2xl border border-[rgba(197,160,89,0.12)] bg-[rgba(248,245,240,0.6)] px-5 py-4 outline-none transition focus:border-[rgba(197,160,89,0.5)] focus:bg-white"
            />
          </label>

          <label className="space-y-2.5">
            <span className="font-sans text-[11px] uppercase tracking-[0.26em] text-[rgba(62,54,42,0.5)]">출생시간</span>
            <input
              type="time"
              value={person.birthTime}
              onChange={(event) => setValue("birthTime", event.target.value)}
              className="w-full rounded-2xl border border-[rgba(197,160,89,0.12)] bg-[rgba(248,245,240,0.6)] px-5 py-4 outline-none transition focus:border-[rgba(197,160,89,0.5)] focus:bg-white"
            />
          </label>
        </div>

        {person.calendarType === "lunar" ? (
          <label className="flex items-center gap-3 rounded-2xl border border-[rgba(197,160,89,0.12)] bg-[rgba(248,245,240,0.4)] px-5 py-4 text-sm text-[rgba(62,54,42,0.6)]">
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
