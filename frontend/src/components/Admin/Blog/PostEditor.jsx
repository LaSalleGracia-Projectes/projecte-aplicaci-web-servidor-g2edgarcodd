import React, { useState } from "react";

const PostEditor = ({ post, onSave }) => {
  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content : "");
  const [excerpt, setExcerpt] = useState(post ? post.excerpt : "");
  const [coverImage, setCoverImage] = useState(post ? post.coverImage : "");
  const [category, setCategory] = useState(post ? post.category : "");
  const [tags, setTags] = useState(post ? post.tags : "");
  const [status, setStatus] = useState(post ? post.status : "draft");
  const [featuredImage, setFeaturedImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      content,
      excerpt,
      coverImage,
      category,
      tags: tags.split(",").map((tag) => tag.trim()),
      status,
    };

    // Aquí se debería enviar la publicación al backend
    console.log("Publicación a guardar:", newPost);
    if (onSave) {
      onSave(newPost);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFeaturedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="settings-section">
      <div className="settings-header">
        <h2 className="settings-title">
          <i className="fas fa-edit"></i>{" "}
          {post ? "Editar Publicación" : "Nueva Publicación"}
        </h2>
      </div>
      <div className="settings-content">
        <form onSubmit={handleSubmit}>
          <div className="settings-group">
            <div className="settings-row">
              <div className="settings-field">
                <label>
                  Título <span className="settings-field-required">*</span>
                </label>
                <input
                  type="text"
                  className="settings-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Escribe el título de la publicación"
                  required
                />
              </div>
            </div>

            <div className="settings-row">
              <div className="settings-field">
                <label>Extracto</label>
                <input
                  type="text"
                  className="settings-input"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Un breve resumen de la publicación"
                />
                <span className="settings-help">
                  El extracto aparecerá en la vista previa del blog
                </span>
              </div>
            </div>

            <div className="settings-row">
              <div className="settings-field">
                <label>
                  Contenido <span className="settings-field-required">*</span>
                </label>
                <textarea
                  className="settings-input"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Escribe el contenido de la publicación aquí..."
                  rows="10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="settings-group">
            <h3 className="settings-group-title">Detalles adicionales</h3>

            <div className="settings-row">
              <div className="settings-field">
                <label>Categoría</label>
                <select
                  className="settings-input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="peliculas">Películas</option>
                  <option value="series">Series</option>
                  <option value="documentales">Documentales</option>
                  <option value="estrenos">Estrenos</option>
                  <option value="noticias">Noticias</option>
                </select>
              </div>

              <div className="settings-field">
                <label>Etiquetas</label>
                <input
                  type="text"
                  className="settings-input"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Separa las etiquetas con comas"
                />
                <span className="settings-help">
                  Ejemplo: netflix, acción, 2025
                </span>
              </div>
            </div>

            <div className="settings-row">
              <div className="settings-field">
                <label>Estado</label>
                <div className="settings-switch-container">
                  <div className="settings-switch-label">
                    <span className="settings-switch-title">
                      Publicar inmediatamente
                    </span>
                    <span className="settings-switch-description">
                      {status === "published"
                        ? "La publicación estará visible para todos los usuarios"
                        : "La publicación se guardará como borrador"}
                    </span>
                  </div>
                  <label className="settings-switch">
                    <input
                      type="checkbox"
                      checked={status === "published"}
                      onChange={(e) =>
                        setStatus(e.target.checked ? "published" : "draft")
                      }
                    />
                    <span className="settings-switch-slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="settings-row">
              <div className="settings-field">
                <label>Imagen de portada</label>
                <div className="adminPanel-file-upload-container">
                  <input
                    type="file"
                    id="featuredImage"
                    className="adminPanel-file-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="featuredImage"
                    className="adminPanel-file-upload-label"
                  >
                    <i className="fas fa-cloud-upload-alt"></i>
                    <span>Seleccionar imagen</span>
                  </label>

                  {featuredImage && (
                    <div className="adminPanel-image-preview">
                      <img src={featuredImage} alt="Vista previa" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="settings-actions">
            <button type="button" className="settings-action-btn secondary">
              <i className="fas fa-times"></i> Cancelar
            </button>
            <button type="submit" className="settings-action-btn primary">
              <i className="fas fa-save"></i>{" "}
              {post ? "Actualizar Publicación" : "Crear Publicación"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEditor;
