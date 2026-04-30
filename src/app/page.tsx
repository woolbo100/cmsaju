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
  subtitle: "운명을 읽고, 부족한 기운을 그림으로 채우다",
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
      <section className="hero-stage relative isolate min-h-screen overflow-hidden bg-[var(--color-hanji)] pt-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="hero-paper absolute inset-0" />
          <div className="hero-mist hero-mist-top absolute -left-[12%] top-[12%] h-[28rem] w-[36rem] rounded-full" />
          <div className="hero-mist hero-mist-bottom absolute -right-[16%] bottom-[10%] h-[24rem] w-[34rem] rounded-full" />
          <div className="hero-gold-cloud hero-gold-cloud-left absolute left-[4%] top-[18%] h-36 w-52" />
          <div className="hero-gold-cloud hero-gold-cloud-right absolute right-[5%] top-[24%] h-40 w-56" />
          <div className="hero-brush hero-brush-left absolute left-0 top-24 h-[26rem] w-40" />
          <div className="hero-brush hero-brush-right absolute right-0 top-36 h-[22rem] w-36" />
          <div className="hero-gold-dust absolute inset-x-0 top-0 h-full" />
          <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-[rgba(248,245,240,0.92)] via-[rgba(248,245,240,0.4)] to-transparent" />
          <div className="absolute inset-0 opacity-[0.16] mix-blend-multiply">
            <Image
              src="/assets/bg_landscape.png"
              alt=""
              fill
              priority
              className="object-cover object-center grayscale"
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl flex-col px-6 pb-14 pt-10 sm:px-8 lg:px-12">
          <div className="flex flex-1 flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="text-center"
            >
              <p className="font-sans text-[10px] uppercase tracking-[0.65em] text-[rgba(62,54,42,0.56)] sm:text-[11px]">
                {heroCopy.eyebrow}
              </p>
              <h1 className="mt-7 whitespace-pre-line text-[2.5rem] leading-[1.55] tracking-[0.16em] text-[var(--color-ink-soft)] sm:text-[3.7rem] lg:text-[4.8rem]">
                {heroCopy.title}
              </h1>
              <p className="mx-auto mt-7 max-w-xl text-sm leading-8 tracking-[0.18em] text-[rgba(62,54,42,0.72)] sm:text-[15px]">
                {heroCopy.subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
              whileHover={{
                y: -4,
                boxShadow: "0 28px 60px rgba(90, 73, 38, 0.12), 0 0 28px rgba(197, 160, 89, 0.08)",
              }}
              className="hero-art-frame mt-14 w-full max-w-[21rem] sm:max-w-[24rem] lg:mt-16 lg:max-w-[28rem]"
            >
              <div className="hero-art-inner relative aspect-square overflow-hidden rounded-[999px]">
                <div className="hero-art-paper absolute inset-[6%] rounded-full" />
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute inset-[9%] rounded-full"
                >
                  <Image
                    src="/assets/enso.png"
                    alt="천명갤러리의 작품처럼 표현된 운명의 수묵 원형"
                    fill
                    priority
                    className="object-contain opacity-85 mix-blend-multiply"
                  />
                </motion.div>
                <div className="hero-ink-ring absolute inset-[12%] rounded-full" />
              </div>
              <div className="hero-stamp absolute -bottom-6 right-6 flex items-center gap-2 rounded-full px-3 py-2">
                <div className="relative h-7 w-7">
                  <Image src="/assets/stamp_logo.png" alt="천명갤러리 인장" fill className="object-contain" />
                </div>
                <span className="font-sans text-[10px] uppercase tracking-[0.36em] text-[rgba(150,38,28,0.78)]">
                  Seal of Fate
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.45, ease: "easeOut" }}
              className="mt-14 flex flex-col items-center gap-5"
            >
              <Link href="/gallery/1" className="hero-cta group inline-flex items-center gap-4 rounded-full px-7 py-4">
                <span className="font-sans text-[11px] uppercase tracking-[0.42em]">내 운명 전시 보기</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
              <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-[rgba(62,54,42,0.48)]">
                Quietly composed for your personal exhibition
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.9 }}
            className="mx-auto mt-8 flex flex-col items-center gap-3 text-[rgba(62,54,42,0.48)]"
          >
            <div className="relative h-8 w-8">
              <Image src="/assets/stamp_yeon.png" alt="" fill className="object-contain opacity-65" />
            </div>
            <div className="flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.42em]">
              <span>Scroll</span>
              <ArrowDown className="h-3.5 w-3.5 animate-[hero-bob_2.6s_ease-in-out_infinite]" />
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
