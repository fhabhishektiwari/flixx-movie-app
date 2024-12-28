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

//init app
function init() {
  //get current page
  const currentPage = global.currentPage;
  switch (currentPage) {
    case "/":
    case "/index.html":
      console.log("Home page");
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
