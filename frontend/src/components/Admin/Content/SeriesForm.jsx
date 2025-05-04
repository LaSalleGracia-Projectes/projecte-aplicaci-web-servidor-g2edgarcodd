import React, { useState } from "react";

const SeriesForm = ({ serie, onSubmit }) => {
  const [title, setTitle] = useState(serie ? serie.title : "");
  const [description, setDescription] = useState(
    serie ? serie.description : ""
  );
  const [coverImage, setCoverImage] = useState(serie ? serie.coverImage : "");
  const [seasons, setSeasons] = useState(serie ? serie.seasons : 1);
  const [episodes, setEpisodes] = useState(serie ? serie.episodes : 1);
  const [releaseDate, setReleaseDate] = useState(
    serie ? serie.releaseDate : ""
  );
  const [genre, setGenre] = useState(serie ? serie.genre : "");
  const [creator, setCreator] = useState(serie ? serie.creator : "");
  const [status, setStatus] = useState(serie ? serie.status : "draft");

  const handleSubmit = (e) => {
    e.preventDefault();
    const serieData = {
      title,
      description,
      coverImage,
      seasons,
      episodes,
      releaseDate,
      genre,
      creator,
      status,
    };

    if (onSubmit) {
      onSubmit(serieData);
    } else {
      console.log(serieData);
    }
  };

  return (
    <div className="admin-content-form">
      <h2 className="admin-content-form-title">
        <i className="fas fa-tv"></i>
        {serie ? "Editar Serie" : "Agregar Nueva Serie"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="admin-content-form-section">
          <h3 className="admin-content-form-subtitle">Información Básica</h3>
          <div className="admin-content-form-grid">
            <div className="admin-content-form-group">
              <label className="admin-content-form-label">Título</label>
              <input
                type="text"
                className="admin-content-form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Título de la serie"
              />
            </div>

            <div className="admin-content-form-group">
              <label className="admin-content-form-label">Creador</label>
              <input
                type="text"
                className="admin-content-form-input"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
                required
                placeholder="Nombre del creador"
              />
            </div>

            <div className="admin-content-form-group">
              <label className="admin-content-form-label">Género</label>
              <select
                className="admin-content-form-select"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
              >
                <option value="">Seleccionar género</option>
                <option value="action">Acción</option>
                <option value="comedy">Comedia</option>
                <option value="drama">Drama</option>
                <option value="horror">Terror</option>
                <option value="scifi">Ciencia Ficción</option>
                <option value="fantasy">Fantasía</option>
                <option value="thriller">Thriller</option>
                <option value="romance">Romance</option>
                <option value="documentary">Documental</option>
              </select>
            </div>

            <div className="admin-content-form-group">
              <label className="admin-content-form-label">Temporadas</label>
              <input
                type="number"
                className="admin-content-form-input"
                value={seasons}
                onChange={(e) => setSeasons(e.target.value)}
                required
                min="1"
                placeholder="Número de temporadas"
              />
            </div>

            <div className="admin-content-form-group">
              <label className="admin-content-form-label">Episodios</label>
              <input
                type="number"
                className="admin-content-form-input"
                value={episodes}
                onChange={(e) => setEpisodes(e.target.value)}
                required
                min="1"
                placeholder="Número total de episodios"
              />
            </div>

            <div className="admin-content-form-group">
              <label className="admin-content-form-label">
                Fecha de Estreno
              </label>
              <input
                type="date"
                className="admin-content-form-input"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                required
              />
            </div>

            <div className="admin-content-form-group">
              <label className="admin-content-form-label">Estado</label>
              <select
                className="admin-content-form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="draft">Borrador</option>
                <option value="published">Publicado</option>
                <option value="archived">Archivado</option>
              </select>
            </div>
          </div>
        </div>

        <div className="admin-content-form-section">
          <h3 className="admin-content-form-subtitle">Descripción</h3>
          <div className="admin-content-form-group">
            <label className="admin-content-form-label">Sinopsis</label>
            <textarea
              className="admin-content-form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="5"
              placeholder="Descripción de la serie"
            />
          </div>
        </div>

        <div className="admin-content-form-section">
          <h3 className="admin-content-form-subtitle">Imagen de Portada</h3>
          <div className="admin-content-form-group">
            <div className="admin-content-uploader">
              <i className="fas fa-cloud-upload-alt admin-content-uploader-icon"></i>
              <p className="admin-content-uploader-text">
                Arrastra una imagen o haz clic para seleccionarla
              </p>
              <p className="admin-content-uploader-hint">
                Formatos soportados: JPG, PNG, GIF (Max: 5MB)
              </p>
              <input type="file" accept="image/*" />
            </div>

            <div
              className="admin-content-form-group"
              style={{ marginTop: "1rem" }}
            >
              <label className="admin-content-form-label">
                O ingresa URL de imagen
              </label>
              <input
                type="url"
                className="admin-content-form-input"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              <p className="admin-content-form-help">
                Ingresa una URL válida para la imagen de portada
              </p>
            </div>

            {coverImage && (
              <div className="admin-content-preview">
                <img src={coverImage} alt="Vista previa de portada" />
                <div className="admin-content-preview-actions">
                  <button
                    type="button"
                    className="admin-content-preview-action"
                    onClick={() => setCoverImage("")}
                    title="Eliminar imagen"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="admin-content-form-actions">
          <button type="button" className="admin-content-form-cancel">
            <i className="fas fa-times"></i> Cancelar
          </button>
          <button type="submit" className="admin-content-form-submit">
            <i className="fas fa-save"></i>{" "}
            {serie ? "Actualizar Serie" : "Guardar Serie"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SeriesForm;
