
d3.json("../data/data.json").then((incomingData) => {
    function filterMovieRatings(movie) {
      return movie.imdbRating > 8.9;
    }
  