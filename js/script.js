const global = { currentPage: window.location.pathname };

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

// fetch data from TMDB API
async function fetchAPIData(endPoint) {
  const API_KEY = "3967057704130d3993a0864119ce43bd";
  const API_URL = "https://api.themoviedb.org/3";
  const response = await fetch(`${API_URL}${endPoint}?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
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
      console.log("Shows page");
      break;
    case "/movie-details.html":
      console.log("movie page");
      break;
    case "/tv-details.html":
      console.log("tv page");
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
