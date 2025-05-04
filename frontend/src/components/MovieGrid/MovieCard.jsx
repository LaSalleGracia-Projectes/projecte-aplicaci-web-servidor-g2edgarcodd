// src/components/MovieGrid/MovieCard.jsx
import React, { useState, useRef } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Link } from "react-router-dom";

function MovieCard({
  title,
  description,
  image,
  contentType,
  id,
  rating = 0,
  year = "",
  popularity = 0,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const favoriteIconRef = useRef(null);
  const { t } = useLanguage();

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const toggleFavorite = (e) => {
    e.preventDefault(); // Prevenir navegación
    e.stopPropagation(); // Prevenir propagación del evento
    setIsFavorite(!isFavorite);

    // Agregar y quitar la clase de animación
    if (favoriteIconRef.current) {
      favoriteIconRef.current.classList.add("beat");
      favoriteIconRef.current.addEventListener(
        "animationend",
        () => {
          if (favoriteIconRef.current) {
            favoriteIconRef.current.classList.remove("beat");
          }
        },
        { once: true }
      );
    }
  };

  // Determinar la URL adecuada según el tipo de contenido
  const getItemUrl = () => {
    if (contentType === "film") {
      return `/movie/${id || 1}`;
    } else if (contentType === "series") {
      return `/series/${id || 1}`;
    }
    return `/movie/${id || 1}`;
  };

  // Renderizar el badge del tipo de contenido
  const renderContentTypeBadge = () => {
    if (!contentType) return null;

    let icon = "";
    let label = "";

    if (contentType === "film") {
      icon = "fa-film";
      label = t("common.film");
    } else if (contentType === "series") {
      icon = "fa-tv";
      label = t("common.series");
    } else {
      return null;
    }

    return (
      <div className={`content-type-badge ${contentType}`}>
        <i className={`fas ${icon}`}></i>
        <span>{label}</span>
      </div>
    );
  };

  // Renderizar rating solo si está disponible
  const renderRating = () => {
    if (!rating) return null;

    return (
      <div className="movie-rating">
        <i className="fas fa-star"></i>
        <span>{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <Link to={getItemUrl()} className="movie-card-link">
      <div
        className={`movie-card ${isHovering ? "hover" : ""}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {renderContentTypeBadge()}
        {renderRating()}

        <div className="movie-image-container">
          <img
            src={image}
            alt={title}
            className={`movie-image ${imageLoaded ? "loaded" : ""}`}
            onLoad={handleImageLoad}
          />

          {/* Overlay en hover */}
          <div className="movie-overlay">
            <div className="movie-actions">
              <button className="action-button watch-button">
                <i className="fas fa-play"></i>
                <span>{t("common.watchNow")}</span>
              </button>
              <div className="action-icons">
                <button className="icon-button" aria-label="Add to list">
                  <i className="fas fa-plus"></i>
                </button>
                <button
                  className="icon-button"
                  onClick={toggleFavorite}
                  aria-label={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  <span
                    ref={favoriteIconRef}
                    className={`favorite-icon ${isFavorite ? "active" : ""}`}
                  >
                    <i className="fas fa-heart"></i>
                  </span>
                </button>
                <button className="icon-button" aria-label="More info">
                  <i className="fas fa-ellipsis-h"></i>
                </button>
              </div>
            </div>

            {/* Información extra en hover */}
            <div className="movie-details">
              {year && <span className="movie-year">{year}</span>}
              <p className="movie-description">{description}</p>
            </div>
          </div>
        </div>

        <div className="movie-info">
          <h3 className="movie-title">{title}</h3>
          {popularity > 0 && (
            <div className="movie-popularity">
              <div
                className="popularity-meter"
                style={{ width: `${Math.min(popularity * 10, 100)}%` }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
