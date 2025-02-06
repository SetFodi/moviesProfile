// src/pages/Movies.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MovieCard from "../components/MovieCard";
import MovieDetails from "../components/MovieDetails";
import { mockMovies } from "../data/movies"; // Ensure this is properly imported
import { FaSearch } from "react-icons/fa";

const genres = ["All", "Drama", "Action", "Comedy", "Thriller", "Sci-Fi"];

const Movies = () => {
  const [filteredMovies, setFilteredMovies] = useState(mockMovies);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Filter Movies Based on Search Query and Genre
  useEffect(() => {
    const filterMovies = () => {
      let movies = mockMovies;

      // Apply genre filter
      if (selectedGenre !== "All") {
        movies = movies.filter((movie) => movie.genre === selectedGenre);
      }

      // Apply search query filter
      if (searchQuery) {
        movies = movies.filter((movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredMovies(movies);
    };

    filterMovies();
  }, [searchQuery, selectedGenre]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="pt-24 p-8 min-h-screen bg-gradient-to-br from-gray-900 to-gray-800"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4 sm:mb-0">
          Explore Movies & TV Shows
        </h2>
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for movies or TV shows..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      {/* Genre Filters */}
      <div className="flex flex-wrap justify-center sm:justify-start space-x-4 mb-8">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded-full mb-2 sm:mb-0 transition-colors duration-300 ${
              selectedGenre === genre
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Movies Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { delayChildren: 0.3, staggerChildren: 0.1 },
          },
        }}
      >
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => setSelectedMovie(movie)}
            />
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">
            No movies or TV shows found. Try another search or category.
          </p>
        )}
      </motion.div>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </motion.div>
  );
};

export default Movies;
