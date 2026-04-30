"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Music, Calendar, History, Moon, ArrowRight, Download } from "lucide-react";
import Image from "next/image";

type ExhibitionType = 'daily' | 'yearly' | 'daewun' | 'monthly';

export default function SpecialExhibition() {
  const [selectedExhib, setSelectedExhib] = useState<ExhibitionType | null>(null);

  const exhibitions = [
    {
      id: 'daily' as ExhibitionType,
      title: '오늘의 선율',
      subtitle: '[소품전] Daily Melody',
      desc: '매일의 기운을 짧은 수묵 크로키와 함께 감상하는 일일 운세',
      icon: '/assets/icon_daily.png',
    },
    {
      id: 'yearly' as ExhibitionType,
      title: '올해의 풍경 (2026)',
      subtitle: '[상설전] Yearly Landscape',
      desc: '올해의 큰 흐름과 나를 둘러싼 환경의 변화를 한 폭의 산수화로',
      icon: '/assets/icon_yearly.png',
    },
    {
      id: 'daewun' as ExhibitionType,
      title: '대운의 물결',
      subtitle: '[회고전] Great Waves',
      desc: '인생의 커다란 마디(10년 대운)를 긴 두루마리 그림처럼',
      icon: '/assets/icon_daewun.png',
    },
    {
      id: 'monthly' as ExhibitionType,
      title: '달빛의 숨결',
      subtitle: '[비밀전] Monthly Breath',
      desc: '매달의 세밀한 변화와 조심해야 할 점을 담은 월간 운세',
      icon: '/assets/icon_monthly.png',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5F0] pt-64 pb-60 px-8 overflow-hidden">
      <AnimatePresence mode="wait">
        {!selectedExhib ? (
          <motion.div 
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-7xl mx-auto space-y-20"
          >
            <div className="text-center space-y-6">
              <span className="text-[12px] tracking-[0.5em] opacity-60 uppercase font-sans">Special Exhibition</span>
              <h1 className="text-5xl md:text-6xl font-serif">흐름의 선율</h1>
              <p className="text-base tracking-[0.2em] opacity-50 font-sans uppercase">The Melody of Flow: 시간의 무늬를 감상하다</p>
              <div className="w-12 h-[1px] bg-[#1A1A1A]/20 mx-auto mt-8" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {exhibitions.map((exhib, i) => (
                <motion.div
                  key={exhib.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedExhib(exhib.id)}
                  className="gallery-card p-10 flex flex-col items-center text-center space-y-8 cursor-pointer group hover:bg-white transition-all"
                >
                  <div className="relative w-32 h-32 opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">
                    <Image src={exhib.icon} alt={exhib.title} fill className="object-contain" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-serif">{exhib.title}</h2>
                    <span className="text-[11px] tracking-widest opacity-60 uppercase font-sans block">{exhib.subtitle}</span>
                    <p className="text-[13px] leading-relaxed opacity-60 font-light mt-4 px-2">{exhib.desc}</p>
                  </div>
                  <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4 opacity-40" />
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center pt-20">
              <p className="text-[10px] tracking-[0.3em] opacity-20 uppercase">천명갤러리가 큐레이션한 시간의 예술</p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="result"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-32"
          >
            <div className="flex justify-between items-end border-b border-[#1A1A1A]/5 pb-12">
              <div className="space-y-4">
                <button 
                  onClick={() => setSelectedExhib(null)}
                  className="text-[10px] tracking-widest opacity-40 hover:opacity-100 uppercase font-sans flex items-center gap-2 mb-8"
                >
                  <ArrowRight className="w-3 h-3 rotate-180" /> 돌아가기
                </button>
                <h2 className="text-4xl font-serif">도슨트 리포트: 흐름의 해석</h2>
                <p className="text-[11px] tracking-[0.4em] opacity-40 uppercase font-sans">Interpretation of the Current Flow</p>
              </div>
              <div className="stamp-effect mb-2">天命 GALLERY 認</div>
            </div>

            {/* Saju Flow Graph (Sumi-e Style Line) */}
            <div className="space-y-12">
              <div className="flex justify-between items-center px-4">
                <span className="text-[10px] tracking-widest opacity-40 uppercase">운의 흐름 (The Line)</span>
                <div className="flex gap-4 text-[9px] tracking-widest opacity-30 uppercase">
                  <span>Spring</span><span>Summer</span><span>Autumn</span><span>Winter</span>
                </div>
              </div>
              <div className="relative h-64 w-full bg-white/30 backdrop-blur-sm gallery-card overflow-hidden">
                <svg viewBox="0 0 1000 200" className="w-full h-full preserve-3d">
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    d="M 0 150 Q 250 50 500 120 T 1000 30"
                    fill="none"
                    stroke="#1A1A1A"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="opacity-60"
                  />
                  {/* Diffused areas (Static SVG for brush effect) */}
                  <circle cx="250" cy="50" r="15" fill="url(#grad-brush)" className="opacity-20" />
                  <circle cx="500" cy="120" r="20" fill="url(#grad-brush)" className="opacity-10" />
                  <defs>
                    <radialGradient id="grad-brush">
                      <stop offset="0%" stopColor="#1A1A1A" />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-around pointer-events-none px-20">
                  <div className="w-[1px] h-full bg-[#1A1A1A]/5" />
                  <div className="w-[1px] h-full bg-[#1A1A1A]/5" />
                  <div className="w-[1px] h-full bg-[#1A1A1A]/5" />
                </div>
              </div>
            </div>

            <div className="space-y-12 max-w-2xl mx-auto text-center">
              <h3 className="text-xl font-serif italic opacity-70">"올해의 풍경에 대하여"</h3>
              <div className="space-y-8 text-sm leading-relaxed opacity-60 font-light">
                <p>
                  2026년은 당신에게 '새로운 씨앗을 심는 시기'입니다. 
                  기존의 울타리를 넘어서 새로운 땅으로 뿌리를 뻗는 붓놀림이 느껴집니다.
                </p>
                <p>
                  상반기에는 선이 힘차게 솟구치며 에너지가 집중되나, 하단에 번지는 묵색처럼 
                  서두르기보다는 내실을 기하는 것이 중요합니다.
                </p>
              </div>
              <div className="pt-20">
                <button className="w-full max-w-xs mx-auto bg-[#1A1A1A] text-[#F8F5F0] py-5 flex items-center justify-center gap-4 hover:bg-black transition-all">
                  <Download className="w-4 h-4" />
                  <span className="font-sans text-[11px] tracking-[0.4em] uppercase">특별전 리포트 소장</span>
                </button>
              </div>
            </div>

            <div className="pt-20 text-center opacity-20">
              <p className="text-[9px] tracking-[0.2em] uppercase">Your fate is a masterpiece in progress.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
