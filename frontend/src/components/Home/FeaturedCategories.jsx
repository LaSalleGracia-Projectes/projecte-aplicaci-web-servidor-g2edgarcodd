import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import "../../styles/components/featuredcategories.css";

function FeaturedCategories() {
  const { t } = useLanguage();

  // Datos de categorías destacadas
  const featuredCategories = [
    {
      id: "action",
      nameKey: "explore.genreNames.action",
      image: "https://image.tmdb.org/t/p/w1280/628Dep6AxEtDxjZoGP78TsOxYbK.jpg", // Fast & Furious
      count: 148,
    },
    {
      id: "comedy",
      nameKey: "explore.genreNames.comedy",
      image: "https://image.tmdb.org/t/p/w1280/lNp2Ve5YyGT77k2QHpLwSzQmOHJ.jpg", // Superbad
      count: 256,
    },
    {
      id: "scifi",
      nameKey: "explore.genreNames.scifi",
      image: "https://image.tmdb.org/t/p/w1280/jQgadZIlKMIUQrGjUYkUjCTiXQs.jpg", // Dune
      count: 127,
    },
    {
      id: "horror",
      nameKey: "explore.genreNames.horror",
      image: "https://image.tmdb.org/t/p/w1280/bvU4dCfWnNYtEIYPx3kZGD1Cl9K.jpg", // The Conjuring
      count: 98,
    },
    {
      id: "animation",
      nameKey: "explore.genreNames.animation",
      image: "https://image.tmdb.org/t/p/w1280/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg", // Spider-Verse
      count: 104,
    },
  ];

  return (
    <section className="featured-categories-section">
      <div className="section-header">
        <h2>{t("home.popularCategories")}</h2>
        <Link to="/categories" className="see-all">
          {t("common.seeMore")}
        </Link>
      </div>

      <div className="featured-categories-container">
        {featuredCategories.map((category) => (
          <Link
            to={`/category/${category.id}`}
            className="category-card"
            key={category.id}
          >
            <div className="category-image-container">
              <img
                src={category.image}
                alt={t(category.nameKey)}
                className="category-image"
              />
              <div className="category-overlay">
                <h3>{t(category.nameKey)}</h3>
                <p>
                  {t("home.categories.titleCount", { count: category.count })}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default FeaturedCategories;
