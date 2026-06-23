import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef(null);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: {
          targets: navRef.current,
          className: 'bg-background/80 backdrop-blur-xl border-accent/20 border text-accent'
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav ref={navRef} className="flex items-center justify-between px-6 py-3 rounded-full w-full max-w-5xl transition-all duration-300 border border-transparent text-ghost">
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); }} className="flex items-center">
          <img src="/tks_logo.png" alt="TKS Logo" className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover hover:scale-105 transition-transform duration-300" />
        </a>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#features" className="hover:-translate-y-[1px] transition-transform">{t('navFeatures')}</a>
          <a href="#projects" className="hover:-translate-y-[1px] transition-transform">{t('navProjects')}</a>
          <a href="#philosophy" className="hover:-translate-y-[1px] transition-transform">{t('navPhilosophy')}</a>
          <a href="#protocol" className="hover:-translate-y-[1px] transition-transform">{t('navProtocol')}</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLang(lang === 'en' ? 'tr' : 'en')}
            className="font-mono text-xs font-bold px-2 py-1 border border-ghost/20 rounded hover:border-accent hover:text-accent transition-colors"
          >
            {lang === 'en' ? 'TR' : 'EN'}
          </button>
          
          <a 
            href="mailto:tahirkemalsariyildiz.32@gmail.com" 
            className="hidden sm:flex relative overflow-hidden group px-5 py-2 rounded-full font-medium text-sm border border-accent text-accent hover:text-background transition-colors"
          >
            <span className="relative z-10">{t('navContact')}</span>
            <div className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0"></div>
          </a>
        </div>
      </nav>
    </div>
  );
}
