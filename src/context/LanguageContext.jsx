import React, { createContext, useContext, useState } from 'react';

const dictionary = {
  en: {
    // Navbar
    navFeatures: 'Services',
    navProjects: 'Showcase',
    navPhilosophy: 'Philosophy',
    navProtocol: 'Process',
    navContact: 'Contact Me',

    // Hero
    heroHeadline1: 'AI Expert &',
    heroHeadline2: 'Developer.',
    heroSubtext: "I build sophisticated websites, intelligent automations, scalable SaaS platforms, and native mobile applications powered by Artificial Intelligence. Let's transform your complex business challenges into fast, smart, and highly scalable digital solutions.",
    heroBtn: 'View my work',

    // Features / Services
    featTitle1: 'Intelligent',
    featTitle2: 'Systems.',
    featCard1Title: 'Web & SaaS Apps',
    featCard1Desc: 'Custom high-performance platforms engineered from scratch to digitize your entire business workflow and maximize online presence.',
    featCard1Array: ['Next.js', 'React', 'AI Integrated'],
    featCard2Title: 'AI Automations',
    featCard2Desc: 'Automate repetitive business tasks, streamline operations, and save hundreds of manual hours every month with custom AI agents.',
    featCard2Term: 'Workflow analysis complete... AI Agents deployed... 100+ hours saved monthly...',
    featCard3Title: 'Mobile Applications',
    featCard3Desc: 'Smart, modern, and highly responsive mobile applications designed to connect you instantly with your customers, anywhere in the world.',
    featCard3Btn: 'LAUNCH',

    // Projects / Showcase
    projTitle1: 'AI Powered',
    projTitle2: 'Showcase.',
    proj1Name: 'Custom AI Assistants',
    proj1Desc: '24/7 automated customer support bots',
    proj2Name: 'Workflow Automation',
    proj2Desc: 'Sales & marketing autopilot systems',
    proj3Name: 'Scalable SaaS Apps',
    proj3Desc: 'Modern web-based software solutions',
    proj4Name: 'Enterprise Data Analysis',
    proj4Desc: 'AI-driven reporting and insights',

    // Philosophy
    philText1: 'Most agencies build static tools that become obsolete.',
    philText2: 'I build intelligent, ever-evolving',
    philText3: 'systems that actively work to scale your business.',

    // Protocol / Process
    protCard1Title: '1. Analysis & Strategy',
    protCard1Desc: 'Deep-dive into understanding your core business needs, target audience, and operational bottlenecks. We plan exactly how AI can aggressively scale your operations.',
    protCard2Title: '2. Smart Development',
    protCard2Desc: 'Rapidly engineering your SaaS, web, or mobile application using the most advanced AI frameworks and scalable cloud architectures available today.',
    protCard3Title: '3. Launch & Automate',
    protCard3Desc: 'Seamlessly deploying the final system to production, rigorously testing it, and fully automating your most critical day-to-day workflows.',

    // Footer
    footTitle: 'Ready to build?',
    footDesc: 'Open a direct channel to discuss how AI can transform your business. Reach out via email, phone, or social media.',
    footBtn: 'Start a Project',
    footRole: 'AI Expert & App Developer',
    footStatus: 'Ready for Deployment'
  },
  tr: {
    // Navbar
    navFeatures: 'Hizmetler',
    navProjects: 'Portfolyo',
    navPhilosophy: 'Felsefe',
    navProtocol: 'Süreç',
    navContact: 'İletişime Geç',

    // Hero
    heroHeadline1: 'Yapay Zeka Uzmanı &',
    heroHeadline2: 'Geliştirici.',
    heroSubtext: "Yapay zeka gücüyle işletmeniz için gelişmiş web siteleri, akıllı otomasyonlar, ölçeklenebilir SaaS platformları ve yerel mobil uygulamalar geliştiriyorum. Karmaşık iş süreçlerinizi hızlı, akıllı ve yüksek performanslı dijital çözümlere dönüştürelim.",
    heroBtn: 'Çalışmalarımı incele',

    // Features / Services
    featTitle1: 'Akıllı',
    featTitle2: 'Sistemler.',
    featCard1Title: 'Web & SaaS Uygulamaları',
    featCard1Desc: 'İş akışlarınızı tamamen dijitalleştirmek ve çevrimiçi varlığınızı en üst düzeye çıkarmak için sıfırdan tasarlanmış yüksek performanslı özel platformlar.',
    featCard1Array: ['Next.js', 'React', 'AI Entegre'],
    featCard2Title: 'Yapay Zeka Otomasyonları',
    featCard2Desc: 'Tekrar eden manuel işlerinizi otomatikleştirin, operasyonlarınızı hızlandırın ve özel AI ajanlarıyla her ay yüzlerce saat tasarruf edin.',
    featCard2Term: 'İş akışı analizi tamamlandı... AI Ajanları devrede... Aylık 100+ saat tasarruf edildi...',
    featCard3Title: 'Mobil Uygulamalar',
    featCard3Desc: 'Müşterilerinizle dünyanın her yerinde anında bağlantı kurmanızı sağlamak için tasarlanmış akıllı, modern ve yüksek duyarlılığa sahip mobil uygulamalar.',
    featCard3Btn: 'YAYINLA',

    // Projects / Showcase
    projTitle1: 'Yapay Zeka Destekli',
    projTitle2: 'Projeler.',
    proj1Name: 'Özel Yapay Zeka Asistanları',
    proj1Desc: '7/24 hizmet veren müşteri destek botları',
    proj2Name: 'İş Akışı Otomasyonu',
    proj2Desc: 'Satış ve pazarlama otopilot sistemleri',
    proj3Name: 'Ölçeklenebilir SaaS',
    proj3Desc: 'Modern web tabanlı yazılım çözümleri',
    proj4Name: 'Kurumsal Veri Analizi',
    proj4Desc: 'Yapay zeka destekli raporlama',

    // Philosophy
    philText1: 'Çoğu ajans zamanla eskiyen statik araçlar inşa eder.',
    philText2: 'Ben işletmenizi büyütmek için çalışan',
    philText3: 'akıllı ve sürekli gelişen sistemler inşa ediyorum.',

    // Protocol / Process
    protCard1Title: '1. Analiz & Strateji',
    protCard1Desc: 'Temel iş ihtiyaçlarınızı, hedef kitlenizi ve operasyonel darboğazlarınızı derinlemesine analiz ediyoruz. Yapay zekanın işinizi nasıl ölçeklendirebileceğini tam olarak planlıyoruz.',
    protCard2Title: '2. Akıllı Geliştirme',
    protCard2Desc: 'SaaS, web veya mobil uygulamanızı günümüzün en gelişmiş yapay zeka altyapıları ve ölçeklenebilir bulut mimarilerini kullanarak hızla inşa ediyoruz.',
    protCard3Title: '3. Yayına Alma & Otomasyon',
    protCard3Desc: 'Nihai sistemi sorunsuz bir şekilde canlıya alıyor, titizlikle test ediyor ve en kritik günlük iş akışlarınızı tamamen otomatikleştiriyoruz.',

    // Footer
    footTitle: 'Başlamaya hazır mısınız?',
    footDesc: 'Yapay zekanın işletmenizi nasıl dönüştürebileceğini tartışmak için doğrudan bir iletişim kanalı açın. Telefon, e-posta veya sosyal medya üzerinden ulaşabilirsiniz.',
    footBtn: 'Projeyi Başlat',
    footRole: 'Yapay Zeka Uzmanı & Geliştirici',
    footStatus: 'Geliştirmeye Hazır'
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('tr');

  const t = (key) => dictionary[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
