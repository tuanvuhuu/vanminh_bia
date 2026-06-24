import { useState, useEffect } from 'react'
import { useTheme } from './hooks/useTheme'
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

export default function App() {
  const { theme, toggle } = useTheme()
  const [showAdmin, setShowAdmin] = useState(false)

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
      <Header theme={theme} toggle={toggle} />
      <main>
        <Hero />
        <Partners />
        <Products />
        <Services />
        <Portfolio />
        <Gallery />
        <ProTeam />
        <Testimonials />
        <About />
        <Club />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
