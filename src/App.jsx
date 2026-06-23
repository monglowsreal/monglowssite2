import React from 'react'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Projects from './components/Projects'
import Philosophy from './components/Philosophy'
import Protocol from './components/Protocol'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'

function App() {
  return (
    <LanguageProvider>
      <main className="w-full min-h-screen bg-background">
        <Navbar />
        <Hero />
        <Features />
        <Projects />
        <Philosophy />
        <Protocol />
        <Footer />
        <Chatbot />
      </main>
    </LanguageProvider>
  )
}

export default App
