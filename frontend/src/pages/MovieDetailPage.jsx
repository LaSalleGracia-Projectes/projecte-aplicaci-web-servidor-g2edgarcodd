import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  Suspense,
  lazy,
  useTransition,
} from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import MainLayout from "../layouts/MainLayout";
import "../styles/components/moviedetail.css";
import { getMovieById } from "../utils/api";
import castData from "../data/castData";

// Componentes con carga diferida para mejorar el rendimiento inicial
const VideoPlayer = lazy(() => import("../components/MovieDetail/VideoPlayer"));
const MovieInfo = lazy(() => import("../components/MovieDetail/MovieInfo"));
const Cast = lazy(() => import("../components/MovieDetail/Cast"));
const Reviews = lazy(() => import("../components/MovieDetail/Reviews"));
const RelatedContent = lazy(() =>
  import("../components/MovieDetail/RelatedContent")
);
const MediaGallery = lazy(() =>
  import("../components/MovieDetail/MediaGallery")
);
// Importar el nuevo componente MovieDetailHero
const MovieDetailHero = lazy(() =>
  import("../components/MovieDetail/MovieDetailHero")
);

// Simulación de detalles avanzados para un objeto completo de API
const enhanceMovieData = (movie) => {
  if (!movie) return null;

  return {
    ...movie,
    budget: "165,000,000 USD",
    revenue: "402,000,000 USD",
    originalLanguage: "en",
    productionCountries: ["Estados Unidos", "Canadá"],
    productionCompanies: [
      {
        id: 1,
        name: "Universal Pictures",
        logo: "https://image.tmdb.org/t/p/w200/2Tc1P3Ac8M479naPp1kYT3izLS5.png",
      },
      {
        id: 2,
        name: "Legendary Pictures",
        logo: "https://image.tmdb.org/t/p/w200/5VK0VmC5hsNBPJ9uPQFGc1dNPaJ.png",
      },
    ],
    awards: [
      {
        name: "Oscar",
        category: "Mejor Fotografía",
        year: "2024",
        winner: true,
      },
      {
        name: "Oscar",
        category: "Mejor Efectos Visuales",
        year: "2024",
        winner: true,
      },
      {
        name: "Globo de Oro",
        category: "Mejor Película Dramática",
        year: "2024",
        nominee: true,
      },
    ],
    crew: [
      { job: "Director", name: movie.director },
      { job: "Guionista", name: "Jon Spaihts" },
      { job: "Fotografía", name: "Greig Fraser" },
      { job: "Música", name: "Hans Zimmer" },
    ],
    streamingAvailability: [
      {
        platform: "Netflix",
        logo: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png",
        subscription: true,
      },
      {
        platform: "HBO Max",
        logo: "https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg",
        subscription: true,
      },
      {
        platform: "Prime Video",
        logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png",
        rental: true,
        price: "3.99€",
      },
    ],
    ratings: [
      { source: "IMDb", value: movie.rating, outOf: "10", icon: "fab fa-imdb" },
      {
        source: "Rotten Tomatoes",
        value: "82",
        outOf: "100",
        icon: "fas fa-tomato",
      },
      {
        source: "Metacritic",
        value: "78",
        outOf: "100",
        icon: "fas fa-chart-bar",
      },
    ],
    keywords: ["espacio", "ciencia ficción", "épico", "futuro", "desierto"],
    parentalRating: "PG-13",
    socialMedia: {
      hashtag: "#DunePelicula",
      twitter: "https://twitter.com/dunemovie",
      instagram: "https://instagram.com/dunemovie",
    },
    trivia: [
      "El rodaje principal tuvo lugar en Hungría y Jordania, con locaciones adicionales en Abu Dhabi.",
      "La película es la segunda adaptación cinematográfica de la novela de Frank Herbert de 1965.",
      "Denis Villeneuve dedicó más de tres años a la preproducción para crear el mundo visual de Dune.",
    ],
    photos: [
      "https://via.placeholder.com/800x450?text=Escena+1",
      "https://via.placeholder.com/800x450?text=Escena+2",
      "https://via.placeholder.com/800x450?text=Escena+3",
      "https://via.placeholder.com/800x450?text=Escena+4",
      "https://via.placeholder.com/800x450?text=Escena+5",
      "https://via.placeholder.com/800x450?text=Escena+6",
    ],
  };
};

