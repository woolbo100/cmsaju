"use client";

import { calculateSaju, getElementDetails, type FiveElements } from "@/lib/saju";
import { motion } from "framer-motion";
import { ArrowRight, Check, Download, Sparkles } from "lucide-react";
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

const singleReportSections = [
  "기본 사주 요약: 년주, 월주, 일주, 시주",
  "천간·지지와 오행 분포를 직관적으로 정리",
  "현재 흐름, 올해 방향, 지금 조심할 흐름",
  "선택한 운세 1개 깊이 해석",
  "부족한 오행 보완 방향",
  "오행 수묵화 이미지 1장 다운로드",
  "오늘의 한 줄 운세 카드",
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

const reportMeta: Record<
  ReportType,
  {
    title: string;
    price: string;
    intro: string;
    summary: string;
  }
> = {
  wealth: {
    title: "단일 운세 리포트",
    price: "₩4,900",
    intro: "가장 궁금한 영역 하나를 깊이 있게 보는 큐레이션",
    summary: "재물의 유입과 유출, 기회가 강해지는 구간을 중심으로 읽습니다.",
  },
  love: {
    title: "단일 운세 리포트",
    price: "₩4,900",
    intro: "가장 궁금한 영역 하나를 깊이 있게 보는 큐레이션",
    summary: "관계의 패턴과 인연이 머무는 방식을 중심으로 읽습니다.",
  },
  career: {
    title: "단일 운세 리포트",
    price: "₩4,900",
    intro: "가장 궁금한 영역 하나를 깊이 있게 보는 큐레이션",
    summary: "일의 방향, 자리의 변화, 인정받는 포인트를 중심으로 읽습니다.",
  },
  supporter: {
    title: "단일 운세 리포트",
    price: "₩4,900",
    intro: "가장 궁금한 영역 하나를 깊이 있게 보는 큐레이션",
    summary: "도움을 주는 인연과 연결이 열리는 시점을 중심으로 읽습니다.",
  },
  health: {
    title: "단일 운세 리포트",
    price: "₩4,900",
    intro: "가장 궁금한 영역 하나를 깊이 있게 보는 큐레이션",
    summary: "몸과 기운의 리듬, 에너지 회복 포인트를 중심으로 읽습니다.",
  },
  total: {
    title: "토탈 운세 리포트",
    price: "₩9,900",
    intro: "내 흐름 전체를 한 번에 조망하는 프리미엄 전시",
    summary: "다섯 가지 운세와 시기 운, 월별 흐름까지 전체 구성을 담습니다.",
  },
};

export default function GalleryOne() {
  const [selectedFortune, setSelectedFortune] = useState<SingleFortune>("wealth");
  const [reportType, setReportType] = useState<ReportType>("wealth");

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
  const currentMeta = reportMeta[reportType];
  const guardianDetails = getElementDetails(sajuData.missingElement as FiveElements);

  const handleSelectSingle = (fortuneId: SingleFortune) => {
    setSelectedFortune(fortuneId);
    setReportType(fortuneId);
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
                Exhibit No. 01
              </p>
              <h1 className="text-5xl leading-[1.18] tracking-[0.08em] text-[var(--color-ink-soft)] md:text-7xl">
                나의 운명을 보다
              </h1>
              <p className="max-w-xl text-[16px] leading-8 text-[rgba(62,54,42,0.72)]">
                가장 궁금한 흐름 하나를 먼저 관람할지, 올해의 결 전체를 한 번에 볼지 선택하는 제1전시실입니다.
                상품을 고르는 것이 아니라, 지금의 운명을 어떤 방식으로 관람할지 정하는 경험에 가깝게 설계했습니다.
              </p>
            </div>

            <div className="space-y-6 border-l border-[rgba(197,160,89,0.22)] pl-6">
              <p className="text-xl italic leading-9 text-[rgba(62,54,42,0.88)]">
                “지금은 확장보다 정리와 재정비가 중요한 시기입니다.”
              </p>
              <p className="max-w-lg text-[15px] leading-8 text-[rgba(62,54,42,0.68)]">
                단일 리포트는 하나의 질문에 선명하게 답하고, 토탈 리포트는 흐름 전체의 맥락을 이어서 보여줍니다.
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
                src={guardianDetails.image}
                alt={guardianDetails.name}
                fill
                className="object-cover grayscale-[0.18]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,245,240,0.02),rgba(248,245,240,0.62))]" />
              <div className="absolute inset-5 rounded-[1.5rem] border border-white/40" />
              <div className="absolute bottom-8 left-8 max-w-sm space-y-3">
                <p className="font-sans text-[10px] uppercase tracking-[0.36em] text-[rgba(255,248,236,0.72)]">
                  Curated Fate Preview
                </p>
                <p className="text-2xl leading-9 text-white/90">
                  {guardianDetails.guardianTitle}
                </p>
                <p className="text-sm leading-7 text-white/72">
                  {guardianDetails.guardianDesc}
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <motion.button
            type="button"
            onClick={() => handleSelectSingle(selectedFortune)}
            whileHover={{ y: -4 }}
            className={`gallery-card rounded-[2rem] border p-8 text-left transition-all duration-300 ${
              reportType !== "total"
                ? "border-[rgba(197,160,89,0.58)] shadow-[0_24px_50px_rgba(89,71,36,0.08)]"
                : "border-[rgba(197,160,89,0.16)]"
            }`}
          >
            <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[rgba(62,54,42,0.54)]">
              가볍게 하나만 보고 싶다면
            </p>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div className="space-y-3">
                <h2 className="text-3xl leading-tight text-[var(--color-ink-soft)]">단일 운세 리포트</h2>
                <p className="max-w-md text-[15px] leading-8 text-[rgba(62,54,42,0.68)]">
                  지금 가장 궁금한 한 영역만 골라, 핵심 흐름과 보완 포인트를 정제해 보여줍니다.
                </p>
              </div>
              <p className="font-sans text-xl tracking-[0.08em] text-[rgba(128,97,36,0.92)]">₩4,900</p>
            </div>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => setReportType("total")}
            whileHover={{ y: -4 }}
            className={`gallery-card relative rounded-[2rem] border p-8 text-left transition-all duration-300 ${
              reportType === "total"
                ? "border-[rgba(197,160,89,0.72)] shadow-[0_26px_56px_rgba(89,71,36,0.1)]"
                : "border-[rgba(197,160,89,0.16)]"
            }`}
          >
            <div className="absolute right-8 top-8 rounded-full border border-[rgba(197,160,89,0.3)] bg-[rgba(197,160,89,0.08)] px-4 py-2">
              <span className="font-sans text-[10px] uppercase tracking-[0.34em] text-[rgba(128,97,36,0.92)]">Best</span>
            </div>
            <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[rgba(62,54,42,0.54)]">
              내 흐름을 전체적으로 보고 싶다면
            </p>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div className="space-y-3">
                <h2 className="text-3xl leading-tight text-[var(--color-ink-soft)]">토탈 운세 리포트</h2>
                <p className="max-w-md text-[15px] leading-8 text-[rgba(62,54,42,0.68)]">
                  다섯 가지 운세와 시기 운, 월별 흐름까지 한 번에 이어 보는 프리미엄 리포트입니다.
                </p>
              </div>
              <p className="font-sans text-xl tracking-[0.08em] text-[rgba(128,97,36,0.92)]">₩9,900</p>
            </div>
          </motion.button>
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="gallery-card rounded-[2rem] p-8">
            <div className="space-y-4">
              <p className="font-sans text-[11px] uppercase tracking-[0.38em] text-[rgba(62,54,42,0.52)]">
                단일 리포트 선택
              </p>
              <h3 className="text-3xl leading-tight text-[var(--color-ink-soft)]">
                지금 가장 궁금한 영역 하나를 고르세요
              </h3>
              <p className="text-[15px] leading-8 text-[rgba(62,54,42,0.66)]">
                선택값은 `selectedFortune`과 `reportType`에 저장되는 구조로 맞췄습니다.
              </p>
            </div>

            <div className="mt-8 grid gap-3">
              {fortuneOptions.map((option) => {
                const active = selectedFortune === option.id && reportType !== "total";

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelectSingle(option.id)}
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
                  reportType: {reportType}
                </p>
                {reportType !== "total" ? (
                  <p className="mt-1 font-sans text-sm tracking-[0.08em] text-[rgba(62,54,42,0.58)]">
                    selectedFortune: {selectedFortune}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-[rgba(197,160,89,0.16)] bg-white/60 p-6">
              <p className="text-lg leading-8 text-[rgba(62,54,42,0.82)]">{currentMeta.summary}</p>
              {reportType !== "total" ? (
                <div className="mt-5 space-y-3">
                  <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-[rgba(62,54,42,0.5)]">
                    선택 해석 포인트
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedFortuneMeta.focus.map((item) => (
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
              href={`/result?kind=gallery1&reportType=${reportType}&selectedFortune=${selectedFortune}&birthDate=1990-01-01&birthTime=12:00&calendarType=solar&gender=male`}
              className="hero-cta mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full px-7 py-4"
            >
              <span className="font-sans text-[11px] uppercase tracking-[0.38em]">
                {reportType === "total" ? "토탈 리포트 결과 미리보기" : `${selectedFortuneMeta.label} 결과 미리보기`}
              </span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
          <div className="gallery-card rounded-[2rem] p-8">
            <div className="space-y-4">
              <p className="font-sans text-[11px] uppercase tracking-[0.38em] text-[rgba(62,54,42,0.52)]">
                기본 사주 요약
              </p>
              <h3 className="text-3xl leading-tight text-[var(--color-ink-soft)]">
                너무 전문적이지 않게, 그러나 빠짐없이
              </h3>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {sajuData.pillarsForDisplay.map((pillar) => (
                <div key={pillar.label} className="rounded-[1.4rem] border border-[rgba(197,160,89,0.14)] bg-white/60 p-5">
                  <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[rgba(62,54,42,0.48)]">
                    {pillar.label}주
                  </p>
                  <p className="mt-2 text-3xl text-[var(--color-ink-soft)]">{pillar.hanja}</p>
                  <p className="mt-1 text-sm tracking-[0.22em] text-[rgba(62,54,42,0.66)]">{pillar.hangeul}</p>
                  <p className="mt-3 text-xs text-[rgba(62,54,42,0.56)]">오행 {pillar.element}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.4rem] border border-[rgba(197,160,89,0.14)] bg-white/60 p-5">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[rgba(62,54,42,0.48)]">오행 분포</p>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {Object.entries(sajuData.fiveElementCount).map(([element, count]) => (
                  <div key={element} className="rounded-xl bg-[rgba(248,245,240,0.9)] px-2 py-3 text-center">
                    <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-[rgba(62,54,42,0.48)]">{element}</p>
                    <p className="mt-1 text-lg text-[var(--color-ink-soft)]">{count}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-7 text-[rgba(62,54,42,0.72)]">
                강한 오행: {sajuData.strongElements.join(", ")} / 부족한 오행: {sajuData.weakElements.join(", ")}
              </p>
            </div>
          </div>

          <div className="grid gap-8">
            <div className="gallery-card rounded-[2rem] p-8">
              <div className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-[rgba(128,97,36,0.84)]" />
                <p className="font-sans text-[11px] uppercase tracking-[0.38em] text-[rgba(62,54,42,0.52)]">포함 내용 비교</p>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-[rgba(197,160,89,0.16)] bg-white/60 p-6">
                  <p className="text-xl text-[var(--color-ink-soft)]">단일 운세 리포트</p>
                  <p className="mt-2 font-sans text-sm tracking-[0.06em] text-[rgba(128,97,36,0.92)]">₩4,900</p>
                  <div className="mt-5 space-y-3">
                    {singleReportSections.map((item) => (
                      <div key={item} className="flex gap-3 text-sm leading-7 text-[rgba(62,54,42,0.72)]">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-[rgba(128,97,36,0.9)]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-[rgba(197,160,89,0.28)] bg-[rgba(255,251,244,0.9)] p-6">
                  <p className="text-xl text-[var(--color-ink-soft)]">토탈 운세 리포트</p>
                  <p className="mt-2 font-sans text-sm tracking-[0.06em] text-[rgba(128,97,36,0.92)]">₩9,900</p>
                  <div className="mt-5 space-y-3">
                    {totalReportSections.map((item) => (
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
                  오늘의 한 줄 운세
                </p>
                <p className="mt-5 text-2xl italic leading-10 text-[rgba(62,54,42,0.9)]">
                  “{selectedFortuneMeta.oneLine}”
                </p>
              </div>

              <div className="gallery-card rounded-[2rem] p-8">
                <p className="font-sans text-[11px] uppercase tracking-[0.38em] text-[rgba(62,54,42,0.52)]">
                  부족한 오행 보완
                </p>
                <p className="mt-4 text-2xl leading-10 text-[var(--color-ink-soft)]">
                  당신에게는 {guardianDetails.name.split("|")[0].trim()}의 기운을 조금 더 채우는 방향이 필요합니다.
                </p>
                <p className="mt-4 text-[15px] leading-8 text-[rgba(62,54,42,0.68)]">
                  {guardianDetails.guardianDesc}
                </p>
                <button className="mt-6 inline-flex items-center gap-3 rounded-full border border-[rgba(197,160,89,0.26)] px-5 py-3 text-[rgba(128,97,36,0.92)] transition hover:bg-[rgba(197,160,89,0.06)]">
                  <Download className="h-4 w-4" />
                  <span className="font-sans text-[11px] uppercase tracking-[0.32em]">수묵화 이미지 다운로드</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
