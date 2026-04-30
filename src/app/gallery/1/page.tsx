"use client";

import { calculateSaju, getElementDetails, type FiveElements } from "@/lib/saju";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type SingleFortune = "wealth" | "love" | "career" | "supporter" | "health";
type ReportType = SingleFortune | "total";

interface FortuneOption {
  id: SingleFortune;
  label: string;
  subtitle: string;
  focus: string[];
  oneLine: string;
}

const fortuneOptions: FortuneOption[] = [
  {
    id: "wealth",
    label: "재물운",
    subtitle: "돈의 흐름과 쓰임을 살피는 전시",
    focus: ["돈이 들어오는 방식", "소비와 지출 패턴", "재물운 강한 시기"],
    oneLine: "흐름을 키우기보다 새는 곳을 먼저 정리할 때 재물운이 선명해집니다.",
  },
  {
    id: "love",
    label: "연애운",
    subtitle: "관계의 결을 읽는 전시",
    focus: ["연애 스타일", "반복되는 연애 패턴", "좋은 인연이 들어오는 시기"],
    oneLine: "감정이 깊어지는 속도보다, 마음을 여는 방식이 더 중요한 시기입니다.",
  },
  {
    id: "career",
    label: "직장운",
    subtitle: "일의 방향과 자리의 흐름",
    focus: ["일하는 방식", "인정받는 포인트", "이직과 변화의 타이밍"],
    oneLine: "확장보다 실력을 정리해 두면 다음 기회에서 훨씬 크게 드러납니다.",
  },
  {
    id: "supporter",
    label: "귀인운",
    subtitle: "도움을 주는 사람과 연결의 때",
    focus: ["귀인이 오는 시기", "도움을 받는 방식", "관계에서 열리는 기회"],
    oneLine: "혼자 밀어붙이기보다, 연결을 받아들이는 태도가 운을 엽니다.",
  },
  {
    id: "health",
    label: "건강/에너지운",
    subtitle: "몸과 기운의 균형을 읽는 전시",
    focus: ["기력의 오르내림", "무너지기 쉬운 패턴", "회복을 돕는 생활 리듬"],
    oneLine: "지금은 강하게 밀어붙이기보다, 기운을 보존하는 리듬이 더 중요합니다.",
  },
];

const totalReportSections = [
  "단일 리포트의 모든 내용 포함",
  "올해 전체 흐름과 상승기·정리기·전환기",
  "재물운, 연애운, 직장운, 귀인운, 건강운 전체 제공",
  "중요한 변화 시기와 귀인·금전 상승 타이밍",
  "이번 달, 다음 달, 올해 주요 월별 흐름",
  "오행 수묵화 전체 다운로드와 추천 컬렉션",
  "올해의 한 줄 운세 프리미엄 버전",
];

