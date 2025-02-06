import React, { createContext, useContext, useState } from 'react';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [ratings, setRatings] = useState({});

  const addToWatchlist = (movie) => {
    if (!watchlist.some(m => m.id === movie.id)) {
      setWatchlist(prev => [...prev, { ...movie, dateAdded: new Date() }]);
    }
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist(prev => prev.filter(m => m.id !== movieId));
  };

  const rateMovie = (movieId, rating) => {
    setRatings(prev => ({ ...prev, [movieId]: rating }));
  };

  return (
    <MovieContext.Provider value={{
      watchlist,
      ratings,
      addToWatchlist,
      removeFromWatchlist,
      rateMovie
    }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
