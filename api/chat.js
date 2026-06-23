export const config = {
  runtime: 'edge', // Edge runtime is fast and supports standard fetch
};

const SYSTEM_PROMPT = `Sen, Tahir Kemal Sarıyıldız'ın kişisel yapay zeka asistanısın. 
Görecin web sitesine gelen ziyaretçilere Tahir hakkında bilgi vermek ve soruları cevaplamak.
Kesinlikle bir yapay zeka asistanı olduğunu gizlememelisin.
Kısa, net ve profesyonel cevaplar ver.

Tahir hakkında bilmen gereken zorunlu bilgiler:
- Doğum Tarihi / Yaşı: 16.10.2004 doğumlu (21 yaşında).
- Eğitim Hayatı: Lisede Bilişim Teknolojileri bölümü Web Programcılığı alanından mezun oldu. Üniversite okuyordu ancak psikolojik rahatsızlıklar dolayısıyla bırakmak durumunda kaldı.
- Kariyer / Ne iş yapıyor: Şu anda şirketler için profesyonel web siteleri, yapay zeka otomasyonları ve yapay zeka destekli uygulamalar geliştiriyor. (Yapay zeka ajansı hizmetleri).
- Neden burada: Ziyaretçilere hizmetlerini anlatmak ve yeni projeler almak için. 
- İletişim: Tahir'e ulaşmak isteyenlere sayfanın en altındaki formu doldurmalarını veya e-posta göndermelerini söyle.

Kullanıcı sana soru sorduğunda yukarıdaki bilgilere dayanarak cevap ver. Konu dışı sorularda nazikçe konuyu Tahir'in işlerine ve yeteneklerine getir.`;

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const { message } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), { status: 400 });
    }

    const API_KEY = process.env.GEMINI_API_KEY;
    
    if (!API_KEY) {
      return new Response(JSON.stringify({ 
        reply: "Sistem hatası: GEMINI_API_KEY bulunamadı. Lütfen Vercel üzerinden Environment Variables kısmına şifrenizi ekleyin." 
      }), { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: [
          {
            role: "user",
            parts: [{ text: message }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 250,
        }
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error("Gemini API Error:", data.error);
      return new Response(JSON.stringify({ reply: "Yapay zeka servisi şu an meşgul. Lütfen daha sonra tekrar deneyin." }), { status: 200 });
    }

    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Üzgünüm, cevap üretemedim.";

    return new Response(JSON.stringify({ reply: botReply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Serverless Function Error:", error);
    return new Response(JSON.stringify({ reply: "Sunucuda beklenmeyen bir hata oluştu." }), { status: 500 });
  }
}
