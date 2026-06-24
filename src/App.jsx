import { useTheme } from './hooks/useTheme'
import Header from './components/Header'
import Hero from './components/Hero'
import Partners from './components/Partners'
import Products from './components/Products'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import ProTeam from './components/ProTeam'
import Testimonials from './components/Testimonials'
import About from './components/About'
import News from './components/News'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'

export default function App() {
  const { theme, toggle } = useTheme()
  return (
    <>
      <Header theme={theme} toggle={toggle} />
      <main>
        <Hero />
        <Partners />
        <Products />
        <Services />
        <Portfolio />
        <ProTeam />
        <Testimonials />
        <About />
        <News />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
