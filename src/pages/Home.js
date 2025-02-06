// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFilm, FaArrowRight } from "react-icons/fa";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-3xl"
      >
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 mb-6">
          Welcome to MovieApp
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Discover thousands of movies, rate your favorites, and build your ultimate watchlist!
        </p>
        <div className="flex space-x-4">
          <Link to="/movies">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700"
            >
              <FaFilm className="mr-2" />
              Explore Movies
            </motion.button>
          </Link>
          <Link to="/profile">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-6 py-3 bg-gray-700 text-white font-bold rounded-lg shadow-lg hover:bg-gray-800"
            >
              Go to Profile
              <FaArrowRight className="ml-2" />
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
