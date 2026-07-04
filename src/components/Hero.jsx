import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const containerRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2
      });
      gsap.from('.hero-cta', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.6
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100dvh] flex flex-col justify-end p-8 md:p-16 overflow-hidden">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 z-0 w-full h-full object-cover opacity-40 mix-blend-screen"
      >
        <source src="/core.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-start gap-6">
        <h1 className="flex flex-col leading-[1.1]">
          <span className="hero-text font-sans font-bold text-3xl md:text-5xl lg:text-6xl text-ghost tracking-tight">
            {t('heroHeadline1')}
          </span>
          <span className="hero-text font-drama italic text-6xl md:text-8xl lg:text-[10rem] text-accent mt-2">
            {t('heroHeadline2')}
          </span>
        </h1>
        
        <p className="hero-text font-mono text-sm md:text-base text-ghost/80 max-w-2xl mt-4 leading-relaxed">
          {t('heroSubtext')}
        </p>
        
        <a 
          href="#projects"
          className="hero-cta mt-8 relative overflow-hidden group px-8 py-4 rounded-full font-sans font-bold text-background bg-accent hover:scale-[1.03] transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] flex items-center gap-2"
        >
          <span className="relative z-10">{t('heroBtn')}</span>
          <div className="absolute inset-0 bg-ghost translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0"></div>
        </a>
      </div>
    </section>
  );
}
