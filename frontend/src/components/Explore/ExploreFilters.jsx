import React, { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

function ExploreFilters({
  sortOptions,
  currentSort,
  onSortChange,
  viewMode,
  onViewModeChange,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { t } = useLanguage();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="explore-filters">
      <div className="filters-left">
        <div className="sort-dropdown">
          <button
            className="sort-button"
            onClick={toggleDropdown}
            aria-expanded={dropdownOpen}
          >
            <i className="fas fa-sort"></i>
            <span>{t("explore.sortBy")}: </span>
            <strong>
              {sortOptions.find((opt) => opt.id === currentSort)?.name}
            </strong>
            <i
              className={`fas fa-chevron-down ${dropdownOpen ? "open" : ""}`}
            ></i>
          </button>

          {dropdownOpen && (
            <div className="dropdown-menu">
              {sortOptions.map((option) => (
                <div
                  key={option.id}
                  className={`dropdown-item ${
                    currentSort === option.id ? "active" : ""
                  }`}
                  onClick={() => {
                    onSortChange(option.id);
                    toggleDropdown();
                  }}
                >
                  <span>{option.name}</span>
                  {currentSort === option.id && (
                    <i className="fas fa-check"></i>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="filters-right">
        <button
          className={`view-mode-button ${viewMode === "grid" ? "active" : ""}`}
          onClick={() => viewMode !== "grid" && onViewModeChange()}
          title={t("explore.gridView")}
        >
          <i className="fas fa-th-large"></i>
        </button>
        <button
          className={`view-mode-button ${viewMode === "list" ? "active" : ""}`}
          onClick={() => viewMode !== "list" && onViewModeChange()}
          title={t("explore.listView")}
        >
          <i className="fas fa-list"></i>
        </button>
      </div>
    </div>
  );
}

export default ExploreFilters;
