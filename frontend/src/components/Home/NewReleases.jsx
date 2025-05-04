import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import "../../styles/components/newreleases.css";

function NewReleases() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { t } = useLanguage();

  // Datos simulados para nuevos lanzamientos
  const newReleases = [
    {
      id: 1,
      titleKey: "newReleases.dune2.title",
      image: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
      year: "2024",
      rating: 8.5,
      genreKey: "genres.scifi",
      category: "movies",
      isNew: true,
    },
    {
      id: 2,
      titleKey: "newReleases.penguin.title",
      image: "https://image.tmdb.org/t/p/w500/rKmYKuxgfX3Z5YbNvwvbaDOZe7T.jpg",
      year: "2024",
      rating: 8.3,
      genreKey: "genres.crime",
      category: "series",
      isNew: true,
    },
    {
      id: 3,
      titleKey: "newReleases.challengers.title",
      image: "https://image.tmdb.org/t/p/w500/wrpH0z2oU7egQcC4q3oKDzLiZbX.jpg",
      year: "2024",
      rating: 7.8,
      genreKey: "genres.drama",
      category: "movies",
      isNew: true,
    },
    {
      id: 4,
      titleKey: "newReleases.fallout.title",
      image: "https://image.tmdb.org/t/p/w500/6OfQqNIbLgXFtO9JSEUtUp7Gsv.jpg",
      year: "2024",
      rating: 8.2,
      genreKey: "genres.action",
      category: "series",
      isNew: false,
    },
    {
      id: 5,
      titleKey: "newReleases.furiosa.title",
      image: "https://image.tmdb.org/t/p/w500/kdMjBDI7wyHfoZOQB7asw6UY8J1.jpg",
      year: "2024",
      rating: 7.9,
      genreKey: "genres.action",
      category: "movies",
      isNew: true,
    },
    {
      id: 6,
      titleKey: "newReleases.hungergames.title",
      image: "https://image.tmdb.org/t/p/w500/t7XpwGqbxD892K4ZlGcXLPakHl.jpg",
      year: "2023",
      rating: 7.2,
      genreKey: "genres.adventure",
      category: "movies",
      isNew: false,
    },
    {
      id: 7,
      titleKey: "newReleases.houseofdragon.title",
      image: "https://image.tmdb.org/t/p/w500/xiB0hsxMpgxpJfA1nFesxlF1XLZ.jpg",
      year: "2024",
      rating: 8.9,
      genreKey: "genres.fantasy",
      category: "series",
      isNew: true,
    },
    {
      id: 8,
      titleKey: "newReleases.acolyte.title",
      image: "https://image.tmdb.org/t/p/w500/1Yg7Cz4WZZ3SZvnKUEpQiAXzYBJ.jpg",
      year: "2024",
      rating: 6.8,
      genreKey: "genres.scifi",
      category: "series",
      isNew: false,
    },
  ];

  // Filtrar por categoría
  const filteredReleases =
    activeCategory === "all"
      ? newReleases
      : newReleases.filter((item) => item.category === activeCategory);

  return (
    <section className="new-releases-section">
      <div className="section-header">
        <h2>{t("home.newReleases")}</h2>

        <div className="filter-tabs">
          <button
            className={`filter-tab ${activeCategory === "all" ? "active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            {t("common.all")}
          </button>
          <button
            className={`filter-tab ${
              activeCategory === "movies" ? "active" : ""
            }`}
            onClick={() => setActiveCategory("movies")}
          >
            {t("navbar.movies")}
          </button>
          <button
            className={`filter-tab ${
              activeCategory === "series" ? "active" : ""
            }`}
            onClick={() => setActiveCategory("series")}
          >
            {t("navbar.series")}
          </button>
        </div>
      </div>

      <div className="new-releases-container">
        {filteredReleases.map((item) => (
          <Link
            to={`/${item.category === "movies" ? "movie" : "series"}/${
              item.id
            }`}
            className="release-item"
            key={item.id}
          >
            <div className="release-image-container">
              <img
                src={item.image}
                alt={t(item.titleKey)}
                className="release-image"
              />

              {item.isNew && (
                <span className="new-badge">{t("common.new")}</span>
              )}

              <div className="release-overlay">
                <div className="release-actions">
                  <button className="play-now-btn">
                    <i className="fas fa-play"></i>
                  </button>
                  <button className="add-list-btn">
                    <i className="fas fa-plus"></i>
                  </button>
                </div>

                <div className="release-meta">
                  <span className="release-year">{item.year}</span>
                  <span className="release-rating">
                    <i className="fas fa-star"></i>
                    {item.rating}
                  </span>
                </div>
              </div>
            </div>

            <div className="release-info">
              <h3 className="release-title">{t(item.titleKey)}</h3>
              <span className="release-genre">{t(item.genreKey)}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default NewReleases;
