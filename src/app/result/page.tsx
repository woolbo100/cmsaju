import Image from "next/image";
import Link from "next/link";
import { calculateSaju, getElementDetails, type CalendarType, type Gender, type SajuResult } from "@/lib/saju";

type ResultPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const pickString = (value: string | string[] | undefined, fallback = "") =>
  typeof value === "string" ? value : Array.isArray(value) ? value[0] ?? fallback : fallback;

const readCalendar = (value: string): CalendarType => (value === "lunar" ? "lunar" : "solar");
const readGender = (value: string): Gender => (value === "female" ? "female" : "male");

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const params = await searchParams;
  const kind = pickString(params.kind, "saju");

  const sajuResult = calculateSaju({
    birthDate: pickString(params.birthDate, "1990-01-01"),
    birthTime: pickString(params.birthTime, "12:00"),
    calendarType: readCalendar(pickString(params.calendarType, "solar")),
    gender: readGender(pickString(params.gender, "male")),
  });

  const guardian = getElementDetails(sajuResult.missingElement);
  const reportType = pickString(params.reportType, "preview");
  const relationshipType = pickString(params.relationshipType, "preview");

  return (
    <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:px-8 lg:px-12">
      <div className="space-y-10">
        <div className="rounded-[1.8rem] border border-[rgba(197,160,89,0.16)] bg-[rgba(255,251,244,0.9)] px-6 py-5">
          <p className="font-sans text-[11px] uppercase tracking-[0.34em] text-[rgba(128,97,36,0.92)]">Test Version</p>
          <p className="mt-2 text-sm leading-7 text-[rgba(62,54,42,0.72)]">
            현재 결과 페이지는 결제 전 테스트 모드입니다. 누구나 입력 후 결과를 미리볼 수 있으며, 추후 결제 완료 사용자에게만
            열리도록 게이트를 연결할 예정입니다.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <div className="gallery-card overflow-hidden rounded-[2rem] p-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem]">
              <Image
                src={guardian.guardian}
                alt={guardian.guardianTitle}
                fill
                className="object-cover grayscale-[0.12]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,245,240,0.06),rgba(248,245,240,0.68))]" />
              <div className="absolute bottom-8 left-8 max-w-sm space-y-3">
                <p className="font-sans text-[10px] uppercase tracking-[0.36em] text-[rgba(255,248,236,0.76)]">Result Preview</p>
                <p className="text-2xl leading-9 text-white/92">{guardian.guardianTitle}</p>
                <p className="text-sm leading-7 text-white/72">{guardian.guardianDesc}</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[rgba(62,54,42,0.52)]">
                {kind === "gallery1" ? "제1전시실 결과" : kind === "gallery2" ? "제2전시실 결과" : "기본 사주 결과"}
              </p>
              <h1 className="text-4xl leading-[1.3] tracking-[0.08em] text-[var(--color-ink-soft)] md:text-5xl">
                {kind === "gallery1"
                  ? `선택한 리포트: ${reportType}`
                  : kind === "gallery2"
                    ? `선택한 관계 해석: ${relationshipType}`
                    : "사주 데이터 미리보기"}
              </h1>
              <p className="text-[15px] leading-8 text-[rgba(62,54,42,0.7)]">
                결과 화면을 독립 라우트로 분리해 두어서, 다음 단계에서 결제 완료 후에만 접근 가능한 구조로 자연스럽게 확장할 수 있습니다.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {sajuResult.pillarsForDisplay.map((pillar) => (
                <div key={pillar.label} className="gallery-card rounded-[1.5rem] p-5">
                  <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-[rgba(62,54,42,0.48)]">{pillar.label}주</p>
                  <p className="mt-2 text-3xl text-[var(--color-ink-soft)]">{pillar.hanja}</p>
                  <p className="mt-1 text-sm tracking-[0.22em] text-[rgba(62,54,42,0.66)]">{pillar.hangeul}</p>
                  <p className="mt-3 text-xs text-[rgba(62,54,42,0.56)]">오행 {pillar.element}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="gallery-card rounded-[2rem] p-7">
            <p className="font-sans text-[11px] uppercase tracking-[0.34em] text-[rgba(62,54,42,0.52)]">오행 분포</p>
            <div className="mt-5 grid grid-cols-5 gap-3">
              {Object.entries(sajuResult.fiveElementCount).map(([element, count]) => (
                <div key={element} className="rounded-[1.1rem] bg-[rgba(248,245,240,0.9)] px-3 py-4 text-center">
                  <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-[rgba(62,54,42,0.48)]">{element}</p>
                  <p className="mt-1 text-xl text-[var(--color-ink-soft)]">{count}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-[rgba(62,54,42,0.72)]">
              강한 오행: {sajuResult.strongElements.join(", ")} / 부족한 오행: {sajuResult.weakElements.join(", ")}
            </p>
          </div>

          <div className="gallery-card rounded-[2rem] p-7">
            <p className="font-sans text-[11px] uppercase tracking-[0.34em] text-[rgba(62,54,42,0.52)]">운영 전환 메모</p>
            <div className="mt-5 space-y-3 text-sm leading-7 text-[rgba(62,54,42,0.72)]">
              <p>현재는 테스트 버전이라 결제 없이 바로 결과를 엽니다.</p>
              <p>다음 단계에서는 주문 저장과 결제 완료 여부를 확인하는 gate만 추가하면 됩니다.</p>
              <p>상품 가격과 선택 구조는 그대로 유지되고, 접근 제어만 바뀌는 형태를 전제로 정리했습니다.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/" className="hero-cta inline-flex items-center gap-3 rounded-full px-5 py-3">
                <span className="font-sans text-[11px] uppercase tracking-[0.3em]">다시 입력하기</span>
              </Link>
              <Link href="/gallery/1" className="rounded-full border border-[rgba(197,160,89,0.2)] px-5 py-3 text-[rgba(128,97,36,0.92)]">
                제1전시실
              </Link>
              <Link href="/gallery/2" className="rounded-full border border-[rgba(197,160,89,0.2)] px-5 py-3 text-[rgba(128,97,36,0.92)]">
                제2전시실
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
