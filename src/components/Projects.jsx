import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';

export default function Projects() {
  const containerRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const projects = [
    { name: t('proj1Name'), desc: t('proj1Desc'), video: '/city.mp4' },
    { name: t('proj2Name'), desc: t('proj2Desc'), video: '/neural.mp4' },
    { name: t('proj3Name'), desc: t('proj3Desc'), video: '/robotic.mp4' },
    { name: t('proj4Name'), desc: t('proj4Desc'), video: '/cubes.mp4' }
  ];

  return (
    <section id="projects" ref={containerRef} className="py-32 px-4 w-full flex flex-col items-center bg-[#05050A]">
      <div className="w-full max-w-6xl">
        <h2 className="font-sans font-bold text-3xl md:text-5xl text-ghost mb-16 tracking-tight">
          {t('projTitle1')} <span className="text-accent italic font-drama">{t('projTitle2')}</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <div key={i} className="project-card group relative bg-graphite/30 rounded-[2.5rem] overflow-hidden border border-ghost/5 hover:border-accent/30 transition-colors duration-500 cursor-pointer">
              <div className="relative h-72 w-full overflow-hidden bg-background">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] opacity-70"
                >
                  <source src={p.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-90" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-sans font-bold text-2xl text-ghost mb-2">{p.name}</h3>
                <p className="font-mono text-sm text-ghost/60">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
