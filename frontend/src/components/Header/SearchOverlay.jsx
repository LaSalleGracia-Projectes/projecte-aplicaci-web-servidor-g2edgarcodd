import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

function SearchOverlay({ active, toggleSearch }) {
  const inputRef = useRef(null);
  const { t, language } = useLanguage();
  const [searchPlaceholder, setSearchPlaceholder] = useState("");

  // Actualizar el placeholder cuando cambie el idioma
  useEffect(() => {
    setSearchPlaceholder(t("common.search"));
  }, [t, language]);

  // Autofocus cuando el overlay está activo
  useEffect(() => {
    if (active && inputRef.current) {
      // Pequeño timeout para asegurar que la animación ha comenzado
      setTimeout(() => {
        inputRef.current.focus();
      }, 300);
    }
  }, [active]);

  // Evitar que el clic en el interior se propague
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("search-overlay")) {
      toggleSearch();
    }
  };

  // Cerrar con la tecla Escape
  const handleKeydown = (e) => {
    if (e.key === "Escape") {
      toggleSearch();
    }
  };

  return (
    <div
      className={`search-overlay ${active ? "active" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="search-box">
        <input
          ref={inputRef}
          type="text"
          placeholder={searchPlaceholder}
          onKeyDown={handleKeydown}
          aria-label={searchPlaceholder}
        />
      </div>
      <div className="close-search" onClick={toggleSearch}>
        <i className="fas fa-times"></i>
      </div>
    </div>
  );
}

export default SearchOverlay;
