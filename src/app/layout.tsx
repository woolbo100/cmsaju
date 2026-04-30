import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const navigationItems = [
  { href: "/gallery/1", label: "제1전시실" },
  { href: "/gallery/2", label: "제2전시실" },
  { href: "/special", label: "특별전" },
  { href: "/result", label: "결과 미리보기" },
];

export const metadata: Metadata = {
  metadataBase: new URL("https://cheonmyeong-gallery.vercel.app"),
  title: {
    default: "천명갤러리 | 운명을 전시하는 프리미엄 사주 갤러리",
    template: "%s | 천명갤러리",
  },
  description:
    "사주와 오행, 관계의 흐름을 한 폭의 전시처럼 읽어내는 프리미엄 브랜드 경험. 천명갤러리 테스트 버전을 온라인에서 미리 체험해 보세요.",
  openGraph: {
    title: "천명갤러리",
    description: "운명을 전시하는 프리미엄 사주 갤러리",
    url: "https://cheonmyeong-gallery.vercel.app",
    siteName: "천명갤러리",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/assets/bg_landscape.png",
        width: 1200,
        height: 630,
        alt: "천명갤러리 오픈그래프 이미지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "천명갤러리",
    description: "운명을 전시하는 프리미엄 사주 갤러리",
    images: ["/assets/bg_landscape.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full bg-[var(--color-hanji)] text-[var(--color-ink)]">
        <header className="fixed inset-x-0 top-0 z-50 border-b border-[rgba(197,160,89,0.16)] bg-[rgba(248,245,240,0.72)] backdrop-blur-2xl">
          <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
            <Link
              href="/"
              className="group flex items-center gap-4 text-[var(--color-ink-soft)] transition-colors"
            >
              <span className="text-[1.45rem] font-semibold tracking-[0.32em]">천명갤러리</span>
              <span className="hidden h-px w-10 bg-[linear-gradient(90deg,rgba(197,160,89,0),rgba(197,160,89,0.8),rgba(197,160,89,0))] sm:block" />
            </Link>

            <div className="hidden items-center gap-8 md:flex lg:gap-12">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link font-sans text-[12px] uppercase tracking-[0.32em] text-[rgba(62,54,42,0.78)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <p className="hidden font-sans text-[10px] uppercase tracking-[0.42em] text-[rgba(62,54,42,0.56)] lg:block">
              Curated Fate & Art
            </p>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-[rgba(197,160,89,0.12)] bg-[rgba(248,245,240,0.9)] py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 text-center sm:px-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:text-left lg:px-12">
            <div className="space-y-4">
              <p className="text-lg font-semibold tracking-[0.24em] text-[var(--color-ink-soft)]">천명갤러리</p>
              <p className="font-sans text-[11px] uppercase tracking-[0.34em] text-[rgba(62,54,42,0.52)]">
                Gallery of Fate and Five Elements
              </p>
              <p className="text-sm leading-7 text-[rgba(62,54,42,0.62)]">
                천명갤러리는 사주를 결과지처럼 보여주지 않고, 브랜드 전시처럼 경험하게 만드는 테스트 버전 서비스입니다.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <p className="font-sans text-[11px] uppercase tracking-[0.26em] text-[rgba(62,54,42,0.52)]">안내</p>
                <p className="text-sm leading-7 text-[rgba(62,54,42,0.62)]">
                  현재는 결제 전 테스트 모드이며, 입력 즉시 결과 미리보기를 확인할 수 있습니다.
                </p>
                <p className="text-sm leading-7 text-[rgba(62,54,42,0.62)]">
                  개인정보는 최소 입력 기준으로만 다루며, 장기 저장 기능은 아직 연결하지 않았습니다.
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-sans text-[11px] uppercase tracking-[0.26em] text-[rgba(62,54,42,0.52)]">문의</p>
                <p className="text-sm leading-7 text-[rgba(62,54,42,0.62)]">브랜드 테스트 및 피드백용 운영 버전입니다.</p>
                <p className="text-sm leading-7 text-[rgba(62,54,42,0.62)]">Contact: hello@cheonmyeong.gallery</p>
                <p className="text-sm leading-7 text-[rgba(62,54,42,0.62)]">
                  만세력 계산에는 MIT 라이선스 기반 오픈소스 라이브러리 `manseryeok`을 사용합니다.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
