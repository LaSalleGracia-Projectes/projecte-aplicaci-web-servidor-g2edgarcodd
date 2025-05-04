import React, { useState } from "react";
import "../../../styles/components/admin/settings.css";

const GeneralSettings = () => {
  const [appName, setAppName] = useState("");
  const [appDescription, setAppDescription] = useState("");
  const [appVersion, setAppVersion] = useState("");
  const [siteUrl, setSiteUrl] = useState("");

  const handleSave = () => {
    // Aquí se puede agregar la lógica para guardar la configuración
    console.log("Configuraciones guardadas:", {
      appName,
      appDescription,
      appVersion,
      siteUrl,
    });
  };

  return (
    <div className="settings-group">
      <div className="settings-row">
        <div className="settings-field">
          <label htmlFor="appName">
            Nombre de la Aplicación{" "}
            <span className="settings-field-required">*</span>
          </label>
          <input
            className="settings-input"
            type="text"
            id="appName"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            placeholder="StreamHub"
          />
          <span className="settings-help">
            Este nombre se mostrará en la barra de título y en toda la
            plataforma
          </span>
        </div>
        <div className="settings-field">
          <label htmlFor="siteUrl">URL del Sitio</label>
          <input
            className="settings-input"
            type="text"
            id="siteUrl"
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
            placeholder="https://streamhub.com"
          />
          <span className="settings-help">
            La dirección URL principal de tu sitio
          </span>
        </div>
      </div>

      <div className="settings-row">
        <div className="settings-field">
          <label htmlFor="appDescription">Descripción de la Aplicación</label>
          <textarea
            className="settings-input"
            id="appDescription"
            value={appDescription}
            onChange={(e) => setAppDescription(e.target.value)}
            placeholder="Una descripción breve de tu plataforma"
            rows={3}
          ></textarea>
          <span className="settings-help">
            Esta descripción se usará en metaetiquetas SEO
          </span>
        </div>
      </div>

      <div className="settings-row">
        <div className="settings-field">
          <label htmlFor="appVersion">Versión de la Aplicación</label>
          <input
            className="settings-input"
            type="text"
            id="appVersion"
            value={appVersion}
            onChange={(e) => setAppVersion(e.target.value)}
            placeholder="1.0.0"
          />
          <span className="settings-help">
            Formato recomendado: x.x.x (ejemplo: 1.0.0)
          </span>
        </div>

        <div className="settings-field">
          <label>Caché del Sistema</label>
          <div className="settings-switch-container">
            <div className="settings-switch-label">
              <span className="settings-switch-title">Limpiar caché</span>
              <span className="settings-switch-description">
                Regenera todos los archivos caché del sistema
              </span>
            </div>
            <button className="adminPanel-btn adminPanel-btn-secondary adminPanel-btn-sm">
              <i className="fas fa-sync-alt"></i> Limpiar ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
