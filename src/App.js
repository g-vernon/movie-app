import React, { useState, useEffect } from "react";
import MovieList from "./components/MovieList.js";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourites from "./components/AddFavourites.js";
import RemoveFavourites from "./components/RemoveFavourites.js";
import MovieDetails from "./components/MovieDetails.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=6abd81c4`;

    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) setMovies(responseJson.Search);
  };

  const movieSearchById = async (id) => {
    const url = `http://www.omdbapi.com/?i=${id}&apikey=6abd81c4`;

    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Response) {
      setSelectedMovie(responseJson)
    };
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );
    if (movieFavourites) setFavourites(movieFavourites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const showMovieDescription = (movie) => {
    setShowDetails(true);
    movieSearchById(movie.imdbID);
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      <div className="movie-app">
        <div className="posters-wrapper">
          <div className="row">
            <MovieList
              movies={movies}
              handlePosterClick={showMovieDescription}
              handleFavouritesClick={addFavouriteMovie}
              favouriteComponent={AddFavourites}
            />
          </div>
          <div className="row d-flex align-items-center mt-4 mb-4">
            <MovieListHeading heading="Favourites" />
          </div>
          <div className="row">
            <MovieList
              movies={favourites}
              handlePosterClick={showMovieDescription}
              handleFavouritesClick={removeFavouriteMovie}
              favouriteComponent={RemoveFavourites}
            />
          </div>
        </div>
        {showDetails ? 
        <div className="details-panel m-4">
          <MovieDetails movie={selectedMovie} handleClosePanel={setShowDetails}/> 
        </div>
        : null }
      </div>
    </div>
  );
};

export default App;
