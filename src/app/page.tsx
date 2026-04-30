"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { CalendarType, Gender } from "@/lib/saju";

const heroCopy = {
  eyebrow: "CURATED FATE & ART",
  title: "당신의 운명,\n한 폭의 그림이 되다",
  subtitle: "당신의 사주를 가장 아름답게 읽는 방법",
};

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState({
    birthDate: "1990-01-01",
    birthTime: "12:00",
    calendarType: "solar" as CalendarType,
    gender: "male" as Gender,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams({
      kind: "saju",
      birthDate: form.birthDate,
      birthTime: form.birthTime,
      calendarType: form.calendarType,
      gender: form.gender,
    });

    router.push(`/result?${params.toString()}`);
  };

  return (
    <>
      <section className="hero-stage relative isolate min-h-screen overflow-hidden bg-[var(--color-hanji)] pt-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="hero-paper absolute inset-0" />
          <div className="hero-landscape-overlay absolute inset-0">
            <Image
              src="/image/main1.png"
              alt="천명갤러리 메인 배경"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
          <div className="hero-gold-dust absolute inset-x-0 top-0 h-full" />
          
          {/* Subtle Background Seal Points */}
          <div className="absolute left-[15%] top-[25%] h-6 w-6 opacity-[0.08] grayscale mix-blend-multiply">
            <Image src="/assets/stamp_yeon.png" alt="" fill className="object-contain" />
          </div>
          <div className="absolute bottom-[20%] right-[18%] h-7 w-7 opacity-[0.06] grayscale mix-blend-multiply">
            <Image src="/assets/stamp_logo.png" alt="" fill className="object-contain" />
          </div>

          <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[rgba(248,245,240,1)] via-[rgba(248,245,240,0.6)] to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl flex-col px-6 pb-24 pt-40 sm:px-8 lg:px-12">
          <div className="flex flex-1 flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <p className="font-sans text-[10px] uppercase tracking-[0.7em] text-[rgba(62,54,42,0.5)] sm:text-[11px]">
                {heroCopy.eyebrow}
              </p>
              <h1 className="mt-8 whitespace-pre-line text-[2.75rem] leading-[1.45] tracking-[0.22em] text-[var(--color-ink-soft)] sm:text-[4rem] lg:text-[5.2rem]">
                {heroCopy.title}
              </h1>
              <p className="mx-auto mt-8 max-w-xl text-sm leading-8 tracking-[0.25em] text-[rgba(62,54,42,0.65)] sm:text-[16px]">
                {heroCopy.subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative mt-24 w-full max-w-[22rem] sm:max-w-[26rem] lg:mt-32 lg:max-w-[30rem]"
            >
              <div className="relative aspect-square overflow-hidden">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute inset-[10%]"
                >
                  <Image
                    src="/assets/enso.png"
                    alt="천명갤러리의 작품처럼 표현된 운명의 수묵 원형"
                    fill
                    priority
                    className="object-contain opacity-90 mix-blend-multiply"
                  />
                </motion.div>
              </div>
              <div className="hero-stamp absolute -bottom-5 -right-5 flex items-center gap-2 px-4 py-2.5 shadow-lg">
                <div className="relative h-8 w-8">
                  <Image src="/assets/stamp_logo.png" alt="천명갤러리 인장" fill className="object-contain" />
                </div>
                <span className="font-sans text-[10px] uppercase tracking-[0.38em] text-[rgba(150,38,28,0.85)]">
                  運命의 印
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
              className="mt-16 flex flex-col items-center gap-6"
            >
              <Link href="/gallery/1" className="hero-cta group inline-flex items-center gap-5 rounded-sm px-10 py-4.5">
                <span className="font-sans text-[12px] uppercase tracking-[0.45em]">내 운명 전시 보기</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
              </Link>
              <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-[rgba(62,54,42,0.45)]">
                Unveil the art of your destiny
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="mx-auto mt-10 flex flex-col items-center gap-4 text-[rgba(62,54,42,0.4)]"
          >
            <div className="relative h-9 w-9">
              <Image src="/assets/stamp_yeon.png" alt="" fill className="object-contain opacity-50" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="font-sans text-[10px] uppercase tracking-[0.5em]">Scroll Down</span>
              <div className="h-10 w-px bg-gradient-to-b from-[rgba(197,160,89,0.5)] to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 border-t border-[rgba(197,160,89,0.14)] bg-[rgba(252,249,243,0.84)] py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:px-12">
          <div className="space-y-5">
            <p className="font-sans text-[11px] uppercase tracking-[0.44em] text-[rgba(62,54,42,0.52)]">
              Test Preview
            </p>
            <h2 className="text-3xl leading-tight tracking-[0.08em] text-[var(--color-ink-soft)]">
              결과 미리보기는 이제 분리된 결과 페이지에서 확인합니다
            </h2>
            <p className="max-w-md text-[15px] leading-8 text-[rgba(62,54,42,0.7)]">
              지금은 결제 없는 테스트 버전이라 입력 후 바로 결과 페이지로 이동합니다. 추후 결제 게이트를 붙이기 쉽도록
              `/result` 구조로 분리했습니다.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <form onSubmit={handleSubmit} className="gallery-card space-y-5 rounded-[2rem] p-7">
              <div className="grid gap-4">
                <label className="space-y-2">
                  <span className="font-sans text-[11px] uppercase tracking-[0.32em] text-[rgba(62,54,42,0.56)]">Birth Date</span>
                  <input
                    type="date"
                    value={form.birthDate}
                    onChange={(event) => setForm((current) => ({ ...current, birthDate: event.target.value }))}
                    className="w-full rounded-2xl border border-[rgba(197,160,89,0.22)] bg-white/70 px-4 py-3 font-sans outline-none transition focus:border-[rgba(197,160,89,0.72)]"
                    required
                  />
                </label>

                <label className="space-y-2">
                  <span className="font-sans text-[11px] uppercase tracking-[0.32em] text-[rgba(62,54,42,0.56)]">Birth Time</span>
                  <input
                    type="time"
                    value={form.birthTime}
                    onChange={(event) => setForm((current) => ({ ...current, birthTime: event.target.value }))}
                    className="w-full rounded-2xl border border-[rgba(197,160,89,0.22)] bg-white/70 px-4 py-3 font-sans outline-none transition focus:border-[rgba(197,160,89,0.72)]"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="font-sans text-[11px] uppercase tracking-[0.32em] text-[rgba(62,54,42,0.56)]">Calendar</span>
                  <select
                    value={form.calendarType}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        calendarType: event.target.value as CalendarType,
                      }))
                    }
                    className="w-full rounded-2xl border border-[rgba(197,160,89,0.22)] bg-white/70 px-4 py-3 font-sans outline-none transition focus:border-[rgba(197,160,89,0.72)]"
                  >
                    <option value="solar">양력</option>
                    <option value="lunar">음력</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="font-sans text-[11px] uppercase tracking-[0.32em] text-[rgba(62,54,42,0.56)]">Gender</span>
                  <select
                    value={form.gender}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        gender: event.target.value as Gender,
                      }))
                    }
                    className="w-full rounded-2xl border border-[rgba(197,160,89,0.22)] bg-white/70 px-4 py-3 font-sans outline-none transition focus:border-[rgba(197,160,89,0.72)]"
                  >
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                  </select>
                </label>
              </div>

              <button type="submit" className="hero-cta inline-flex w-full items-center justify-center gap-3 rounded-full px-6 py-4">
                <span className="font-sans text-[11px] uppercase tracking-[0.36em]">테스트 결과 보기</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="gallery-card flex min-h-[18rem] flex-col justify-between rounded-[2rem] p-7">
              <div className="space-y-3">
                <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-[rgba(62,54,42,0.56)]">Test Mode Notice</p>
                <p className="text-[15px] leading-8 text-[rgba(62,54,42,0.74)]">
                  현재는 누구나 결과를 확인할 수 있는 테스트 모드입니다. 결제, 주문 저장, 마이페이지 게이트는 다음 단계에서
                  연결할 예정입니다.
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-[rgba(197,160,89,0.16)] bg-white/60 p-5">
                <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-[rgba(62,54,42,0.5)]">Next Phase Ready</p>
                <p className="mt-3 text-sm leading-7 text-[rgba(62,54,42,0.72)]">
                  입력 → 상품 선택 → 결제 → 결과 오픈 흐름으로 확장하기 쉽도록, 결과 화면을 독립 라우트로 분리했습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
