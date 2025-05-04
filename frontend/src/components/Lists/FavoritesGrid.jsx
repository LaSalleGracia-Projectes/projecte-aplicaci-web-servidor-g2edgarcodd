import React from 'react';
import FavoriteItem from './FavoriteItem';

function FavoritesGrid({ favorites, onRemoveFavorite }) {
  if (!favorites || favorites.length === 0) {
    return (
      <div className="empty-favorites">
        <div className="empty-content">
          <i className="far fa-bookmark empty-icon"></i>
          <h3>No tienes favoritos guardados</h3>
          <p>Marca películas y series como favoritas para acceder a ellas rápidamente desde aquí</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-grid">
      {favorites.map(favorite => (
        <FavoriteItem
          key={favorite.id}
          favorite={favorite}
          onRemoveFavorite={onRemoveFavorite}
        />
      ))}
    </div>
  );
}

export default FavoritesGrid;