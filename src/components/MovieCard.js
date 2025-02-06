// src/components/MovieCard.js
import React from "react";
import { motion } from "framer-motion";

const MovieCard = ({ movie, onClick }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)",
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      onClick={onClick}
      className="relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg cursor-pointer group"
    >
      {/* Movie Poster */}
      <div className="aspect-[2/3]">
        <motion.img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover rounded-lg group-hover:brightness-75 transition duration-500"
        />
      </div>

      {/* Movie Info */}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-500">
        <h3 className="text-sm font-bold text-white truncate">{movie.title}</h3>
        <div className="flex items-center text-yellow-400 mt-1">
          <span className="text-xs">{movie.rating.toFixed(1)}</span>
          <span className="text-xxs ml-1">/ 10</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
