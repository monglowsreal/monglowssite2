import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Protocol() {
  const containerRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          pin: true,
          pinSpacing: false,
          end: 'max'
        });
      });

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.9,
          filter: 'blur(20px)',
          opacity: 0.5,
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="protocol" className="relative w-full bg-background">
      <Card 
        index="01" 
        title={t('protCard1Title')} 
        desc={t('protCard1Desc')} 
        bg="bg-[#0A0A14]"
        Visual={SvgHelix}
        zIndex={10}
      />
      <Card 
        index="02" 
        title={t('protCard2Title')} 
        desc={t('protCard2Desc')} 
        bg="bg-[#0F0F1A]"
        Visual={SvgLaserGrid}
        zIndex={20}
      />
      <Card 
        index="03" 
        title={t('protCard3Title')} 
        desc={t('protCard3Desc')} 
        bg="bg-[#141422]"
        Visual={SvgWaveform}
        zIndex={30}
      />
    </section>
  );
}

function Card({ index, title, desc, bg, Visual, zIndex }) {
  return (
    <div 
      className={`protocol-card relative w-full h-[100dvh] ${bg} flex flex-col md:flex-row items-center justify-center p-8 md:p-24 overflow-hidden border-t border-ghost/5`}
      style={{ zIndex }}
    >
      <div className="flex-1 flex flex-col justify-center max-w-xl z-10">
        <span className="font-mono text-accent text-lg mb-4">[{index}]</span>
        <h2 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-ghost mb-6 tracking-tight">{title}</h2>
        <p className="font-mono text-sm md:text-base text-ghost/70 leading-relaxed">{desc}</p>
      </div>
      <div className="flex-1 flex items-center justify-center h-full w-full max-w-lg mt-12 md:mt-0 opacity-80 z-0">
        <Visual />
      </div>
    </div>
  );
}

function SvgHelix() {
  const ref = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(ref.current, { rotation: 360, duration: 20, ease: 'linear', repeat: -1 });
    });
    return () => ctx.revert();
  }, []);
  return (
    <svg ref={ref} viewBox="0 0 100 100" className="w-full h-full max-h-[300px] stroke-accent opacity-50" fill="none" strokeWidth="0.5">
      <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
      <circle cx="50" cy="50" r="30" strokeDasharray="2 4" />
      <circle cx="50" cy="50" r="20" />
      <path d="M50 10 L50 90 M10 50 L90 50" strokeWidth="0.2" />
    </svg>
  );
}

function SvgLaserGrid() {
  const lineRef = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current, { y: 10 }, { y: 90, duration: 2, ease: 'linear', repeat: -1, yoyo: true });
    });
    return () => ctx.revert();
  }, []);
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full max-h-[300px] opacity-60">
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="0.5" fill="#F0EFF4" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#grid)" />
      <line ref={lineRef} x1="0" y1="10" x2="100" y2="10" stroke="#7B61FF" strokeWidth="1" filter="drop-shadow(0 0 2px #7B61FF)" />
    </svg>
  );
}

function SvgWaveform() {
  const pathRef = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(pathRef.current, { strokeDashoffset: -200, duration: 3, ease: 'linear', repeat: -1 });
    });
    return () => ctx.revert();
  }, []);
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full max-h-[300px] stroke-accent opacity-70" fill="none" strokeWidth="1">
      <path 
        ref={pathRef}
        strokeDasharray="200"
        strokeDashoffset="0"
        d="M0,50 L40,50 L50,20 L60,80 L70,50 L200,50" 
      />
      <path d="M0,50 L200,50" stroke="#F0EFF4" strokeWidth="0.2" opacity="0.2" />
    </svg>
  );
}
