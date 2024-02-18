// Cria um card
function createMovieCard(movie) {
  const listContainer = document.querySelector(".list-container");
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");

  const movieDescription = document.createElement("div");
  movieDescription.classList.add("movie-description");
  const titleDescription = document.createElement("h1");
  titleDescription.classList.add("title-description");
  titleDescription.textContent = "Overview";
  const description = document.createElement("p");
  description.classList.add("description");
  description.textContent = movie.overview;

  movieDescription.appendChild(titleDescription);
  movieDescription.appendChild(description);

  const movieImage = document.createElement("div");
  movieImage.classList.add("movie-image");
  movieImage.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${movie.poster_path}')`;

  const movieInfo = document.createElement("div");
  movieInfo.classList.add("movie-info");
  const movieTitle = document.createElement("p");
  movieTitle.classList.add("movie-title");
  movieTitle.textContent = movie.title;

  movieInfo.appendChild(movieTitle);

  cardContainer.appendChild(movieDescription);
  cardContainer.appendChild(movieImage);
  cardContainer.appendChild(movieInfo);

  return listContainer.appendChild(cardContainer);
}

//  Busca filme
document.addEventListener("DOMContentLoaded", function () {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDRlZDE2MjY4NDMzMzE2MjI3YTlkMjFmZTVmZjRkOSIsInN1YiI6IjY1ZDI1Nzg1YzQzM2VhMDE4N2I1ZThmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GvJ9gInFAoC0wmlFNBXrX3x_ZvY6C8kYQzwR53iVrqM",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      const movies = response.results;

      movies.forEach((movie) => {
        createMovieCard(movie);
      });
    })
    .catch((err) => console.error(err));
});

// Procura filmes
const search = document.querySelector(".search_input");
const listContainer = document.querySelector(".list-container");

search.addEventListener("input", function () {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDRlZDE2MjY4NDMzMzE2MjI3YTlkMjFmZTVmZjRkOSIsInN1YiI6IjY1ZDI1Nzg1YzQzM2VhMDE4N2I1ZThmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GvJ9gInFAoC0wmlFNBXrX3x_ZvY6C8kYQzwR53iVrqM",
    },
  };

  let url = "";
  if (search.value === "") {
    url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  } else {
    url = `https://api.themoviedb.org/3/search/movie?query=${search.value}&language=en-US&page=1`;
  }

  fetch(url, options)
    .then((response) => response.json())
    .then((response) => {
      // Limpa a lista de filmes
      while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.firstChild);
      }

      const movies = response.results;

      movies.forEach((movie) => {
        createMovieCard(movie);
      });
    })
    .catch((err) => console.error(err));
});
