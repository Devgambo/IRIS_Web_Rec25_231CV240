import React from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.02,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    transition: { duration: 0.2 }
  }
};

function ReqCard({ name, quantity, bookingDate, index, onClick }) {
  return (
    <motion.div
      className="w-full bg-white/15 rounded-lg p-3 mb-2 cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 w-full">
          <motion.div 
            className="flex items-center justify-center h-8 w-8 rounded-full bg-white/20"
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-sm font-medium">{index}</span>
          </motion.div>


          <div className="flex-1 grid grid-cols-3 gap-4 items-center">
            <motion.div 
              className="text-left truncate"
              whileHover={{ x: 5 }}
            >
              <p className="font-medium truncate">{name}</p>
            </motion.div>

            {quantity && (
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <span className="px-2 py-1 bg-white/10 rounded-md">
                  Qty: {quantity}
                </span>
              </motion.div>
            )}

            {bookingDate && (
              <motion.div 
                className="text-right"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-sm opacity-80">{bookingDate}</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ReqCard;