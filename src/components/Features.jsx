import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';

export default function Features() {
  const containerRef = useRef(null);
  const { t } = useLanguage();
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={containerRef} className="py-32 px-4 w-full flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <h2 className="font-sans font-bold text-3xl md:text-5xl text-ghost mb-16 tracking-tight">
          {t('featTitle1')} <span className="text-accent italic font-drama">{t('featTitle2')}</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <DiagnosticShuffler />
          <TelemetryTypewriter />
          <CursorScheduler />
        </div>
      </div>
    </section>
  );
}

function DiagnosticShuffler() {
  const { t } = useLanguage();
  const [cards, setCards] = useState(t('featCard1Array'));
  
  // Re-sync on language change
  useEffect(() => {
    setCards(t('featCard1Array'));
  }, [t]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        if(!prev || prev.length === 0) return prev;
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="feature-card bg-graphite/40 border border-ghost/10 rounded-[2.5rem] p-8 flex flex-col min-h-[400px] relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
      <h3 className="font-sans font-bold text-xl text-ghost mb-2">{t('featCard1Title')}</h3>
      <p className="font-mono text-sm text-ghost/60 mb-8">{t('featCard1Desc')}</p>
      
      <div className="relative flex-1 flex flex-col justify-end pb-4">
        {cards?.map((card, i) => (
          <div 
            key={card + i}
            className="absolute left-0 right-0 bg-background border border-accent/30 rounded-2xl p-4 flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              bottom: `${(2 - i) * 20}px`,
              scale: 1 - (i * 0.05),
              opacity: 1 - (i * 0.2),
              zIndex: 10 - i
            }}
          >
            <span className="font-mono text-xs text-ghost">{card}</span>
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TelemetryTypewriter() {
  const { t } = useLanguage();
  const text = t('featCard2Term');
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    let i = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) i = 0;
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="feature-card bg-graphite/40 border border-ghost/10 rounded-[2.5rem] p-8 flex flex-col min-h-[400px] relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
      <h3 className="font-sans font-bold text-xl text-ghost mb-2">{t('featCard2Title')}</h3>
      <p className="font-mono text-sm text-ghost/60 mb-8">{t('featCard2Desc')}</p>
      
      <div className="mt-auto bg-[#05050A] rounded-2xl p-6 font-mono text-xs text-accent h-[150px] flex items-start border border-ghost/5">
        <p className="leading-relaxed">
          <span className="text-ghost/40 mr-2">&gt;</span>
          {displayed}
          <span className="inline-block w-2 h-3 ml-1 bg-accent animate-pulse"></span>
        </p>
      </div>
    </div>
  );
}

function CursorScheduler() {
  const { t } = useLanguage();
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [activeIdx, setActiveIdx] = useState(2);
  const cursorRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      tl.to(cursorRef.current, { x: 90, y: 30, duration: 1, ease: 'power2.inOut' })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1, onComplete: () => setActiveIdx(2) })
        .to(cursorRef.current, { x: 180, y: 120, duration: 1, ease: 'power2.inOut', delay: 0.5 })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to(cursorRef.current, { x: 0, y: 0, opacity: 0, duration: 0.5, onComplete: () => setActiveIdx(-1) })
        .set(cursorRef.current, { opacity: 1 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="feature-card bg-graphite/40 border border-ghost/10 rounded-[2.5rem] p-8 flex flex-col min-h-[400px] relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
      <h3 className="font-sans font-bold text-xl text-ghost mb-2">{t('featCard3Title')}</h3>
      <p className="font-mono text-sm text-ghost/60 mb-8">{t('featCard3Desc')}</p>
      
      <div className="mt-auto relative bg-background rounded-2xl p-6 border border-ghost/5">
        <div className="flex justify-between mb-8">
          {days.map((d, i) => (
            <div key={i} className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-[10px] transition-colors ${i === activeIdx ? 'bg-accent text-background' : 'bg-graphite text-ghost/50'}`}>
              {d}
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <div className={`px-4 py-1.5 rounded-full text-[10px] font-mono border transition-colors ${activeIdx === 2 ? 'border-accent text-accent' : 'border-ghost/20 text-ghost/50'}`}>
            {t('featCard3Btn')}
          </div>
        </div>

        <svg ref={cursorRef} className="absolute top-4 left-4 w-5 h-5 drop-shadow-lg z-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 3.21V20.8C5.5 21.45 6.27 21.79 6.75 21.36L11.44 17.11H17.5C18.05 17.11 18.5 16.66 18.5 16.11V15.75L5.5 3.21Z" fill="#F0EFF4"/>
          <path d="M5.5 3.21V20.8C5.5 21.45 6.27 21.79 6.75 21.36L11.44 17.11H17.5C18.05 17.11 18.5 16.66 18.5 16.11V15.75L5.5 3.21Z" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
