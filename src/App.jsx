import { useState, useEffect } from 'react'
import { useTheme } from './hooks/useTheme'
import { useBrand } from './hooks/useBrand'
import { brand as fallbackBrand } from './data/content'
import Header from './components/Header'
import Hero from './components/Hero'
import Partners from './components/Partners'
import Products from './components/Products'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Gallery from './components/Gallery'
import ProTeam from './components/ProTeam'
import Testimonials from './components/Testimonials'
import About from './components/About'
import Club from './components/Club'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'
import Admin from './components/Admin'
import Chatbot from './components/Chatbot'

export default function App() {
  const { theme, toggle } = useTheme()
  const [showAdmin, setShowAdmin] = useState(false)
  const [chatbotOpen, setChatbotOpen] = useState(false)
  const { brand: dbBrand } = useBrand()
  const brand = dbBrand || fallbackBrand

  useEffect(() => {
    const handleHashChange = () => {
      setShowAdmin(window.location.hash === '#/admin')
    }
    window.addEventListener('hashchange', handleHashChange)
    handleHashChange()
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (showAdmin) {
    return <Admin />
  }

  return (
    <>
      <Header brand={brand} theme={theme} toggle={toggle} />
      <main>
        <Hero brand={brand} />
        <Partners />
        <Products brand={brand} />
        <Services />
        <Portfolio />
        <Gallery />
        <ProTeam />
        <Testimonials />
        <About brand={brand} />
        <Club />
        <Contact brand={brand} />
      </main>
      <Footer brand={brand} />
      <FloatingContact brand={brand} chatbotOpen={chatbotOpen} setChatbotOpen={setChatbotOpen} />
      <Chatbot brand={brand} open={chatbotOpen} setOpen={setChatbotOpen} />
    </>
  )
}
