import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";

function FavoriteItem({ favorite, onRemoveFavorite }) {
  const { t } = useLanguage();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const confirmDelete = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onRemoveFavorite(favorite.id);
    setShowDeleteModal(false);
  };

  const cancelDelete = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowDeleteModal(false);
  };

  const contentType = favorite.type === "movie" ? "movie" : "series";
  const contentUrl = `/${contentType}/${favorite.id}`;

  return (
    <>
      <Link to={contentUrl} className="favorite-item">
        <div className="favorite-poster-wrapper">
          <img
            src={favorite.posterPath}
            alt={favorite.title}
            className="favorite-poster"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/300x450?text=No+Image";
            }}
          />

          {/* Badge de tipo */}
          <span className={`favorite-type-badge ${favorite.type}`}>
            {favorite.type === "movie" ? t("common.movie") : t("common.series")}
          </span>

          {/* Botón de favorito */}
          <button
            className="favorite-bookmark"
            onClick={handleDeleteClick}
            aria-label={t("favorites.removeFromFavorites")}
          >
            <i className="fas fa-bookmark"></i>
          </button>

          {/* Overlay con información */}
          <div className="favorite-info-overlay">
            <h3 className="favorite-title">{favorite.title}</h3>
            <p className="favorite-year">{favorite.year}</p>
          </div>
        </div>
      </Link>

      {showDeleteModal && (
        <div className="confirm-delete-modal active">
          <div className="confirm-delete-content">
            <i className="fas fa-exclamation-triangle confirm-delete-icon"></i>
            <h3 className="confirm-delete-title">
              {t("favorites.removeConfirmTitle")}
            </h3>
            <p className="confirm-delete-message">
              {t("favorites.removeConfirmMessage", { title: favorite.title })}
            </p>
            <div className="confirm-delete-actions">
              <button className="btn-cancel" onClick={cancelDelete}>
                <i className="fas fa-times"></i> {t("common.cancel")}
              </button>
              <button className="btn-confirm" onClick={confirmDelete}>
                <i className="fas fa-trash-alt"></i> {t("common.remove")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FavoriteItem;
