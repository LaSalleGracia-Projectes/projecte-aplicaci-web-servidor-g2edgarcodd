import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";
import "../../../styles/components/hero.css";
import HeroParticles from "./HeroParticles";
import { motion, AnimatePresence } from "framer-motion";

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailersLoaded, setTrailersLoaded] = useState({});
  const [heroHeight, setHeroHeight] = useState(0);
  const [inView, setInView] = useState(true);

  const heroRef = useRef(null);
  const intervalRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const videoRefs = useRef({});

  const { t, language } = useLanguage();

  const slideDuration = 12000; // 12 segundos para cada slide
  const progressUpdateInterval = 100; // Actualizar cada 100ms
  const loadingTimeout = 5000; // 5 segundos de timeout máximo para la carga

  // Usamos las claves de traducción para cada película
  const featuredContent = [
    {
      id: 1,
      titleKey: "hero.dune.title",
      taglineKey: "hero.dune.tagline",
      descriptionKey: "hero.dune.description",
      title: "Dune: Parte Dos", // Valor por defecto
      tagline: "Más allá del miedo, el destino aguarda", // Valor por defecto
      description:
        "Paul Atreides se une a los Fremen y comienza un viaje espiritual y político para convertirse en Muad'Dib mientras intenta prevenir el terrible futuro que solo él puede predecir.",
      backdrop: "/src/assets/heroes/dune2.webp",
      trailer:
        "https://www.youtube.com/embed/Way9Dexny3w?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=Way9Dexny3w&enablejsapi=1&origin=http://localhost:5173",
      fallbackColor: "#261c17",
      // Usando claves de géneros para traducción
      genreKeys: ["scifi", "adventure", "drama"],
      genre: ["Ciencia Ficción", "Aventura", "Drama"], // Valores por defecto
      duration: "166 min",
      releaseYear: "2024",
      rating: "9.4",
      type: "movie",
      trailerUrl: "/movie/1",
      director: "Denis Villeneuve",
      starring: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
      awards: ["6 Premios Oscar", "Mejor Fotografía", "Mejor Efectos Visuales"],
      // Añadiendo claves para la traducción de premios
      awardKeys: [
        "hero.dune.awards.main",
        "hero.dune.awards.photography",
        "hero.dune.awards.visualEffects",
      ],
    },
    {
      id: 2,
      titleKey: "hero.threebody.title",
      taglineKey: "hero.threebody.tagline",
      descriptionKey: "hero.threebody.description",
      title: "El Problema de los 3 Cuerpos", // Valor por defecto
      tagline: "El universo está escuchando", // Valor por defecto
      description:
        "Un grupo de científicos se enfrenta a la mayor amenaza de la historia de la humanidad: el contacto con una civilización alienígena al borde del colapso que planea invadir la Tierra.",
      backdrop: "/src/assets/heroes/three-bodies.webp",
      trailer:
        "https://www.youtube.com/embed/5lj99Uz1d50?start=2&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=5lj99Uz1d50&enablejsapi=1&origin=http://localhost:5173",
      fallbackColor: "#0a1a2a",
      // Usando claves de géneros para traducción
      genreKeys: ["scifi", "drama", "thriller"],
      genre: ["Ciencia Ficción", "Drama", "Thriller"], // Valores por defecto
      duration: "T1: 8 episodios",
      releaseYear: "2024",
      rating: "8.9",
      type: "series",
      trailerUrl: "/series/2",
      director: "D. Benioff & D.B. Weiss",
      starring: ["Eiza González", "Benedict Wong", "Jovan Adepo"],
      awards: [
        "4 Nominaciones Emmy",
        "Mejor Serie Dramática",
        "Efectos Especiales",
      ],
      // Añadiendo claves para la traducción de premios
      awardKeys: [
        "hero.threebody.awards.main",
        "hero.threebody.awards.drama",
        "hero.threebody.awards.effects",
      ],
    },
    {
      id: 3,
      titleKey: "hero.oppenheimer.title",
      taglineKey: "hero.oppenheimer.tagline",
      descriptionKey: "hero.oppenheimer.description",
      title: "Oppenheimer", // Valor por defecto
      tagline: "El mundo cambió para siempre", // Valor por defecto
      description:
        "La historia del científico estadounidense J. Robert Oppenheimer y su papel en el desarrollo de la bomba atómica durante la Segunda Guerra Mundial.",
      backdrop: "/src/assets/heroes/oppenheimer.webp",
      trailer:
        "https://www.youtube.com/embed/bK6ldnjE3Y0?start=7&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=bK6ldnjE3Y0&enablejsapi=1&origin=http://localhost:5173",
      fallbackColor: "#1a1a1a",
      // Usando claves de géneros para traducción
      genreKeys: ["drama", "biography", "history"],
      genre: ["Drama", "Biográfico", "Historia"], // Valores por defecto
      duration: "180 min",
      releaseYear: "2023",
      rating: "9.2",
      type: "movie",
      trailerUrl: "/movie/3",
      director: "Christopher Nolan",
      starring: ["Cillian Murphy", "Emily Blunt", "Robert Downey Jr."],
      awards: ["7 Premios Oscar", "Mejor Actor", "Mejor Director"],
      // Añadiendo claves para la traducción de premios
      awardKeys: [
        "hero.oppenheimer.awards.main",
        "hero.oppenheimer.awards.actor",
        "hero.oppenheimer.awards.director",
      ],
    },
  ];

  // Recuperar contenido con traducciones
  const getLocalizedContent = () => {
    return featuredContent.map((item) => {
      // Traducir los géneros
      const translatedGenres = item.genreKeys.map((genreKey) =>
        t(`genres.${genreKey}`, item.genre[item.genreKeys.indexOf(genreKey)])
      );

      // Traducir los premios
      const translatedAwards = item.awardKeys
        ? item.awardKeys.map((awardKey) =>
            t(awardKey, item.awards[item.awardKeys.indexOf(awardKey)])
          )
        : item.awards;

      return {
        ...item,
        title: t(item.titleKey) || item.title,
        tagline: t(item.taglineKey) || item.tagline,
        description: t(item.descriptionKey) || item.description,
        genre: translatedGenres, // Usar los géneros traducidos
        awards: translatedAwards, // Usar los premios traducidos
      };
    });
  };

  // Contenido localizado según el idioma actual
  const localizedContent = useMemo(() => getLocalizedContent(), [language, t]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (!entry.isIntersecting && showTrailer) {
          setShowTrailer(false);
        }
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
      setHeroHeight(heroRef.current.offsetHeight);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, [showTrailer]);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      console.log(
        "🚨 Timeout en carga de imágenes del hero - forzando renderizado"
      );
      setIsLoading(false);
      startAutoSlide();
      startProgressAnimation();
    }, loadingTimeout);

    const preloadImages = () => {
      const imagePromises = featuredContent.map((item) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = () => {
            console.warn(`❌ Error al cargar la imagen: ${item.backdrop}`);
            resolve();
          };
          img.src = item.backdrop;
        });
      });

      Promise.all(imagePromises)
        .then(() => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          setIsLoading(false);
          startAutoSlide();
          startProgressAnimation();
        })
        .catch((error) => {
          console.error("Error en la carga de imágenes:", error);
          setIsLoading(false);
          startAutoSlide();
          startProgressAnimation();
        });
    };

    preloadImages();

    return () => {
      clearAllIntervals();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (inView && showTrailer) {
      const videoEl = videoRefs.current[activeSlide];
      if (videoEl) {
        try {
          videoEl.contentWindow.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            "*"
          );
        } catch (error) {
          console.error("Error al reproducir video:", error);
        }
      }
    } else if (!inView && showTrailer) {
      const videoEl = videoRefs.current[activeSlide];
      if (videoEl) {
        try {
          videoEl.contentWindow.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            "*"
          );
        } catch (error) {
          console.error("Error al pausar video:", error);
        }
      }
    }
  }, [inView, showTrailer, activeSlide]);

  useEffect(() => {
    if (showTrailer) {
      Object.keys(videoRefs.current).forEach((key) => {
        const keyNum = parseInt(key);
        if (keyNum !== activeSlide && videoRefs.current[key]) {
          try {
            videoRefs.current[key].contentWindow.postMessage(
              '{"event":"command","func":"pauseVideo","args":""}',
              "*"
            );
          } catch (error) {
            console.error(`Error al pausar video ${key}:`, error);
          }
        }
      });

      if (videoRefs.current[activeSlide] && trailersLoaded[activeSlide]) {
        setTimeout(() => {
          try {
            videoRefs.current[activeSlide].contentWindow.postMessage(
              '{"event":"command","func":"playVideo","args":""}',
              "*"
            );
          } catch (error) {
            console.error(`Error al reproducir video ${activeSlide}:`, error);
          }
        }, 300);
      }
    }
  }, [activeSlide, showTrailer, trailersLoaded]);

  const clearAllIntervals = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  };

  const startProgressAnimation = () => {
    setAnimationProgress(0);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    const stepSize = 100 / (slideDuration / progressUpdateInterval);
    progressIntervalRef.current = setInterval(() => {
      if (!isPaused) {
        setAnimationProgress((prev) => {
          if (prev + stepSize >= 100) {
            return 0;
          }
          return prev + stepSize;
        });
      }
    }, progressUpdateInterval);
  };

  const handleSlideChange = (index) => {
    clearAllIntervals();
    setActiveSlide(index);
    setAnimationProgress(0);
    startAutoSlide();
    startProgressAnimation();
  };

  const handleNextSlide = () => {
    clearAllIntervals();
    setActiveSlide((prev) => (prev + 1) % featuredContent.length);
    setAnimationProgress(0);
    startAutoSlide();
    startProgressAnimation();
  };

  const handlePrevSlide = () => {
    clearAllIntervals();
    setActiveSlide(
      (prev) => (prev - 1 + featuredContent.length) % featuredContent.length
    );
    setAnimationProgress(0);
    startAutoSlide();
    startProgressAnimation();
  };

  const startAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setActiveSlide((prev) => (prev + 1) % featuredContent.length);
        setAnimationProgress(0);
      }
    }, slideDuration);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Cargar el trailer de manera más eficiente con lazy loading
  const handleTrailerLoad = (index) => {
    console.log(`✅ Trailer ${index} cargado`);

    // Utilizar setTimeout para no bloquear el hilo principal
    setTimeout(() => {
      setTrailersLoaded((prev) => ({
        ...prev,
        [index]: true,
      }));
    }, 100);
  };

  // Manejar la reproducción del trailer con un enfoque más optimizado
  const handleTrailerToggle = () => {
    if (showTrailer) {
      // Pausa todos los trailers en un solo lote
      Object.keys(videoRefs.current).forEach((key) => {
        if (videoRefs.current[key]) {
          try {
            videoRefs.current[key].contentWindow.postMessage(
              '{"event":"command","func":"pauseVideo","args":""}',
              "*"
            );
          } catch (error) {
            console.error(`Error al pausar video ${key}:`, error);
          }
        }
      });
    }

    setShowTrailer((prev) => !prev);

    // Usar el enfoque de requestAnimationFrame para mejorar el rendimiento
    if (!showTrailer) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (videoRefs.current[activeSlide]) {
            try {
              videoRefs.current[activeSlide].contentWindow.postMessage(
                '{"event":"command","func":"playVideo","args":""}',
                "*"
              );
            } catch (error) {
              console.error(`Error al reproducir video ${activeSlide}:`, error);
            }
          }
        }, 500); // Aumentar el timeout para dar más tiempo a la carga
      });
    }
  };

  const currentContent = localizedContent[activeSlide];

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  if (isLoading) {
    return (
      <div className="hero-loading">
        <div className="hero-spinner"></div>
        <p className="loading-text">{t("hero.loading")}</p>
      </div>
    );
  }

  return (
    <section
      ref={heroRef}
      className={`hero ${showTrailer ? "trailer-active" : ""} no-overflow`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <HeroParticles activeSlide={activeSlide} />

      <div className="hero-slides">
        {featuredContent.map((item, index) => (
          <div
            key={item.id}
            className={`hero-slide ${index === activeSlide ? "active" : ""}`}
          >
            <div
              className={`parallax-bg ${
                showTrailer && index === activeSlide ? "dimmed" : ""
              }`}
              style={{
                backgroundImage: `url(${item.backdrop})`,
                backgroundColor: item.fallbackColor || "#121212",
              }}
            ></div>

            {item.trailer && (
              <div
                className={`trailer-container ${
                  showTrailer && index === activeSlide ? "active" : ""
                }`}
              >
                {/* Cargar los iframes solo cuando sean necesarios */}
                {(index === activeSlide || trailersLoaded[index]) && (
                  <iframe
                    key={`trailer-${item.id}`}
                    ref={(ref) => {
                      videoRefs.current[index] = ref;
                    }}
                    className="trailer-frame"
                    src={item.trailer}
                    title={`${localizedContent[index].title} trailer`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    onLoad={() => handleTrailerLoad(index)}
                  ></iframe>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={`hero-overlay ${showTrailer ? "transparent" : ""}`}></div>

      <AnimatePresence mode="wait">
        <div className="hero-content-container" key={activeSlide}>
          <div
            className={`hero-content ${showTrailer ? "content-hidden" : ""}`}
          >
            <motion.div
              className="hero-content-inner"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
                exit: { opacity: 0 },
              }}
            >
              {currentContent.awards &&
                currentContent.awards.length > 0 &&
                !showTrailer && (
                  <motion.div
                    className="award-badge"
                    custom={0}
                    variants={contentVariants}
                  >
                    <i className="fas fa-award"></i>
                    <span>{currentContent.awards[0]}</span>
                  </motion.div>
                )}

              <motion.h1
                className="hero-title"
                custom={1}
                variants={contentVariants}
              >
                {currentContent.title}
              </motion.h1>

              {!showTrailer && (
                <>
                  <motion.div
                    className="hero-tagline"
                    custom={2}
                    variants={contentVariants}
                  >
                    {currentContent.tagline}
                  </motion.div>

                  <motion.div
                    className="hero-meta"
                    custom={3}
                    variants={contentVariants}
                  >
                    <span className="hero-rating">
                      <i className="fas fa-star"></i> {currentContent.rating}
                    </span>
                    <span className="hero-year">
                      {currentContent.releaseYear}
                    </span>
                    <span className="hero-duration">
                      {currentContent.duration}
                    </span>
                    <span
                      className={`content-type ${
                        currentContent.type === "movie" ? "movie" : "series"
                      }`}
                    >
                      {currentContent.type === "movie"
                        ? t("common.movie")
                        : t("common.series")}
                    </span>
                  </motion.div>

                  <motion.div
                    className="hero-creators"
                    custom={4}
                    variants={contentVariants}
                  >
                    {currentContent.director && (
                      <div className="hero-director">
                        <span className="director-label">
                          {t("common.director")}:
                        </span>
                        <span className="director-name">
                          {currentContent.director}
                        </span>
                      </div>
                    )}

                    {currentContent.starring &&
                      currentContent.starring.length > 0 && (
                        <div className="hero-starring">
                          <span className="starring-label">
                            {t("common.starring")}:
                          </span>
                          <span className="starring-names">
                            {currentContent.starring.slice(0, 3).join(", ")}
                          </span>
                        </div>
                      )}
                  </motion.div>

                  <motion.div
                    className="hero-genres"
                    custom={5}
                    variants={contentVariants}
                  >
                    {currentContent.genre.map((genre, idx) => (
                      <span key={idx} className="genre-tag">
                        {genre}
                      </span>
                    ))}
                  </motion.div>
                </>
              )}

              <motion.div
                className="hero-buttons"
                custom={6}
                variants={contentVariants}
              >
                <button
                  className={`btn-trailer ${showTrailer ? "active" : ""}`}
                  onClick={handleTrailerToggle}
                  aria-label={
                    showTrailer ? t("hero.hideTrailer") : t("hero.trailer")
                  }
                >
                  <i
                    className={`fas ${showTrailer ? "fa-times" : "fa-film"}`}
                  ></i>
                  {!showTrailer && <span>{t("hero.trailer")}</span>}
                </button>

                {!showTrailer && (
                  <Link
                    to={`/${currentContent.type}/${currentContent.id}`}
                    className="btn-info"
                  >
                    <i className="fas fa-info-circle"></i>
                    {t("hero.more")}
                  </Link>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatePresence>

      <div className={`hero-controls ${showTrailer ? "hidden" : ""}`}>
        <button
          className="hero-arrow prev"
          onClick={handlePrevSlide}
          aria-label={t("common.previous")}
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        <div className="hero-dots">
          {featuredContent.map((_, index) => (
            <button
              key={index}
              className={`hero-dot ${index === activeSlide ? "active" : ""}`}
              onClick={() => handleSlideChange(index)}
              aria-label={`${t("common.view")} ${index + 1}`}
            >
              {index === activeSlide && (
                <span
                  className="progress-ring"
                  style={{
                    background: `conic-gradient(
                      rgba(251, 197, 0, 0.8) ${animationProgress}%,
                      rgba(255, 255, 255, 0.2) 0%
                    )`,
                  }}
                ></span>
              )}
            </button>
          ))}
        </div>

        <button
          className="hero-arrow next"
          onClick={handleNextSlide}
          aria-label={t("common.next")}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
}

export default Hero;