// Custom hooks para funcionalidad reutilizable
const useScrollWithParallax = (threshold = 600, factor = 0.5) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    let timeoutId = null;

    const handleScroll = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          const position = window.scrollY;
          setScrollPosition(position);

          if (position < threshold) {
            setParallaxOffset(position * factor);
          }

          timeoutId = null;
        }, 10);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [threshold, factor]);

  return [scrollPosition, parallaxOffset];
};

// Hook personalizado para gestionar favoritos
const useFavorites = (movieId) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("userFavorites")) || [];
    setIsFavorite(favorites.includes(Number(movieId)));
  }, [movieId]);

  const toggleFavorite = useCallback(() => {
    const favorites = JSON.parse(localStorage.getItem("userFavorites")) || [];
    const movieIdNum = Number(movieId);

    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (favId) => favId !== movieIdNum
      );
      localStorage.setItem("userFavorites", JSON.stringify(updatedFavorites));
    } else {
      favorites.push(movieIdNum);
      localStorage.setItem("userFavorites", JSON.stringify(favorites));

      const notification = document.createElement("div");
      notification.className = "toast-notification success";
      notification.innerHTML = `<i class="fas fa-check-circle"></i> ${t(
        "lists.addedToFavorites"
      )}`;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.classList.add("show");
        setTimeout(() => {
          notification.classList.remove("show");
          setTimeout(() => document.body.removeChild(notification), 300);
        }, 2000);
      }, 100);
    }

    setIsFavorite(!isFavorite);
  }, [isFavorite, movieId, t]);

  return [isFavorite, toggleFavorite];
};

