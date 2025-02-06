// src/components/MovieDetails.js
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMovies } from "../context/MovieContext";
import { RatingStars } from "./RatingStars";

const MovieDetails = ({ movie, onClose }) => {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useMovies();
  const isInWatchlist = watchlist.some((m) => m.id === movie.id);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-8 rounded-2xl shadow-2xl w-11/12 max-w-4xl relative overflow-y-auto max-h-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
          >
            ✖
          </motion.button>

          <div className="flex flex-col md:flex-row">
            {/* Movie Poster */}
            <motion.img
              src={movie.poster}
              alt={movie.title}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full md:w-1/3 rounded-xl mb-4 md:mb-0 shadow-lg"
            />

            {/* Movie Details */}
            <div className="md:ml-6 flex-1">
              <motion.h2
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-white mb-4"
              >
                {movie.title}
              </motion.h2>
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-400 mb-6"
              >
                {movie.description}
              </motion.p>
              <p className="text-gray-300 mb-2">
                <strong>Release Date:</strong> {movie.releaseDate}
              </p>
              <p className="text-yellow-400 mb-6">
                <strong>Rating:</strong> {movie.rating.toFixed(1)} / 10
              </p>

              {/* Rating Stars */}
              <div className="mb-4">
                <RatingStars rating={movie.rating / 2} onRate={() => {}} size="large" />
                <span className="text-gray-400 ml-2">User Rating</span>
              </div>

              {/* Add/Remove from Watchlist Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  isInWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie)
                }
                className={`px-6 py-3 font-bold text-lg rounded-lg shadow-lg transition-colors ${
                  isInWatchlist
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MovieDetails;
