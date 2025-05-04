import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Hero from "../components/Home/Hero/Hero";
import NewReleases from "../components/Home/NewReleases";
import ContinueWatching from "../components/Home/ContinueWatching";
import Top10Container from "../components/Home/Top10/Top10Container";
import FeaturedCategories from "../components/Home/FeaturedCategories";
import TrendingNow from "../components/Home/TrendingNow";
import AwardsShowcase from "../components/Home/AwardsShowcase";
import Subscription from "../components/Home/Subscription/Subscription";
import ScrollToTop from "../components/UI/ScrollToTop";
import WeatherButton from "../components/UI/WeatherButton";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/components/homepage.css";

function HomePage() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  // Hook para manejar animaciones al hacer scroll
  useEffect(() => {
    const handleScrollAnimations = () => {
      const sections = document.querySelectorAll(".animated-section");

      // Calcular la altura de 25vh
      const scrollThreshold = window.innerHeight * 0.25;

      // Comprobar si hemos pasado el umbral de 25vh
      const hasPassedThreshold = window.scrollY > scrollThreshold;

      // Actualizar el estado de scroll solo si ha cambiado
      if (hasPassedThreshold !== scrolled) {
        setScrolled(hasPassedThreshold);
      }

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.85) {
          section.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScrollAnimations);
    // Trigger once on load
    handleScrollAnimations();

    return () => window.removeEventListener("scroll", handleScrollAnimations);
  }, [scrolled]);

  return (
    <MainLayout>
      <div className="homepage-container">
        {/* Hero Banner con Slider */}
        <Hero />

        <div className="content-wrapper">
          {/* Sección "Continuar Viendo" */}
          <section className="animated-section">
            <ContinueWatching />
          </section>

          {/* Sección "Nuevos Lanzamientos" */}
          <section className="animated-section">
            <NewReleases />
          </section>

          {/* Sección "Top 10 Películas" */}
          <section className="animated-section">
            <Top10Container />
          </section>

          {/* Sección "En Tendencia" */}
          <section className="animated-section">
            <TrendingNow />
          </section>

          {/* Sección "Premiados y Aclamados" */}
          <section className="animated-section">
            <AwardsShowcase />
          </section>

          {/* Sección de Categorías Destacadas */}
          <section className="animated-section">
            <FeaturedCategories />
          </section>

          {/* Banner de Suscripción */}
          <section className="animated-section">
            <Subscription />
          </section>
        </div>

        {/* Botones flotantes */}
        <ScrollToTop />
        <WeatherButton />
      </div>
    </MainLayout>
  );
}

export default HomePage;
