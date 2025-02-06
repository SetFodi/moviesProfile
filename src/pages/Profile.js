// src/pages/Profile.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useMovies } from "../context/MovieContext";
import { RatingStars } from "../components/RatingStars";
import { FaTrash, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const Profile = () => {
  const { watchlist, ratings, removeFromWatchlist, rateMovie } = useMovies();
  const [filter, setFilter] = useState("all");
  const [isSorted, setIsSorted] = useState(false);

  const filteredWatchlist = watchlist.filter((movie) => {
    if (filter === "rated") return ratings[movie.id];
    if (filter === "unrated") return !ratings[movie.id];
    return true;
  });

  const sortedWatchlist = isSorted
    ? [...filteredWatchlist].sort((a, b) => (ratings[b.id] || 0) - (ratings[a.id] || 0))
    : filteredWatchlist;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-24 px-8 bg-gradient-to-br from-gray-900 to-gray-800"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 mb-8"
        >
          Your Watchlist
        </motion.h2>

        {/* Sorting and Filters */}
        <div className="flex flex-wrap justify-between items-center mb-8">
          {/* Genre Filters */}
          <div className="flex space-x-4 mb-4 sm:mb-0">
            {["all", "rated", "unrated"].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                  filter === filterOption
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </button>
            ))}
          </div>

          {/* Sorting Button */}
          <button
            onClick={() => setIsSorted((prev) => !prev)}
            className="flex items-center px-4 py-2 bg-gray-800 text-gray-400 rounded-full hover:bg-gray-700 hover:text-white transition-colors duration-300"
          >
            {isSorted ? <FaSortAmountUp className="mr-2" /> : <FaSortAmountDown className="mr-2" />}
            Sort by Rating
          </button>
        </div>

        {/* Watchlist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedWatchlist.length > 0 ? (
            sortedWatchlist.map((movie) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800 p-6 rounded-lg flex items-center justify-between shadow-lg"
              >
                <div>
                  <h3 className="text-xl font-bold text-white">{movie.title}</h3>
                  <RatingStars
                    rating={ratings[movie.id] || 0}
                    onRate={(rating) => rateMovie(movie.id, rating)}
                    size="small"
                  />
                </div>
                <button
                  onClick={() => removeFromWatchlist(movie.id)}
                  className="text-red-500 hover:text-white transition-colors duration-300"
                >
                  <FaTrash size={20} />
                </button>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400">No movies in your watchlist.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
