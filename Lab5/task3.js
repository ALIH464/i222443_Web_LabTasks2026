let movies = [];

function addMovie(title, director, genre, year) {
  movies.push({ title, director, genre, year });
}

function listMovies() {
  return movies
    .map(movie => `${movie.title} (${movie.year}) - ${movie.director} [${movie.genre}]`)
    .join("\n");
}

function searchByDirector(director) {
  return movies.filter(m =>
    m.director.toLowerCase() === director.toLowerCase()
  );
}

function searchByGenre(genre) {
  return movies.filter(m =>
    m.genre.toLowerCase() === genre.toLowerCase()
  );
}
