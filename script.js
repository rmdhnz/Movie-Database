const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const movieContainer = document.querySelector(".movie-container");
  fetch(
    "http://www.omdbapi.com/?apikey=2c1ddfdf&s=" + $(".input-keyword").val()
  )
    .then((response) => response.json())
    .then((results) => {
      const movies = results.Search;
      let cards = "";
      movies.forEach((movie) => {
        if (movie.Poster != "N/A") {
          cards += showCards(movie);
        }
      });
      movieContainer.innerHTML = cards;
      const modalDetailButton = document.querySelectorAll(
        ".modal-detail-button"
      );
      modalDetailButton.forEach((btn) => {
        btn.addEventListener("click", function () {
          let imdbid = this.dataset.imdbid;
          fetch("http://www.omdbapi.com/?apikey=2c1ddfdf&i=" + imdbid)
            .then((response) => response.json())
            .then((mv) => {
              const movieDetails = getMovieDetails(mv);
              const detailBody = document.querySelector(".detail-body");
              detailBody.innerHTML = movieDetails;
            });
        });
      });
    });
});

function showCards(m) {
  return `<div class="col-md-3 col-sm-6 mb-3">
            <div class="card">
              <img src="${m.Poster}" class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title">${m.Title}</h5>
                <h6 class="card-subtitle text-muted">${m.Year}</h6>
                <a href="" class="btn btn-warning modal-detail-button" data-bs-toggle="modal"
                data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
              </div>
            </div>
          </div>`;
}

function getMovieDetails(m) {
  return `<div class="col-md-3">
            <img src="${m.Poster}" class="img-fluid" />
          </div>
          <div class="col-md">
            <ul class="list-group">
              <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
              <li class="list-group-item">
                <strong>Director : </strong>${m.Director}
              </li>
              <li class="list-group-item">
                <strong>Actors : </strong>${m.Actors}
              </li>
              <li class="list-group-item">
                <strong>Writer : </strong>${m.Writer}
              </li>
              <li class="list-group-item">
                <strong>Plot : </strong><br />${m.Plot}
              </li>
            </ul>
          </div>`;
}
