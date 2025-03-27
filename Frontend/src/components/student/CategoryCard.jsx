import React from 'react';
import { motion } from 'framer-motion';

function CatCard({ name, description, coverImage }) {

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.1 } },
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.04 }}
            className='w-full h-[20vh] md:h-[25vh] bg-cover bg-center rounded-2xl hover:border-2 hover:border-white/50 transition-all duration-100 relative overflow-hidden'
            style={{ backgroundImage: `url(${coverImage})` }}
        >
          
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-white/10"></div>

          
            <div className="absolute bottom-0 left-0 right-0 p-4">
                <h2 className="text-lg font-bold">{name}</h2>
                <p className="text-sm text-white/80 mt-1">{description}</p>
            </div>
        </motion.div>
    );
}

export default CatCard;