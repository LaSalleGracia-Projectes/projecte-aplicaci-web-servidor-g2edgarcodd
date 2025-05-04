import movieData from "../data/movieData";

// Simulación de API para obtener datos
export const getMovieById = async (id) => {
  console.log(`Buscando película con ID: ${id}, tipo: ${typeof id}`); // Para depuración

  return new Promise((resolve) => {
    // Simulamos una petición de red con tiempo menor para mejorar la UX
    setTimeout(() => {
      // Convertir el ID a string y a número para comparar de ambas formas
      const idStr = String(id);
      const idNum = Number(id);

      // Buscar por cualquier tipo de coincidencia
      const movie = movieData.find(
        (m) =>
          m.id === id ||
          m.id === idStr ||
          m.id === idNum ||
          String(m.id) === idStr ||
          Number(m.id) === idNum
      );

      console.log(`Película encontrada:`, movie); // Para depuración
      resolve(movie);
    }, 400);
  });
};

export const getMoviesByGenre = async (genreId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredMovies = movieData.filter((movie) =>
        movie.genres.includes(genreId)
      );
      resolve(filteredMovies);
    }, 800);
  });
};

export const searchMovies = async (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const searchResults = movieData.filter(
        (movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase()) ||
          movie.description.toLowerCase().includes(query.toLowerCase())
      );
      resolve(searchResults);
    }, 800);
  });
};

export const getTrendingMovies = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Aquí simplemente devolveríamos los primeros 10 por ejemplo
      const trending = movieData.slice(0, 10);
      resolve(trending);
    }, 800);
  });
};
