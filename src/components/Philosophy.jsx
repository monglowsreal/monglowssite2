import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.phil-line', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={sectionRef} className="relative py-40 w-full bg-background overflow-hidden flex justify-center">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.03] mix-blend-screen"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2070&auto=format&fit=crop')" }}
      />
      
      <div className="relative z-10 w-full max-w-4xl px-8 flex flex-col gap-16">
        <p className="phil-line font-mono text-sm md:text-base text-ghost/50 uppercase tracking-widest border-l border-accent pl-4">
          {t('philText1')}
        </p>
        
        <h2 className="phil-line leading-[1.1]">
          <span className="block font-sans font-bold text-3xl md:text-4xl text-ghost">
            {t('philText2')}
          </span>
          <span className="block font-drama italic text-5xl md:text-7xl lg:text-8xl text-accent mt-4">
            {t('philText3')}
          </span>
        </h2>
      </div>
    </section>
  );
}
