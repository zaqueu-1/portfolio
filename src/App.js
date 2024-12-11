import React, { useEffect, useState, useRef } from "react"
import Background from "./components/Background/Background"
import { BackgroundStyle } from "./components/Background/Background.styles"
import Header from "./components/Header/Header"
import Sidebar from "./components/Sidebar/Sidebar"
import About from "./components/About/About"
import Experiences from "./components/Experiences/Experiences"
import Footer from "./components/Footer/Footer"
import { GlobalStyle, LanguageControlMain, LanguageTogglerMain } from "./globals.styles"
import AOS from "aos"
import "aos/dist/aos.css"
import { MdLanguage } from "react-icons/md"


function App() {
  useEffect(() => {
    AOS.init()
    let userLang = navigator.language || navigator.userLanguage
    if (userLang !== "pt-BR") setLang(false)
  }, [])

  const [lang, setLang] = useState(true)
  const languageHandler = (boolean) => setLang(boolean)

  const headerSection = useRef(null)
  const aboutSection = useRef(null)
  const contactsSection = useRef(null)
  const experiencesSection = useRef(null)

  const scrollToSection = (section) => {
    switch (section) {
      case "header":
        window.scrollTo({ top: headerSection.current.offsetTop-50, behavior: "smooth" })
        break
      case "about":
        window.scrollTo({ top: aboutSection.current.offsetTop-50, behavior: "smooth" })
        break
      case "experiences":
        window.scrollTo({ top: experiencesSection.current.offsetTop, behavior: "smooth" })
        break 
      case "contact":
        window.scrollTo({ top: contactsSection.current.offsetTop, behavior: "smooth" })
        break
      default:
        break
    }
  }

  return (
      <>
        <BackgroundStyle />
        <Background />
        <GlobalStyle />
        <Sidebar
          onGetLang={languageHandler}
          onGetScrollSection={scrollToSection}
          lang={lang}/>
        <LanguageControlMain data-tip={lang ? "English" : "Português"} onClick={() => setLang(!lang)}>
          <LanguageTogglerMain>
            <MdLanguage style={{ marginRight: ".5rem" }} />
            {lang ? "View in English" : "Ver em Português"}
          </LanguageTogglerMain>
        </LanguageControlMain>
        <section ref={headerSection}><Header lang={lang} /></section>
        <section 
          data-aos={"fade-left"} 
          data-aos-duration={"1500"}  
          ref={aboutSection}
        >
          <About lang={lang} />
        </section>
        <section ref={experiencesSection} data-aos={"fade-right"} data-aos-duration={"1500"}><Experiences lang={lang} /></section>
        <section ref={contactsSection}><Footer lang={lang} onGetScrollSection={scrollToSection} /></section>
      </>
  )
}

export default App
