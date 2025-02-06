// src/components/RatingStars.js
import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaRegStar } from 'react-icons/fa';

export const RatingStars = ({ rating, onRate, size = "regular" }) => {
  const starSize = size === "large" ? 24 : 16;

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onRate(star)}
          className="focus:outline-none"
        >
          {star <= rating ? (
            <FaStar size={starSize} className="text-yellow-400" />
          ) : (
            <FaRegStar size={starSize} className="text-gray-400" />
          )}
        </motion.button>
      ))}
    </div>
  );
};
