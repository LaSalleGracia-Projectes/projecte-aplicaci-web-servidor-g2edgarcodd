import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import "../../styles/components/trendingnow.css";

function TrendingNow() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const sliderRef = useRef(null);
  const maxScroll = useRef(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const { t } = useLanguage();

  // Datos simulados para trending
  const trendingContent = [
    {
      id: 1,
      titleKey: "trending.arrakisChronicles.title",
      image:
        "https://images.unsplash.com/photo-1627873649417-c67f701f1949?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      genres: [{ key: "genres.scifi" }, { key: "genres.drama" }],
      year: "2024",
      trending: "+128%",
      type: "movie",
    },
    {
      id: 2,
      titleKey: "trending.temporalParadox.title",
      image:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      genres: [{ key: "genres.thriller" }, { key: "genres.mystery" }],
      year: "2024",
      trending: "+92%",
      type: "movie",
    },
    {
      id: 3,
      titleKey: "trending.midnightChronicles.title",
      image:
        "https://images.unsplash.com/photo-1604975701397-6365ccbd028a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      genres: [{ key: "genres.fantasy" }, { key: "genres.adventure" }],
      year: "2023",
      trending: "+87%",
      type: "series",
    },
    {
      id: 4,
      titleKey: "trending.cityOfDreams.title",
      image:
        "https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      genres: [{ key: "genres.drama" }, { key: "genres.crime" }],
      year: "2024",
      trending: "+81%",
      type: "series",
    },
    {
      id: 5,
      titleKey: "trending.beyondTheHorizon.title",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      genres: [{ key: "genres.documentary" }, { key: "genres.nature" }],
      year: "2023",
      trending: "+76%",
      type: "movie",
    },
    {
      id: 6,
      titleKey: "trending.quantumProtocol.title",
      image:
        "https://images.unsplash.com/photo-1538370965046-79c0d6907d47?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      genres: [{ key: "genres.scifi" }, { key: "genres.action" }],
      year: "2024",
      trending: "+70%",
      type: "movie",
    },
  ];

  // Actualizar maxScroll cuando cambie el tamaño
  useEffect(() => {
    const updateMaxScroll = () => {
      if (sliderRef.current) {
        maxScroll.current =
          sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
        updateArrowVisibility(sliderRef.current.scrollLeft);
      }
    };

    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);

    sliderRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", updateMaxScroll);
      sliderRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const updateArrowVisibility = (position) => {
    setShowLeftArrow(position > 0);
    setShowRightArrow(position < maxScroll.current - 10);
  };

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 300;
      const newPosition =
        direction === "left"
          ? scrollPosition - scrollAmount
          : scrollPosition + scrollAmount;

      sliderRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (sliderRef.current) {
      setScrollPosition(sliderRef.current.scrollLeft);
      updateArrowVisibility(sliderRef.current.scrollLeft);
    }
  };

  return (
    <section className="trending-section">
      <div className="section-header">
        <h2>{t("home.trendingNow")}</h2>
        <p className="section-description">{t("home.trendingDescription")}</p>
      </div>

      <div className="trending-container">
        {showLeftArrow && (
          <button
            className="trending-arrow arrow-left"
            onClick={() => scroll("left")}
            aria-label={t("common.scrollLeft")}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
        )}

        <div className="trending-slider" ref={sliderRef}>
          {trendingContent.map((item) => (
            <Link
              to={`/${item.type}/${item.id}`}
              className="trending-item"
              key={item.id}
            >
              <div className="trending-image-container">
                <img src={item.image} alt={t(item.titleKey)} />
                <span className="trending-badge">
                  <i className="fas fa-chart-line"></i> {item.trending}
                </span>
                <div className="trending-overlay">
                  <button className="play-button">
                    <i className="fas fa-play"></i>
                  </button>
                </div>
              </div>
              <div className="trending-info">
                <h3>{t(item.titleKey)}</h3>
                <div className="trending-meta">
                  <span className="trending-year">{item.year}</span>
                  <span className="trending-dot">•</span>
                  <span className="trending-genres">
                    {item.genres.map((genre, index) => (
                      <React.Fragment key={genre.key}>
                        {index > 0 && ", "}
                        {t(genre.key)}
                      </React.Fragment>
                    ))}
                  </span>
                  <span
                    className={
                      item.type === "movie" ? "movie-badge" : "series-badge"
                    }
                  >
                    {item.type === "movie"
                      ? t("common.movie")
                      : t("common.series")}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {showRightArrow && (
          <button
            className="trending-arrow arrow-right"
            onClick={() => scroll("right")}
            aria-label={t("common.scrollRight")}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        )}
      </div>
    </section>
  );
}

export default TrendingNow;
