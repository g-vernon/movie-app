import React from "react";


const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent;
  return (
    <>
      {props.movies.filter((movie, index) => movie.Poster !== "N/A").map((movie, index) => (
        <div key={index} onClick={()=>props.handlePosterClick(movie)} className="image-container d-flex justify-content-start m-3">
          <img src={movie.Poster} alt="movie"></img>
          <div onClick={()=>props.handleFavouritesClick(movie)} className="overlay d-flex align-items-center justify-content-center">
            <FavouriteComponent/>
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
