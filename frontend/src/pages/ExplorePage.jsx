import React, { useState, useEffect, useRef } from "react";
import {
  useSearchParams,
  useNavigate,
  useLocation,
  NavLink,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import StreamingProviders from "../components/Explore/StreamingProviders";
import ExploreFilters from "../components/Explore/ExploreFilters";
import GenreSelector from "../components/Explore/GenreSelector";
import MovieCard from "../components/MovieGrid/MovieCard";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/components/explorepage.css";

// Datos simulados para el ejemplo
import moviesData from "../data/movieData";

function ExplorePage() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeProvider, setActiveProvider] = useState("all");
  const [activeGenre, setActiveGenre] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' o 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const [contentType, setContentType] = useState("all"); // 'all', 'films', 'series'
  const exploreSectionRef = useRef(null);

  // Géneros disponibles
  const genres = [
    { id: "all", name: "all" },
    { id: "action", name: "action" },
    { id: "comedy", name: "comedy" },
    { id: "drama", name: "drama" },
    { id: "horror", name: "horror" },
    { id: "scifi", name: "scifi" },
    { id: "fantasy", name: "fantasy" },
    { id: "romance", name: "romance" },
    { id: "thriller", name: "thriller" },
    { id: "animation", name: "animation" },
  ];

  // Proveedores de streaming
  const providers = [
    { id: "all", name: "all" },
    { id: "netflix", name: "Netflix", logo: "/assets/logos/netflix.svg" },
    { id: "prime", name: "Prime Video", logo: "/assets/logos/prime.svg" },
    { id: "hbo", name: "HBO Max", logo: "/assets/logos/hbo.svg" },
    { id: "disney", name: "Disney+", logo: "/assets/logos/disney.svg" },
    { id: "apple", name: "Apple TV+", logo: "/assets/logos/apple.svg" },
    { id: "movistar", name: "Movistar+", logo: "/assets/logos/movistar.svg" },
    { id: "filmin", name: "Filmin", logo: "/assets/logos/filmin.svg" },
  ];

  // Opciones para ordenar
  const sortOptions = [
    { id: "popular", name: "popular" },
    { id: "recent", name: "recent" },
    { id: "rating", name: "rating" },
    { id: "a-z", name: "a-z" },
  ];

  // Detectar el tipo de contenido según la URL
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/films")) {
      setContentType("films");
    } else if (path.includes("/series")) {
      setContentType("series");
    } else {
      setContentType("all");
    }
  }, [location.pathname]);

  useEffect(() => {
    // Simulamos la carga de películas
    const timer = setTimeout(() => {
      // Filtrar los datos según el tipo de contenido
      let initialData;

      if (contentType === "films") {
        initialData = moviesData.filter((item) => item.type === "film");
      } else if (contentType === "series") {
        initialData = moviesData.filter((item) => item.type === "series");
      } else {
        initialData = moviesData;
      }

      setMovies(initialData);
      setFilteredMovies(initialData);
      setIsLoading(false);
    }, 1000);

    // Verificar parámetros de URL
    const provider = searchParams.get("provider") || "all";
    const genre = searchParams.get("genre") || "all";
    const sort = searchParams.get("sort") || "popular";

    setActiveProvider(provider);
    setActiveGenre(genre);
    setSortBy(sort);

    // Efecto de aparición al cargar
    document.querySelectorAll(".fade-in-element").forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("visible");
      }, 100 * index);
    });

    return () => clearTimeout(timer);
  }, [searchParams, contentType]);

  // Efecto para el filtrado
  useEffect(() => {
    let result = [...movies];

    // Filtrar por proveedor
    if (activeProvider !== "all") {
      result = result.filter((movie) =>
        movie.providers?.includes(activeProvider)
      );
    }

    // Filtrar por género
    if (activeGenre !== "all") {
      result = result.filter((movie) => movie.genres?.includes(activeGenre));
    }

    // Ordenar películas
    switch (sortBy) {
      case "recent":
        result.sort(
          (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
        );
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "a-z":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default: // 'popular' por defecto
        result.sort((a, b) => b.popularity - a.popularity);
    }

    // Actualizar URL
    setSearchParams({
      provider: activeProvider,
      genre: activeGenre,
      sort: sortBy,
    });

    setFilteredMovies(result);
    // Resetear la paginación cuando cambian los filtros
    setCurrentPage(1);
  }, [activeProvider, activeGenre, sortBy, movies, setSearchParams]);

  const handleProviderChange = (providerId) => {
    setActiveProvider(providerId);
    setCurrentPage(1);
    // Desplazarse suavemente al principio de los resultados
    exploreSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleGenreChange = (genreId) => {
    setActiveGenre(genreId);
    setCurrentPage(1);
    exploreSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSortChange = (sortId) => {
    setSortBy(sortId);
  };

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
  };

  // Cambiar entre tipo de contenido
  const handleContentTypeChange = (type) => {
    const basePath = "/explore";
    let path;

    switch (type) {
      case "films":
        path = `${basePath}/films`;
        break;
      case "series":
        path = `${basePath}/series`;
        break;
      default:
        path = basePath;
    }

    navigate(path + location.search);
  };

  // Paginación
  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const indexOfLastMovie = currentPage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: exploreSectionRef.current.offsetTop - 100,
      behavior: "smooth",
    });
  };

  // Obtener el título y subtítulo según el tipo de contenido
  const getPageTitle = () => {
    switch (contentType) {
      case "films":
        return t("explore.filmsTitle");
      case "series":
        return t("explore.seriesTitle");
      default:
        return t("explore.title");
    }
  };

  const getPageSubtitle = () => {
    switch (contentType) {
      case "films":
        return t("explore.filmsSubtitle");
      case "series":
        return t("explore.seriesSubtitle");
      default:
        return t("explore.subtitle");
    }
  };

  // Obtener la imagen de fondo según el tipo de contenido
  const getBackgroundImage = () => {
    switch (contentType) {
      case "films":
        return "https://www.themoviedb.org/t/p/original/8pjWz2lt29KkuuvpF8rG8Ec5nKZ.jpg";
      case "series":
        return "https://www.themoviedb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg";
      default:
        return "https://www.themoviedb.org/t/p/original/7tCVM57Z57fV5nFAmm2nDyfdWFZ.jpg";
    }
  };

  return (
    <MainLayout>
      <div className="explore-page">
        {/* Sección Hero con efecto parallax */}
        <section className="explore-hero">
          <div
            className="parallax-bg"
            style={{ backgroundImage: `url('${getBackgroundImage()}')` }}
          ></div>
          <div className="hero-content">
            <h1 className="fade-in-element">{getPageTitle()}</h1>
            <p className="fade-in-element">{getPageSubtitle()}</p>
          </div>
        </section>

        {/* Tabs para navegar entre tipos de contenido */}
        <section className="content-type-tabs fade-in-element">
          <div className="content-tabs-container">
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                `content-tab ${
                  isActive && location.pathname === "/explore" ? "active" : ""
                }`
              }
              end
            >
              <div className="tab-icon-wrapper">
                <i className="fas fa-th"></i>
              </div>
              <span>{t("explore.allContent")}</span>
            </NavLink>
            <NavLink
              to="/explore/films"
              className={({ isActive }) =>
                `content-tab ${isActive ? "active" : ""}`
              }
            >
              <div className="tab-icon-wrapper">
                <i className="fas fa-film"></i>
              </div>
              <span>{t("explore.films")}</span>
            </NavLink>
            <NavLink
              to="/explore/series"
              className={({ isActive }) =>
                `content-tab ${isActive ? "active" : ""}`
              }
            >
              <div className="tab-icon-wrapper">
                <i className="fas fa-tv"></i>
              </div>
              <span>{t("explore.series")}</span>
            </NavLink>
          </div>
        </section>

        {/* Proveedores de streaming */}
        <section className="streaming-providers-section fade-in-element">
          <h2>{t("explore.streamingProviders")}</h2>
          <StreamingProviders
            providers={providers.map((provider) => ({
              ...provider,
              name: provider.id === "all" ? t("common.all") : provider.name,
            }))}
            activeProvider={activeProvider}
            onProviderSelect={handleProviderChange}
          />
        </section>

        {/* Filtros y selector de géneros */}
        <section className="explore-main" ref={exploreSectionRef}>
          <div className="explore-filters-container fade-in-element">
            <ExploreFilters
              sortOptions={sortOptions.map((option) => ({
                ...option,
                name: t(`explore.sortOptions.${option.name}`),
              }))}
              currentSort={sortBy}
              onSortChange={handleSortChange}
              viewMode={viewMode}
              onViewModeChange={toggleViewMode}
            />
          </div>

          <div className="explore-content-container">
            <aside className="genre-sidebar fade-in-element">
              <GenreSelector
                genres={genres.map((genre) => ({
                  ...genre,
                  name: t(`explore.genreNames.${genre.name}`),
                }))}
                activeGenre={activeGenre}
                onGenreSelect={handleGenreChange}
              />
            </aside>

            <div className="explore-results">
              {isLoading ? (
                <div className="loading-container fade-in-element">
                  <div className="spinner"></div>
                  <p>{t("common.loading")}</p>
                </div>
              ) : (
                <>
                  <div className="results-info fade-in-element">
                    <p>
                      {t("explore.showing")} <span>{currentMovies.length}</span>{" "}
                      {t("explore.of")} <span>{filteredMovies.length}</span>{" "}
                      {t("explore.titles")}
                    </p>
                  </div>

                  <div className={`movies-container ${viewMode}`}>
                    {currentMovies.length > 0 ? (
                      currentMovies.map((movie, index) => (
                        <div
                          key={movie.id}
                          className="movie-card-container fade-in-element"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <MovieCard
                            title={movie.title}
                            description={movie.description}
                            image={movie.image}
                            contentType={movie.type} // Pasar el tipo para mostrar un icono o badge
                          />
                        </div>
                      ))
                    ) : (
                      <div className="no-results fade-in-element">
                        <i className="fas fa-search-minus"></i>
                        <h3>{t("explore.noResultsFound")}</h3>
                        <p>{t("explore.tryModifyingFilters")}</p>
                      </div>
                    )}
                  </div>

                  {/* Paginación */}
                  {totalPages > 1 && (
                    <div className="pagination fade-in-element">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="pagination-arrow"
                        aria-label={t("common.previous")}
                      >
                        <i className="fas fa-chevron-left"></i>
                      </button>

                      {[...Array(totalPages)].map((_, index) => {
                        // Lógica para mostrar solo algunas páginas si hay muchas
                        const pageNum = index + 1;
                        if (
                          pageNum === 1 ||
                          pageNum === totalPages ||
                          (pageNum >= currentPage - 1 &&
                            pageNum <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={index}
                              onClick={() => paginate(pageNum)}
                              className={`pagination-number ${
                                currentPage === pageNum ? "active" : ""
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        } else if (
                          (pageNum === currentPage - 2 && currentPage > 3) ||
                          (pageNum === currentPage + 2 &&
                            currentPage < totalPages - 2)
                        ) {
                          return (
                            <span key={index} className="pagination-dots">
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}

                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="pagination-arrow"
                        aria-label={t("common.next")}
                      >
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default ExplorePage;