function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [isTrailerVisible, setIsTrailerVisible] = useState(false);
  const [scrollPosition, parallaxOffset] = useScrollWithParallax();
  const [isFavorite, toggleFavorite] = useFavorites(id);
  const [showTriviaModal, setShowTriviaModal] = useState(false);
  const [selectedTrivia, setSelectedTrivia] = useState(null);
  const heroRef = useRef(null);
  const headerRef = useRef(null);
  const mainContentRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchMovieData() {
      try {
        setLoading(true);
        setError(false);

        const data = await Promise.all([
          getMovieById(id),
          new Promise((resolve) => setTimeout(resolve, 800)),
        ]);

        if (!isMounted) return;

        if (!data[0]) {
          console.error(`No se encontró película con ID: ${id}`);
          setError("not_found");
          setLoading(false);
          return;
        }

        setMovie(enhanceMovieData(data[0]));
      } catch (error) {
        if (!isMounted) return;
        console.error("Error fetching movie data:", error);
        setError("server_error");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchMovieData();

    window.scrollTo(0, 0);

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleTrailerToggle = useCallback(() => {
    setIsTrailerVisible(!isTrailerVisible);

    if (!isTrailerVisible && heroRef.current) {
      heroRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isTrailerVisible]);

  const handleTriviaClick = useCallback((trivia) => {
    setSelectedTrivia(trivia);
    setShowTriviaModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowTriviaModal(false);
    setTimeout(() => setSelectedTrivia(null), 300);
  }, []);

  const scrollToContent = useCallback(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator
        .share({
          title: movie?.title,
          text: `${t("movieDetail.checkOut")} ${movie?.title}`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(t("common.linkCopied"));
    }
  }, [movie, t]);

  if (loading) {
    return (
      <MainLayout>
        <div className="movie-detail-loading">
          <div className="movie-detail-loading-animation">
            <div className="movie-detail-circle-pulse"></div>
            <div className="movie-detail-circle-pulse delay-1"></div>
            <div className="movie-detail-circle-pulse delay-2"></div>
          </div>
          <h2 className="movie-detail-loading-text">{t("common.loading")}</h2>
          <p className="movie-detail-loading-subtext">
            {t("movieDetail.preparingExperience")}
          </p>
        </div>
      </MainLayout>
    );
  }

  if (error || !movie) {
    return (
      <MainLayout>
        <div className="movie-detail-not-found">
          <div className="movie-detail-error-icon">
            <i className="fas fa-film"></i>
            <div className="movie-detail-error-x">
              <i className="fas fa-times"></i>
            </div>
          </div>
          <h2>
            {error === "not_found"
              ? t("errors.movieNotFound")
              : t("errors.somethingWentWrong")}
          </h2>
          <p>
            {error === "not_found"
              ? t("errors.movieNotFoundDescription")
              : t("errors.serverErrorDescription")}
          </p>
          <div className="movie-detail-error-actions">
            <Link
              to="/explore"
              className="movie-detail-back-to-home-btn movie-detail-primary-action"
            >
              <i className="fas fa-compass"></i> {t("common.exploreMovies")}
            </Link>
            <Link
              to="/"
              className="movie-detail-back-to-home-btn movie-detail-secondary-action"
            >
              <i className="fas fa-home"></i> {t("errors.goHome")}
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="movie-detail-back-to-home-btn movie-detail-tertiary-action"
            >
              <i className="fas fa-redo"></i> {t("errors.tryAgain")}
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const contentType = movie.isSeries ? t("common.series") : t("common.movie");

  const watchTime = new Date().getHours();
  const isDaytime = watchTime > 6 && watchTime < 18;

  return (
    <MainLayout>
      <div className="movie-detail-page">
        <Suspense
          fallback={
            <div className="movie-detail-loading-hero">
              {t("common.loading")}...
            </div>
          }
        >
          <MovieDetailHero
            movie={{
              title: movie.title,
              backdrop_path: movie.backdropPath,
              tagline: movie.tagline,
              overview: movie.description,
              vote_average: movie.rating,
              release_date: movie.year?.toString(),
              runtime: parseInt(movie.duration),
              genres:
                movie.genres &&
                movie.genres.map((genreId) => {
                  const genreNames = [
                    "Fantasía",
                    "Acción",
                    "Drama",
                    "Aventura",
                    "Terror",
                    "Thriller",
                    "Crimen",
                    "Comedia",
                    "Misterio",
                    "Heist",
                    "Psicológico",
                    "Ciencia Ficción",
                  ];
                  return genreNames[genreId - 1] || "Género";
                }),
              director: movie.director,
              starring: movie.starring ? movie.starring.split(", ") : [],
              trailer_key:
                movie.trailerUrl && movie.trailerUrl.includes("?v=")
                  ? movie.trailerUrl.split("?v=")[1]
                  : movie.trailerUrl?.replace(
                      "https://www.youtube.com/embed/",
                      ""
                    ),
              awards:
                movie.awards && movie.awards.length > 0
                  ? movie.awards[0].name + " " + movie.awards[0].category
                  : "",
              poster_path: movie.posterPath,
            }}
          />
        </Suspense>

        <div className="movie-detail-grid" ref={mainContentRef}>
          <aside className="movie-detail-sidebar">
            <div className="movie-detail-poster-container">
              <div className="movie-detail-poster-wrapper">
                <div className="movie-detail-poster-shine"></div>
                <img
                  src={movie.posterPath}
                  alt={movie.title}
                  className="movie-detail-poster"
                  loading="lazy"
                />
                {new Date().getFullYear() - movie.year <= 1 && (
                  <div className="movie-detail-corner-badge movie-detail-new-release">
                    {t("common.newRelease")}
                  </div>
                )}
              </div>
              <div className="movie-detail-badges">
                {movie.rating >= 8.5 && (
                  <div className="movie-detail-badge movie-detail-top-rated">
                    <i className="fas fa-award"></i> {t("movieDetail.topRated")}
                  </div>
                )}
                {movie.rating >= 7.5 && movie.rating < 8.5 && (
                  <div className="movie-detail-badge movie-detail-highly-rated">
                    <i className="fas fa-thumbs-up"></i>{" "}
                    {t("movieDetail.highlyRated")}
                  </div>
                )}
                {movie.parentalRating && (
                  <div className="movie-detail-badge movie-detail-parental-rating">
                    {movie.parentalRating}
                  </div>
                )}
              </div>

              <div className="movie-detail-actions">
                <button className="movie-detail-action-button movie-detail-primary">
                  <i className="fas fa-play"></i> {t("common.watchNow")}
                </button>
                <button
                  className="movie-detail-action-button movie-detail-secondary"
                  onClick={handleTrailerToggle}
                >
                  <i className="fas fa-film"></i> {t("common.watchTrailer")}
                </button>
                <button
                  className={`movie-detail-action-button movie-detail-favorite ${
                    isFavorite ? "active" : ""
                  }`}
                  onClick={toggleFavorite}
                >
                  <i
                    className={isFavorite ? "fas fa-heart" : "far fa-heart"}
                  ></i>
                  {isFavorite
                    ? t("lists.removeFromList")
                    : t("lists.addToList")}
                </button>
              </div>

              <div className="movie-detail-ratings-bar">
                {movie.ratings?.map((rating, index) => (
                  <div className="movie-detail-rating-item-compact" key={index}>
                    <i className={rating.icon}></i>
                    <div className="movie-detail-rating-value">
                      <span className="movie-detail-value">{rating.value}</span>
                      <span className="movie-detail-total">
                        /{rating.outOf}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="movie-detail-streaming-availability">
              <h3 className="movie-detail-sidebar-section-title">
                <i className="fas fa-tv"></i> {t("movieDetail.availableOn")}
              </h3>
              <div className="movie-detail-streaming-platforms">
                {movie.streamingAvailability?.map((platform, index) => (
                  <div className="movie-detail-platform" key={index}>
                    <img
                      src={platform.logo}
                      alt={platform.platform}
                      className="movie-detail-platform-logo"
                      loading="lazy"
                    />
                    <div className="movie-detail-platform-details">
                      <span className="movie-detail-platform-name">
                        {platform.platform}
                      </span>
                      {platform.rental && (
                        <span className="movie-detail-platform-price">
                          {platform.price}
                        </span>
                      )}
                    </div>
                    <button className="movie-detail-platform-watch-btn">
                      {platform.rental ? t("common.rent") : t("common.watch")}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="movie-detail-quick-details">
              <h3 className="movie-detail-sidebar-section-title">
                <i className="fas fa-info-circle"></i>{" "}
                {t("movieDetail.quickDetails")}
              </h3>
              <ul className="movie-detail-quick-details-list">
                <li>
                  <span className="movie-detail-detail-label">
                    {t("movieDetail.director")}
                  </span>
                  <span className="movie-detail-detail-value">
                    {movie.director}
                  </span>
                </li>
                <li>
                  <span className="movie-detail-detail-label">
                    {t("movieDetail.genre")}
                  </span>
                  <span className="movie-detail-detail-value">
                    {movie.genres &&
                      movie.genres.map((genreId, i) => {
                        const genreNames = [
                          "Fantasía",
                          "Acción",
                          "Drama",
                          "Aventura",
                          "Terror",
                          "Thriller",
                          "Crimen",
                          "Comedia",
                          "Misterio",
                          "Heist",
                          "Psicológico",
                          "Ciencia Ficción",
                        ];
                        const genreName = genreNames[genreId - 1] || genreId;
                        return i === 0 ? genreName : `, ${genreName}`;
                      })}
                  </span>
                </li>
                <li>
                  <span className="movie-detail-detail-label">
                    {t("movieDetail.releaseDate")}
                  </span>
                  <span className="movie-detail-detail-value">
                    {movie.year}
                  </span>
                </li>
                {movie.budget && (
                  <li>
                    <span className="movie-detail-detail-label">
                      {t("movieDetail.budget")}
                    </span>
                    <span className="movie-detail-detail-value">
                      {movie.budget}
                    </span>
                  </li>
                )}
                {movie.revenue && (
                  <li>
                    <span className="movie-detail-detail-label">
                      {t("movieDetail.revenue")}
                    </span>
                    <span className="movie-detail-detail-value">
                      {movie.revenue}
                    </span>
                  </li>
                )}
                {movie.productionCountries && (
                  <li>
                    <span className="movie-detail-detail-label">
                      {t("movieDetail.country")}
                    </span>
                    <span className="movie-detail-detail-value">
                      {movie.productionCountries.join(", ")}
                    </span>
                  </li>
                )}
              </ul>
            </div>

            {movie.trivia && movie.trivia.length > 0 && (
              <div className="movie-detail-trivia-container">
                <h3 className="movie-detail-sidebar-section-title">
                  <i className="fas fa-lightbulb"></i>{" "}
                  {t("movieDetail.didYouKnow")}
                </h3>
                <div className="movie-detail-trivia-list">
                  {movie.trivia.slice(0, 1).map((item, index) => (
                    <div
                      className="movie-detail-trivia-item"
                      key={index}
                      onClick={() => handleTriviaClick(item)}
                    >
                      <p>
                        {item.substring(0, 80)}...{" "}
                        <span className="movie-detail-read-more">
                          {t("common.readMore")}
                        </span>
                      </p>
                    </div>
                  ))}
                  {movie.trivia.length > 1 && (
                    <button
                      className="movie-detail-view-all-trivia"
                      onClick={() => navigate(`/movie/${id}/trivia`)}
                    >
                      {t("movieDetail.viewAllTrivia")} ({movie.trivia.length})
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="movie-detail-social-sharing">
              <h3 className="movie-detail-sidebar-section-title">
                <i className="fas fa-share-alt"></i> {t("movieDetail.share")}
              </h3>
              <div className="movie-detail-social-buttons">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="movie-detail-social-button movie-detail-facebook"
                  aria-label="Compartir en Facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${
                    window.location.href
                  }&text=${encodeURIComponent(
                    `${t("movieDetail.checkOut")} ${movie.title}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="movie-detail-social-button movie-detail-twitter"
                  aria-label="Compartir en Twitter"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `${t("movieDetail.checkOut")} ${movie.title} ${
                      window.location.href
                    }`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="movie-detail-social-button movie-detail-whatsapp"
                  aria-label="Compartir en WhatsApp"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
                <button
                  onClick={handleShare}
                  className="movie-detail-social-button movie-detail-copy"
                  aria-label="Copiar enlace o compartir"
                >
                  <i className="fas fa-share"></i>
                </button>
              </div>

              {movie.socialMedia?.hashtag && (
                <div className="movie-detail-hashtag">
                  <span>{movie.socialMedia.hashtag}</span>
                </div>
              )}

              {movie.socialMedia &&
                (movie.socialMedia.twitter || movie.socialMedia.instagram) && (
                  <div className="movie-detail-official-social-links">
                    {movie.socialMedia.twitter && (
                      <a
                        href={movie.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="movie-detail-official-social-link"
                      >
                        <i className="fab fa-twitter"></i>{" "}
                        {t("common.official")} Twitter
                      </a>
                    )}
                    {movie.socialMedia.instagram && (
                      <a
                        href={movie.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="movie-detail-official-social-link"
                      >
                        <i className="fab fa-instagram"></i>{" "}
                        {t("common.official")} Instagram
                      </a>
                    )}
                  </div>
                )}
            </div>
          </aside>

          <main className="movie-detail-main-content">
            <section className="movie-detail-synopsis-section">
              <div className="movie-detail-section-header">
                <h2 className="movie-detail-section-title">
                  {t("movieDetail.synopsis")}
                </h2>
                <div className="movie-detail-content-badges">
                  <span className="movie-detail-content-type-badge">
                    {contentType}
                  </span>
                  {isDaytime ? (
                    <span className="movie-detail-trending-badge">
                      <i className="fas fa-chart-line"></i>{" "}
                      {t("movieDetail.trending")}
                    </span>
                  ) : (
                    <span className="movie-detail-popular-badge">
                      <i className="fas fa-fire"></i> {t("movieDetail.popular")}
                    </span>
                  )}
                </div>
              </div>

              <p className="movie-detail-synopsis-text">{movie.description}</p>

              <div className="movie-detail-genres-container">
                {movie.genres &&
                  movie.genres.map((genreId, index) => {
                    const genreName = [
                      "Fantasía",
                      "Acción",
                      "Drama",
                      "Aventura",
                      "Terror",
                      "Thriller",
                      "Crimen",
                      "Comedia",
                      "Misterio",
                      "Heist",
                      "Psicológico",
                      "Ciencia Ficción",
                    ][genreId - 1];

                    return (
                      <Link
                        key={genreId}
                        to={`/explore?genre=${genreId}`}
                        className="movie-detail-genre-pill"
                      >
                        {t(`genres.${genreName?.toLowerCase()}`) || genreName}
                      </Link>
                    );
                  })}
              </div>

              {movie.keywords && movie.keywords.length > 0 && (
                <div className="movie-detail-keywords-container">
                  {movie.keywords.map((keyword, index) => (
                    <span key={index} className="movie-detail-keyword-tag">
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </section>

            <div className="movie-detail-content-tabs-container">
              <div className="movie-detail-content-tabs">
                <button
                  className={`movie-detail-tab-button ${
                    activeTab === "info" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("info")}
                  aria-label={t("movieDetail.details")}
                >
                  <i className="fas fa-info-circle"></i>{" "}
                  {t("movieDetail.details")}
                </button>
                <button
                  className={`movie-detail-tab-button ${
                    activeTab === "cast" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("cast")}
                  aria-label={t("movieDetail.cast")}
                >
                  <i className="fas fa-users"></i> {t("movieDetail.cast")}
                </button>
                <button
                  className={`movie-detail-tab-button ${
                    activeTab === "reviews" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("reviews")}
                  aria-label={t("movieDetail.reviews")}
                >
                  <i className="fas fa-star-half-alt"></i>{" "}
                  {t("movieDetail.reviews")}
                </button>
                <button
                  className={`movie-detail-tab-button ${
                    activeTab === "media" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("media")}
                  aria-label={t("movieDetail.media")}
                >
                  <i className="fas fa-photo-video"></i>{" "}
                  {t("movieDetail.media")}
                </button>
              </div>

              <div className="movie-detail-tab-content">
                <Suspense
                  fallback={
                    <div className="movie-detail-tab-loading">
                      {t("common.loading")}...
                    </div>
                  }
                >
                  {activeTab === "info" && <MovieInfo movie={movie} />}
                  {activeTab === "cast" && (
                    <Cast movieId={id} castData={castData} />
                  )}
                  {activeTab === "reviews" && <Reviews movieId={id} />}
                  {activeTab === "media" && (
                    <MediaGallery
                      photos={movie.photos}
                      trailerUrl={movie.trailerUrl}
                      posterPath={movie.posterPath}
                    />
                  )}
                </Suspense>
              </div>
            </div>

            {movie.awards && movie.awards.length > 0 && (
              <section className="movie-detail-awards-section">
                <div className="movie-detail-section-header movie-detail-with-gradient">
                  <h2 className="movie-detail-section-title">
                    <i className="fas fa-trophy"></i>{" "}
                    {t("awards.categories.bestPicture")}
                  </h2>
                </div>

                <div className="movie-detail-awards-grid">
                  {movie.awards.map((award, index) => (
                    <div
                      className={`movie-detail-award-card ${
                        award.winner ? "movie-detail-winner-card" : ""
                      }`}
                      key={index}
                    >
                      <div className="movie-detail-award-icon">
                        {award.winner ? (
                          <i className="fas fa-trophy"></i>
                        ) : (
                          <i className="fas fa-award"></i>
                        )}
                      </div>
                      <div className="movie-detail-award-details">
                        <h4 className="movie-detail-award-name">
                          {award.name}
                        </h4>
                        <p className="movie-detail-award-category">
                          {award.category}
                        </p>
                        <div className="movie-detail-award-year">
                          <span>{award.year}</span>
                          <span
                            className={
                              award.winner
                                ? "movie-detail-winner"
                                : "movie-detail-nominee"
                            }
                          >
                            {award.winner
                              ? t("awards.categories.winner")
                              : t("awards.categories.nominee")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {movie.productionCompanies &&
              movie.productionCompanies.length > 0 && (
                <section className="movie-detail-production-companies-section">
                  <h3 className="movie-detail-section-title">
                    <i className="fas fa-building"></i>{" "}
                    {t("movieDetail.productionCompanies")}
                  </h3>
                  <div className="movie-detail-companies-grid">
                    {movie.productionCompanies.map((company) => (
                      <div
                        key={company.id}
                        className="movie-detail-company-card"
                      >
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="movie-detail-company-logo"
                          loading="lazy"
                        />
                        <div className="movie-detail-company-name">
                          {company.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
          </main>
        </div>

        <Suspense
          fallback={
            <div className="movie-detail-section-loading">
              {t("common.loadingRecommendations")}...
            </div>
          }
        >
          <RelatedContent genreIds={movie.genres} currentMovieId={id} />
        </Suspense>

        <section
          className="movie-detail-cta-section"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(13, 17, 23, 0.7), rgba(13, 17, 23, 0.9)), url(${movie.backdropPath})`,
          }}
        >
          <div className="movie-detail-cta-content">
            <h2 className="movie-detail-cta-title">
              {t("movieDetail.enjoyMore")}
            </h2>
            <p className="movie-detail-cta-text">
              {t("movieDetail.subscribeText")}
            </p>
            <button className="movie-detail-cta-button">
              {t("movieDetail.startSubscription")}{" "}
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>

          <div className="movie-detail-cta-devices">
            <i className="fas fa-tv"></i>
            <i className="fas fa-tablet-alt"></i>
            <i className="fas fa-mobile-alt"></i>
            <i className="fas fa-laptop"></i>
          </div>
        </section>

        {showTriviaModal && (
          <div
            className={`movie-detail-trivia-modal ${
              showTriviaModal ? "active" : ""
            }`}
          >
            <div className="movie-detail-trivia-modal-content">
              <button className="movie-detail-close-modal" onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
              <h3>
                <i className="fas fa-lightbulb"></i>{" "}
                {t("movieDetail.didYouKnow")}
              </h3>
              <p>{selectedTrivia}</p>
              <div className="movie-detail-trivia-modal-footer">
                <button
                  className="movie-detail-share-trivia-btn"
                  onClick={handleShare}
                >
                  <i className="fas fa-share-alt"></i> {t("common.shareThis")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default MovieDetailPage;
