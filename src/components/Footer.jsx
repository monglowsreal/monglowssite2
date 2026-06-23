import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Phone, Mail, AtSign } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <div className="relative z-50 bg-[#05050A] rounded-t-[4rem] w-full flex flex-col items-center overflow-hidden">
      
      <div className="w-full max-w-4xl px-8 py-32 flex flex-col items-center text-center">
        <h2 className="font-sans font-bold text-4xl md:text-6xl text-ghost tracking-tight mb-8">
          {t('footTitle')}
        </h2>
        <p className="font-mono text-ghost/60 mb-12 max-w-md">
          {t('footDesc')}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-16">
          <a 
            href="mailto:tahirkemalsariyildiz.32@gmail.com"
            className="relative overflow-hidden group px-10 py-4 rounded-full font-sans font-bold text-base text-background bg-accent hover:scale-[1.03] transition-all duration-300 flex items-center gap-3"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Mail size={18} />
              {t('footBtn')}
            </span>
            <div className="absolute inset-0 bg-ghost translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
          </a>

          <a 
            href="tel:+905529670404"
            className="flex items-center gap-2 px-6 py-4 rounded-full font-mono text-sm border border-ghost/20 text-ghost hover:border-accent hover:text-accent transition-colors duration-300"
          >
            <Phone size={16} />
            +90 552 967 04 04
          </a>
        </div>

        {/* Contact Form */}
        <form 
          action="https://formsubmit.co/tahirkemalsariyildiz.32@gmail.com" 
          method="POST" 
          className="w-full max-w-md flex flex-col gap-4 mb-8"
        >
          <input type="hidden" name="_captcha" value="false" />

          <input 
            type="text" 
            name="name" 
            required 
            placeholder={t('formName')} 
            className="w-full px-6 py-4 rounded-xl bg-background/50 border border-ghost/10 text-ghost placeholder:text-ghost/40 focus:outline-none focus:border-accent transition-colors"
          />
          <input 
            type="email" 
            name="email" 
            required 
            placeholder={t('formEmail')} 
            className="w-full px-6 py-4 rounded-xl bg-background/50 border border-ghost/10 text-ghost placeholder:text-ghost/40 focus:outline-none focus:border-accent transition-colors"
          />
          <textarea 
            name="message" 
            required 
            rows="4"
            placeholder={t('formMessage')} 
            className="w-full px-6 py-4 rounded-xl bg-background/50 border border-ghost/10 text-ghost placeholder:text-ghost/40 focus:outline-none focus:border-accent transition-colors resize-none"
          ></textarea>
          
          <button 
            type="submit"
            className="w-full relative overflow-hidden group px-6 py-4 rounded-xl font-sans font-bold text-base text-background bg-accent hover:scale-[1.02] transition-all duration-300"
          >
            <span className="relative z-10">{t('formSubmit')}</span>
            <div className="absolute inset-0 bg-ghost translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
          </button>
        </form>
      </div>

      <footer className="w-full border-t border-ghost/10 py-12 px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-sans font-bold text-xl text-ghost tracking-tight">Tahir Kemal Sarıyıldız</span>
          <span className="font-mono text-xs text-ghost/40">{t('footRole')}</span>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm font-medium text-ghost/60">
          <a href="mailto:tahirkemalsariyildiz.32@gmail.com" className="hover:text-accent transition-colors flex items-center gap-2">
            <Mail size={16} />
            tahirkemalsariyildiz.32@gmail.com
          </a>
          <a href="https://instagram.com/tahirkemalsariyildiz" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors flex items-center gap-2">
            <AtSign size={16} />
            Instagram
          </a>
        </div>

        <div className="flex items-center gap-3 bg-background/50 px-4 py-2 rounded-full border border-ghost/10">
          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>
          <span className="font-mono text-[10px] text-ghost/70 uppercase tracking-widest">{t('footStatus')}</span>
        </div>
      </footer>
    </div>
  );
}
