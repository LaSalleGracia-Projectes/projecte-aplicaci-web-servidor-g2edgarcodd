import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import "../../styles/components/continuewatching.css";

function ContinueWatching() {
  const { t } = useLanguage();

  // Datos simulados para "Continuar viendo"
  const continueWatchingItems = [
    {
      id: 1,
      titleKey: "continue.items.witcher.title",
      image: "https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04QXh4.jpg",
      progress: 65,
      remainingTimeKey: "continue.items.witcher.remainingTime",
      episode: "T2:E5",
      type: "series",
    },
    {
      id: 2,
      titleKey: "continue.items.dune.title",
      image: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
      progress: 45,
      remainingTimeKey: "continue.items.dune.remainingTime",
      type: "movie",
    },
    {
      id: 3,
      titleKey: "continue.items.strangerThings.title",
      image: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
      progress: 80,
      remainingTimeKey: "continue.items.strangerThings.remainingTime",
      episode: "T4:E3",
      type: "series",
    },
    {
      id: 4,
      titleKey: "continue.items.batman.title",
      image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
      progress: 30,
      remainingTimeKey: "continue.items.batman.remainingTime",
      type: "movie",
    },
  ];

  return (
    <section className="continue-watching-section">
      <div className="section-header">
        <h2>{t("home.continueWatching")}</h2>
        <Link to="/my-list" className="see-all">
          {t("common.seeMore")}
        </Link>
      </div>

      <div className="continue-watching-container">
        {continueWatchingItems.map((item) => (
          <Link
            to={`/${item.type}/${item.id}`}
            className="continue-item"
            key={item.id}
          >
            <div className="continue-image-container">
              <img
                src={item.image}
                alt={t(item.titleKey)}
                className="continue-image"
              />
              <div className="continue-overlay">
                <button className="play-btn">
                  <i className="fas fa-play"></i>
                </button>
                {item.episode && (
                  <span className="episode-badge">{item.episode}</span>
                )}
              </div>
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            </div>
            <div className="continue-info">
              <h3>{t(item.titleKey)}</h3>
              <p>{t(item.remainingTimeKey)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ContinueWatching;