export default function GalleryOne() {
  const [view, setView] = useState<"main" | "single-select" | "total-summary">("main");
  const [selectedFortune, setSelectedFortune] = useState<SingleFortune>("wealth");

  const sajuData = useMemo(
    () =>
      calculateSaju({
        birthDate: "1990-01-01",
        birthTime: "12:00",
        calendarType: "solar",
        gender: "male",
      }),
    [],
  );

  const selectedFortuneMeta = fortuneOptions.find((option) => option.id === selectedFortune) ?? fortuneOptions[0];
  const guardianDetails = getElementDetails(sajuData.missingElement as FiveElements);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--color-hanji)]">
      {/* Background Layer */}
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-paper absolute inset-0" />
        <div className="hero-landscape-overlay absolute inset-0">
          <Image
            src="/image/main2.png"
            alt="제 1 전시실 통배경"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-40 pt-52 sm:px-8 lg:px-12">
        <div className="space-y-20">
          {/* Step 1: Main (Product Selection) */}
          {view === "main" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-24"
            >
              <section className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center">
                <div className="space-y-10">
                  <div className="space-y-5">
                    <p className="font-sans text-[11px] uppercase tracking-[0.46em] text-[rgba(62,54,42,0.52)]">
                      Exhibit No. 01
                    </p>
                    <h1 className="text-5xl leading-[1.18] tracking-[0.08em] text-[var(--color-ink-soft)] md:text-7xl">
                      나의 운명을 보다
                    </h1>
                    <p className="max-w-xl text-[16px] leading-8 text-[rgba(62,54,42,0.72)]">
                      제1전시실은 사주를 단순한 점술이 아닌 한 폭의 작품으로 읽어내는 공간입니다.
                      가장 궁금한 흐름 하나에 집중할지, 내 삶의 전체적인 결을 조망할지 선택해 주세요.
                    </p>
                  </div>
                </div>

                <div className="gallery-card relative overflow-hidden rounded-[2.2rem] p-5 shadow-[0_30px_70px_rgba(66,52,26,0.08)]">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-[1.8rem] sm:aspect-[21/9]">
                    <Image
                      src={guardianDetails.image}
                      alt={guardianDetails.name}
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
                  <p className="font-sans text-[11px] uppercase tracking-[0.45em] text-[rgba(128,97,36,0.6)]">Single Exhibition</p>
                  <h2 className="text-4xl tracking-[0.05em] text-[var(--color-ink-soft)]">단일 운세 리포트</h2>
                  <p className="max-w-sm text-[16px] leading-8 text-[rgba(62,54,42,0.65)]">
                    재물, 연애, 직장 등 현재 가장 큰 에너지를 쓰고 있는 한 가지 주제에 대해 깊이 있는 통찰을 제공합니다.
                  </p>
                  <p className="font-sans text-2xl tracking-[0.1em] text-[var(--color-gold)]">₩4,900</p>
                </div>
                <button
                  type="button"
                  onClick={() => setView("single-select")}
                  className="hero-cta mt-12 flex w-full items-center justify-center gap-4 rounded-full py-5 transition-all"
                >
                  <span className="font-sans text-[12px] uppercase tracking-[0.4em]">전시 선택하기</span>
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
                  <p className="font-sans text-[11px] uppercase tracking-[0.45em] text-[rgba(128,97,36,0.6)]">Total Collection</p>
                  <h2 className="text-4xl tracking-[0.05em] text-[var(--color-ink-soft)]">토탈 운세 리포트</h2>
                  <p className="max-w-sm text-[16px] leading-8 text-[rgba(62,54,42,0.65)]">
                    삶의 다섯 가지 대운과 올해의 월별 흐름, 중요한 변화의 시기를 한 눈에 읽는 종합 큐레이션 전시입니다.
                  </p>
                  <p className="font-sans text-2xl tracking-[0.1em] text-[var(--color-gold)]">₩9,900</p>
                </div>
                <button
                  type="button"
                  onClick={() => setView("total-summary")}
                  className="hero-cta mt-12 flex w-full items-center justify-center gap-4 rounded-full py-5 transition-all"
                >
                  <span className="font-sans text-[12px] uppercase tracking-[0.4em]">전체 흐름 보기</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            </section>
          </motion.div>
        )}

        {/* Step 2: Single Selection */}
        {view === "single-select" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-16"
          >
            <div className="flex flex-col items-center justify-between gap-6 border-b border-[rgba(197,160,89,0.15)] pb-10 sm:flex-row">
              <div className="space-y-3">
                <button 
                  onClick={() => setView("main")}
                  className="font-sans text-[10px] uppercase tracking-[0.3em] text-[rgba(62,54,42,0.5)] hover:text-[var(--color-gold)] transition-colors"
                >
                  ← 돌아가기
                </button>
                <h2 className="text-4xl tracking-[0.05em] text-[var(--color-ink-soft)]">리포트 종류 선택</h2>
              </div>
              <p className="font-sans text-xl tracking-[0.1em] text-[var(--color-gold)]">단일 리포트 · ₩4,900</p>
            </div>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
              <div className="space-y-4">
                {fortuneOptions.map((option) => {
                  const active = selectedFortune === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setSelectedFortune(option.id)}
                      className={`group w-full rounded-[1.8rem] border p-7 text-left transition-all duration-300 ${
                        active
                          ? "border-[rgba(197,160,89,0.6)] bg-[rgba(255,251,244,0.8)] shadow-[0_20px_40px_rgba(89,71,36,0.06)]"
                          : "border-[rgba(197,160,89,0.15)] bg-white/40 hover:border-[rgba(197,160,89,0.3)]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <h3 className="text-2xl text-[var(--color-ink-soft)]">{option.label}</h3>
                          <p className="text-[14px] text-[rgba(62,54,42,0.6)]">{option.subtitle}</p>
                        </div>
                        {active && <div className="h-2 w-2 rounded-full bg-[var(--color-gold)] shadow-[0_0_10px_rgba(197,160,89,0.5)]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="gallery-card rounded-[2.2rem] p-10">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[rgba(128,97,36,0.7)]">Selection Summary</p>
                    <h3 className="text-3xl text-[var(--color-ink-soft)]">{selectedFortuneMeta.label} 리포트</h3>
                    <p className="text-[16px] leading-8 text-[rgba(62,54,42,0.7)]">
                      {selectedFortuneMeta.oneLine}
                    </p>
                  </div>

                  <div className="space-y-5 rounded-[1.8rem] border border-[rgba(197,160,89,0.15)] bg-[rgba(248,245,240,0.6)] p-8">
                    <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[rgba(62,54,42,0.5)]">주요 관람 포인트</p>
                    <div className="grid gap-3">
                      {selectedFortuneMeta.focus.map((item) => (
                        <div key={item} className="flex items-center gap-3 text-[15px] text-[rgba(62,54,42,0.75)]">
                          <Check className="h-4 w-4 text-[var(--color-gold)]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/result?kind=gallery1&reportType=${selectedFortune}&selectedFortune=${selectedFortune}&birthDate=1990-01-01&birthTime=12:00&calendarType=solar&gender=male`}
                    className="hero-cta flex w-full items-center justify-center gap-4 rounded-full py-5"
                  >
                    <span className="font-sans text-[12px] uppercase tracking-[0.4em]">결과 미리보기</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Total Summary */}
        {view === "total-summary" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-16"
          >
            <div className="flex flex-col items-center justify-between gap-6 border-b border-[rgba(197,160,89,0.15)] pb-10 sm:flex-row">
              <div className="space-y-3">
                <button 
                  onClick={() => setView("main")}
                  className="font-sans text-[10px] uppercase tracking-[0.3em] text-[rgba(62,54,42,0.5)] hover:text-[var(--color-gold)] transition-colors"
                >
                  ← 돌아가기
                </button>
                <h2 className="text-4xl tracking-[0.05em] text-[var(--color-ink-soft)]">토탈 리포트 구성</h2>
              </div>
              <p className="font-sans text-xl tracking-[0.1em] text-[var(--color-gold)]">₩9,900</p>
            </div>

            <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
              <div className="gallery-card rounded-[2.2rem] p-10">
                <div className="grid gap-10 sm:grid-cols-2">
                  <div className="space-y-6">
                    <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[rgba(128,97,36,0.7)]">Overview</p>
                    <div className="space-y-4">
                      {totalReportSections.slice(0, 4).map((item) => (
                        <div key={item} className="flex gap-4 text-[15px] leading-7 text-[rgba(62,54,42,0.75)]">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--color-gold)]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6 sm:mt-11">
                    <div className="space-y-4">
                      {totalReportSections.slice(4).map((item) => (
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
                    "모든 운의 결을 하나로 잇고,<br />가장 강력한 타이밍을 선별해 드립니다."
                  </p>
                </div>

                <Link
                  href={`/result?kind=gallery1&reportType=total&birthDate=1990-01-01&birthTime=12:00&calendarType=solar&gender=male`}
                  className="hero-cta flex w-full items-center justify-center gap-4 rounded-full py-6 shadow-[0_20px_40px_rgba(197,160,89,0.15)]"
                >
                  <span className="font-sans text-[13px] uppercase tracking-[0.5em]">토탈 결과 미리보기</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <p className="text-center font-sans text-[10px] uppercase tracking-[0.3em] text-[rgba(62,54,42,0.4)]">
                  Premium curation for your entire year
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
