import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import Chatbot from './components/Chatbot'

// Pages
import Home from './pages/Home'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfUse from './pages/TermsOfUse'

function App() {
  useEffect(() => {
    // Disable browser scroll restoration and force scroll to top on mount
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <LanguageProvider>
      <main className="w-full min-h-screen bg-background">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gizlilik-politikasi" element={<PrivacyPolicy />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/kullanim-kosullari" element={<TermsOfUse />} />
            <Route path="/terms" element={<TermsOfUse />} />
          </Routes>
        </BrowserRouter>
        <Chatbot />
      </main>
    </LanguageProvider>
  )
}

export default App
