import React, { useEffect, useState, useRef } from "react";
import Background from "./components/Background/Background";
import { BackgroundStyle } from "./components/Background/Background.styles";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import { GlobalStyle, LanguageControlMain, LanguageTogglerMain } from "./globals.styles";
import AOS from "aos";
import "aos/dist/aos.css";
import { MdLanguage } from "react-icons/md";


function App() {
  useEffect(() => {
    AOS.init();
    let userLang = navigator.language || navigator.userLanguage;
    if (userLang !== "pt-BR") setLang(false);
  }, []);

  const [lang, setLang] = useState(true);
  const languageHandler = (boolean) => setLang(boolean);

  const headerSection = useRef(null);
  const aboutSection = useRef(null);
  const projectsSection = useRef(null);
  const contactsSection = useRef(null);

  const scrollToSection = (section) => {
    if (section === "header") window.scrollTo({ top: headerSection.current.offsetTop, behavior: "smooth" });
    else if (section === "about") window.scrollTo({ top: aboutSection.current.offsetTop, behavior: "smooth" });
    else if (section === "projects") window.scrollTo({ top: projectsSection.current.offsetTop, behavior: "smooth" });
    else if (section === "contact") window.scrollTo({ top: contactsSection.current.offsetTop, behavior: "smooth" });
  };

  return (
      <div>
      <BackgroundStyle />
      <Background />
      <GlobalStyle />
      <Sidebar
        onGetLang={languageHandler}
        onGetScrollSection={scrollToSection}
        lang={lang}/>
      <LanguageControlMain data-tip={lang ? "English" : "Português"} onClick={() => setLang(!lang)}>
        <LanguageTogglerMain>
          <MdLanguage style={{ marginRight: ".6rem" }} />
          {lang ? "View in English" : "Ver em Português"}
        </LanguageTogglerMain>
      </LanguageControlMain>
      <section ref={headerSection}><Header lang={lang} /></section>
      <section ref={aboutSection}><About lang={lang} /></section>
      <section ref={projectsSection}><Projects lang={lang} /></section>
      <section ref={contactsSection}><Contact lang={lang} /></section>
      <Footer lang={lang} onGetScrollSection={scrollToSection} />
      </div>
  );
}

export default App;
