const global = { currentPage: window.location.pathname };

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}
function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

// highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    // console.log(link.getAttribute("href"));
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
// Display 20 most popular movies
async function displayPopularMovies() {
  const movieContainer = document.querySelector(".movie-container");
  const { results } = await fetchAPIData("/movie/popular");
  console.log(results);
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">`
                : `<img src="../images/no-image.jpg" class="card-img-top" alt="${movie.title}">`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
  `;
    document.querySelector("#popular-movies").appendChild(div);
  });
}

// Display 20 most popular tv shows
async function displayPopularTvShows() {
  const { results } = await fetchAPIData("/tv/popular");
  console.log(results);
  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
            ${
              show.poster_path
                ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.name}">`
                : `<img src="../images/no-image.jpg" class="card-img-top" alt="${show.name}">`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${show.first_air_date}</small>
            </p>
          </div>
  `;
    document.querySelector("#popular-shows").appendChild(div);
  });
}

function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = 0;
  overlayDiv.style.left = 0;
  overlayDiv.style.zIndex = -1;
  overlayDiv.style.opacity = 0.1;

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
}

// Display movie details
async function displayMovieDetails() {
  const movieId = window.location.search.split("=")[1];
  const movieDetails = await fetchAPIData(`/movie/${movieId}`);
  console.log(movieId, movieDetails);
  displayBackgroundImage("movie", movieDetails.backdrop_path);
  const div = document.createElement("div");
  div.innerHTML = `<div class="details-top">
          <div>
             ${
               movieDetails.poster_path
                 ? `<img src="https://image.tmdb.org/t/p/w500${movieDetails.poster_path}" class="card-img-top" alt="${movieDetails.title}">`
                 : `<img src="../images/no-image.jpg" class="card-img-top" alt="${movieDetails.title}">`
             }
          </div>
          <div>
            <h2>${movieDetails.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
            ${movieDetails.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movieDetails.release_date}</p>
            <p>
            ${movieDetails.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movieDetails.genres
                .map((genre) => `<li>${genre.name}</li>`)
                .join("")}
            </ul>
            <a href="${
              movieDetails.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
              movieDetails.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
              movieDetails.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movieDetails.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${
              movieDetails.status
            }</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movieDetails.production_companies.map(
            (company) => `<span>${company.name}</span>`
          )}</div>
        </div>`;

  document.querySelector("#movie-details").appendChild(div);
}

// Display tv show details
async function displayShowsDetails() {
  const showId = window.location.search.split("=")[1];
  const show = await fetchAPIData(`/tv/${showId}`);
  displayBackgroundImage("show", show.backdrop_path);
  const div = document.createElement("div");
  div.innerHTML = `<div class="details-top">
          <div>
            ${
              show.poster_path
                ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.title}">`
                : `<img src="../images/no-image.jpg" class="card-img-top" alt="${show.title}">`
            }
          </div>
          <div>
            <h2>Show Name</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
            <a href="${
              show.homepage
            }" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${
              show.number_of_episodes
            }</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${
                show.last_episode_to_air.name
              }
            </li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies.map(
            (company) => `<span>${company.name}</span>`
          )}</div>
        </div>`;

  document.querySelector("#show-details").appendChild(div);
}

// fetch data from TMDB API
async function fetchAPIData(endPoint) {
  const API_KEY = "3967057704130d3993a0864119ce43bd";
  const API_URL = "https://api.themoviedb.org/3";
  showSpinner();
  const response = await fetch(`${API_URL}${endPoint}?api_key=${API_KEY}`);
  const data = await response.json();
  hideSpinner();
  return data;
}

function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//init app
function init() {
  //get current page
  const currentPage = global.currentPage;
  switch (currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      break;
    case "/shows.html":
      displayPopularTvShows();
      break;
    case "/movie-details.html":
      displayMovieDetails();
      break;
    case "/tv-details.html":
      displayShowsDetails();
      // console.log("tv details page");
      break;
    case "/search.html":
      console.log("search page");
      break;
    default:
      console.log("Page not found");
  }
  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
