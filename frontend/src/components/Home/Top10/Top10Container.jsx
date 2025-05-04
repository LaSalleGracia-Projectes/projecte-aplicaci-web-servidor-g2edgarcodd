import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Top10Item from "./Top10Item";
import { useLanguage } from "../../../contexts/LanguageContext";
import "../../../styles/components/top10.css";

function Top10Container() {
  const [activeCategory, setActiveCategory] = useState("movies");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const sliderRef = useRef(null);
  const { t } = useLanguage();

  // Datos simulados para Top 10
  const top10Data = {
    movies: [
      {
        id: 1,
        titleKey: "top10.movies.oppenheimer.title",
        image: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        rank: 1,
        rating: 8.8,
        trend: "up",
      },
      {
        id: 2,
        titleKey: "top10.movies.dune2.title",
        image: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
        rank: 2,
        rating: 8.5,
        trend: "same",
      },
      {
        id: 3,
        titleKey: "top10.movies.poorThings.title",
        image: "https://image.tmdb.org/t/p/w500/kpyJXVvNTDL5SoUAfOvwKdqXYmw.jpg",
        rank: 3,
        rating: 8.1,
        trend: "up",
      },
      {
        id: 4,
        titleKey: "top10.movies.civilWar.title",
        image: "https://image.tmdb.org/t/p/w500/A5GmeEx5vB3ZAu4bIxjtxnZCGlf.jpg",
        rank: 4,
        rating: 7.9,
        trend: "new",
      },
      {
        id: 5,
        titleKey: "top10.movies.godzillaKong.title",
        image: "https://image.tmdb.org/t/p/w500/qVKirUdmoex8SdfUk8WDDWwrcpe.jpg",
        rank: 5,
        rating: 7.6,
        trend: "down",
      },
      {
        id: 6,
        titleKey: "top10.movies.challengers.title",
        image: "https://image.tmdb.org/t/p/w500/wrpH0z2oU7egQcC4q3oKDzLiZbX.jpg",
        rank: 6,
        rating: 7.8,
        trend: "down",
      },
      {
        id: 7,
        titleKey: "top10.movies.fallen.title",
        image: "https://image.tmdb.org/t/p/w500/dTQOU5a32K3UPTIXHgipEqN41OM.jpg",
        rank: 7,
        rating: 7.7,
        trend: "same",
      },
      {
        id: 8,
        titleKey: "top10.movies.beetlejuice2.title",
        image: "https://image.tmdb.org/t/p/w500/lfpUQilbI7yslPEXAQBKIOhCI36.jpg",
        rank: 8,
        rating: 7.0,
        trend: "new",
      },
      {
        id: 9,
        titleKey: "top10.movies.holdYourBreath.title",
        image: "https://image.tmdb.org/t/p/w500/ctMYnfhwA0rRJnGFepNrYvzRtN5.jpg",
        rank: 9,
        rating: 6.9,
        trend: "down",
      },
      {
        id: 10,
        titleKey: "top10.movies.joker2.title",
        image: "https://image.tmdb.org/t/p/w500/nbBmMUmCfKa69ucAHDHOISXU8yH.jpg",
        rank: 10,
        rating: 8.2,
        trend: "new",
      },
    ],
    series: [
      {
        id: 101,
        titleKey: "top10.series.houseOfDragon.title",
        image: "https://image.tmdb.org/t/p/w500/xiB0hsxMpgxpJfA1nFesxlF1XLZ.jpg",
        rank: 1,
        rating: 8.9,
        trend: "up",
      },
      {
        id: 102,
        titleKey: "top10.series.fallout.title",
        image: "https://image.tmdb.org/t/p/w500/6OfQqNIbLgXFtO9JSEUtUp7Gsv.jpg",
        rank: 2,
        rating: 8.2,
        trend: "same",
      },
      {
        id: 103,
        titleKey: "top10.series.bridgerton.title",
        image: "https://image.tmdb.org/t/p/w500/adjuAHx8G9gijRUtQI2Vd7JYxO3.jpg",
        rank: 3,
        rating: 8.0,
        trend: "down",
      },
      {
        id: 104,
        titleKey: "top10.series.thePenguin.title",
        image: "https://image.tmdb.org/t/p/w500/rKmYKuxgfX3Z5YbNvwvbaDOZe7T.jpg",
        rank: 4,
        rating: 8.3,
        trend: "new",
      },
      {
        id: 105,
        titleKey: "top10.series.theAcolyte.title",
        image: "https://image.tmdb.org/t/p/w500/1Yg7Cz4WZZ3SZvnKUEpQiAXzYBJ.jpg",
        rank: 5,
        rating: 6.8,
        trend: "same",
      },
      {
        id: 106,
        titleKey: "top10.series.shogun.title",
        image: "https://image.tmdb.org/t/p/w500/d3l7kgFJyLTTQSrR4ysCk5yeVyW.jpg",
        rank: 6,
        rating: 8.7,
        trend: "down",
      },
      {
        id: 107,
        titleKey: "top10.series.theLast.title",
        image: "https://image.tmdb.org/t/p/w500/5zNrNO9s9uQ3MI9dYQRP5xanGcO.jpg",
        rank: 7,
        rating: 8.4,
        trend: "down",
      },
      {
        id: 108,
        titleKey: "top10.series.babygirl.title",
        image: "https://image.tmdb.org/t/p/w500/4soAMSe7WLWSVAReTwPGaHQSstP.jpg",
        rank: 8,
        rating: 7.2,
        trend: "new",
      },
      {
        id: 109,
        titleKey: "top10.series.xmen97.title",
        image: "https://image.tmdb.org/t/p/w500/c6Z6gzXgs4vXgTYheY6wTqraxnY.jpg",
        rank: 9,
        rating: 8.1,
        trend: "same",
      },
      {
        id: 110,
        titleKey: "top10.series.ripley.title",
        image: "https://image.tmdb.org/t/p/w500/lvceQQKPzKz8RwDHQHZfSVlkuT0.jpg",
        rank: 10,
        rating: 8.0,
        trend: "down",
      },
    ],
  };

  useEffect(() => {
    checkScrollability();
    // Añadir evento de redimensionamiento para actualizar la navegabilidad
    window.addEventListener('resize', checkScrollability);
    return () => {
      window.removeEventListener('resize', checkScrollability);
    };
  }, [activeCategory]);

  // Comprobar si es posible desplazarse a la izquierda o a la derecha
  const checkScrollability = () => {
    if (sliderRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  // Manejar el desplazamiento
  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 200; // Ajustar según necesidad
      const currentScroll = sliderRef.current.scrollLeft;
      sliderRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
      
      // Actualizar después del desplazamiento
      setTimeout(checkScrollability, 500);
    }
  };

  // Manejar el evento de desplazamiento natural
  const handleSliderScroll = () => {
    checkScrollability();
  };

  return (
    <section className="top10-section">
      <div className="section-header">
        <h2>{t("home.top10")}</h2>

        <div className="top10-tabs">
          <button
            className={`top10-tab ${activeCategory === "movies" ? "active" : ""}`}
            onClick={() => setActiveCategory("movies")}
          >
            {t("navbar.movies")}
          </button>
          <button
            className={`top10-tab ${activeCategory === "series" ? "active" : ""}`}
            onClick={() => setActiveCategory("series")}
          >
            {t("navbar.series")}
          </button>
        </div>
      </div>

      <div className="top10-container">
        {canScrollLeft && (
          <div className="slider-arrow arrow-left" onClick={() => handleScroll('left')}>
            <i className="fas fa-chevron-left"></i>
          </div>
        )}

        <div 
          className="top10-slider" 
          ref={sliderRef}
          onScroll={handleSliderScroll}
        >
          {top10Data[activeCategory].map((item, index) => (
            <Top10Item
              key={item.id}
              item={item}
              index={index}
              type={activeCategory === "movies" ? "movie" : "series"}
            />
          ))}
        </div>

        {canScrollRight && (
          <div className="slider-arrow arrow-right" onClick={() => handleScroll('right')}>
            <i className="fas fa-chevron-right"></i>
          </div>
        )}
      </div>

      <div className="top10-footer">
        <Link to="/explore" className="see-more-btn">
          {t("common.seeMore")} <i className="fas fa-chevron-right"></i>
        </Link>
      </div>
    </section>
  );
}

export default Top10Container;
