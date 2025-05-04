import React, { useState } from "react";
import "../../../styles/components/admin/settings.css";

const AppearanceSettings = () => {
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("medium");
  const [primaryColor, setPrimaryColor] = useState("primary");
  const [showLogo, setShowLogo] = useState(true);

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
    // Aquí se podría agregar lógica para aplicar el tema seleccionado
  };

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
    // Aquí se podría agregar lógica para aplicar el tamaño de fuente seleccionado
  };

  const handleColorChange = (color) => {
    setPrimaryColor(color);
    // Aquí se podría agregar lógica para aplicar el color seleccionado
  };

  return (
    <div className="settings-group">
      <div className="settings-group-title">Tema y Aspecto Visual</div>

      <div className="settings-row">
        <div className="settings-field">
          <label htmlFor="theme-select">Tema de la Interfaz</label>
          <select
            id="theme-select"
            className="settings-input"
            value={theme}
            onChange={handleThemeChange}
          >
            <option value="light">Claro</option>
            <option value="dark">Oscuro</option>
            <option value="system">Seguir Sistema</option>
          </select>
          <span className="settings-help">
            Personaliza la apariencia general del panel
          </span>
        </div>

        <div className="settings-field">
          <label htmlFor="font-size-select">Tamaño de Fuente</label>
          <select
            id="font-size-select"
            className="settings-input"
            value={fontSize}
            onChange={handleFontSizeChange}
          >
            <option value="small">Pequeño</option>
            <option value="medium">Medio</option>
            <option value="large">Grande</option>
          </select>
          <span className="settings-help">
            Ajusta el tamaño de la tipografía
          </span>
        </div>
      </div>

      <div className="settings-group-title">Colores e Identidad</div>

      <label>Color Principal</label>
      <div className="settings-color-picker">
        <div
          className={`settings-color-option ${
            primaryColor === "primary" ? "selected" : ""
          }`}
          data-color="primary"
          onClick={() => handleColorChange("primary")}
        >
          <input
            type="radio"
            name="color"
            value="primary"
            checked={primaryColor === "primary"}
            readOnly
          />
        </div>
        <div
          className={`settings-color-option ${
            primaryColor === "blue" ? "selected" : ""
          }`}
          data-color="blue"
          onClick={() => handleColorChange("blue")}
        >
          <input
            type="radio"
            name="color"
            value="blue"
            checked={primaryColor === "blue"}
            readOnly
          />
        </div>
        <div
          className={`settings-color-option ${
            primaryColor === "green" ? "selected" : ""
          }`}
          data-color="green"
          onClick={() => handleColorChange("green")}
        >
          <input
            type="radio"
            name="color"
            value="green"
            checked={primaryColor === "green"}
            readOnly
          />
        </div>
        <div
          className={`settings-color-option ${
            primaryColor === "purple" ? "selected" : ""
          }`}
          data-color="purple"
          onClick={() => handleColorChange("purple")}
        >
          <input
            type="radio"
            name="color"
            value="purple"
            checked={primaryColor === "purple"}
            readOnly
          />
        </div>
        <div
          className={`settings-color-option ${
            primaryColor === "orange" ? "selected" : ""
          }`}
          data-color="orange"
          onClick={() => handleColorChange("orange")}
        >
          <input
            type="radio"
            name="color"
            value="orange"
            checked={primaryColor === "orange"}
            readOnly
          />
        </div>
      </div>

      <div className="settings-switch-container">
        <div className="settings-switch-label">
          <span className="settings-switch-title">
            Mostrar Logo en Cabecera
          </span>
          <span className="settings-switch-description">
            Activa para mostrar el logo en la navegación superior
          </span>
        </div>
        <label className="settings-switch">
          <input
            type="checkbox"
            checked={showLogo}
            onChange={() => setShowLogo(!showLogo)}
          />
          <span className="settings-switch-slider"></span>
        </label>
      </div>
    </div>
  );
};

export default AppearanceSettings;
