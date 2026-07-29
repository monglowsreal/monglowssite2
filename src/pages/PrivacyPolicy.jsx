import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';

export default function PrivacyPolicy() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-background pt-32 pb-16 px-8 flex justify-center">
        <div className="w-full max-w-4xl flex flex-col gap-8 text-ghost">
          <h1 className="font-sans font-bold text-4xl md:text-5xl tracking-tight text-accent mb-4">
            {t('privacyPolicy')}
          </h1>
          
          {lang === 'tr' ? (
            <div className="font-mono text-sm md:text-base text-ghost/70 flex flex-col gap-6 leading-relaxed">
              <p>Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
              
              <section>
                <h2 className="font-sans font-bold text-xl text-ghost mb-3">1. Veri Toplama ve Kullanımı</h2>
                <p>Web sitemiz üzerinden (iletişim formu, demo talepleri, e-posta) sağladığınız kişisel veya kurumsal veriler, yalnızca size teklif sunmak, hizmetlerimizi sağlamak ve iletişim kurmak amacıyla KVKK ve GDPR standartlarına uygun olarak işlenmektedir.</p>
              </section>

              <section>
                <h2 className="font-sans font-bold text-xl text-ghost mb-3">2. Yapay Zeka Modellerinin Eğitimi ve Veri Gizliliği</h2>
                <p>Bizimle paylaştığınız projelere ait veriler, kaynak kodlar, iş modelleri veya kişisel bilgiler, <strong>açık yazılı izniniz olmadan</strong> hiçbir açık kaynaklı veya özel yapay zeka modelinin eğitilmesi (training/fine-tuning) amacıyla kullanılamaz ve üçüncü taraf AI sağlayıcılarına (OpenAI, Anthropic vb.) veri seti olarak aktarılamaz. Sistemlerimiz varsayılan olarak veri gizliliği (privacy-by-design) odaklı geliştirilir.</p>
              </section>

              <section>
                <h2 className="font-sans font-bold text-xl text-ghost mb-3">3. Veri Paylaşımı ve Saklama</h2>
                <p>Verileriniz, yasal zorunluluklar haricinde hiçbir üçüncü taraf kişi, kurum veya reklam şirketiyle paylaşılmaz. Verileriniz yalnızca iş ilişkisi süresince veya kanuni saklama süreleri boyunca güvenli sunucularda muhafaza edilir.</p>
              </section>

              <section>
                <h2 className="font-sans font-bold text-xl text-ghost mb-3">4. Haklarınız</h2>
                <p>Kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, eksik veya yanlış işlenmişse düzeltilmesini isteme ve silinmesini talep etme hakkına sahipsiniz. Talepleriniz için bizimle tahirkemalsariyildiz.32@gmail.com adresi üzerinden iletişime geçebilirsiniz.</p>
              </section>
            </div>
          ) : (
            <div className="font-mono text-sm md:text-base text-ghost/70 flex flex-col gap-6 leading-relaxed">
              <p>Last Updated: {new Date().toLocaleDateString('en-US')}</p>
              
              <section>
                <h2 className="font-sans font-bold text-xl text-ghost mb-3">1. Data Collection and Usage</h2>
                <p>Personal or corporate data provided through our website (contact forms, demo requests, email) is processed solely for the purpose of providing quotes, delivering services, and communicating with you, in accordance with GDPR standards.</p>
              </section>

              <section>
                <h2 className="font-sans font-bold text-xl text-ghost mb-3">2. AI Model Training and Data Privacy</h2>
                <p>Data, source codes, business models, or personal information regarding the projects you share with us <strong>will not be used</strong> to train or fine-tune any open-source or proprietary AI models without your explicit written consent. Your data is never transferred to third-party AI providers (OpenAI, Anthropic, etc.) as training datasets. Our systems are built with a privacy-by-design approach by default.</p>
              </section>

              <section>
                <h2 className="font-sans font-bold text-xl text-ghost mb-3">3. Data Sharing and Retention</h2>
                <p>Your data is not shared with any third-party individuals, institutions, or advertising companies, except under legal obligations. Your data is stored on secure servers only for the duration of the business relationship or legal retention periods.</p>
              </section>

              <section>
                <h2 className="font-sans font-bold text-xl text-ghost mb-3">4. Your Rights</h2>
                <p>You have the right to request access to, correction of, or deletion of your personal data. For any requests regarding your data privacy, please contact us at tahirkemalsariyildiz.32@gmail.com.</p>
              </section>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
