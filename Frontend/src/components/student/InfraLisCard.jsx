import React, { useState } from 'react';
import { motion } from 'framer-motion';

function InfraLisCard({ name, location, capacity, condition, description, availability, index }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className='w-full h-[5vh] bg-white/12 rounded-2xl mb-2.5 relative overflow-hidden'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
        >
            <div className='flex justify-between p-2'>
                <div>{index}.</div>
                <div>{name}</div>
                <div>{location}</div>
                <div className={`${availability ? 'text-green-500' : 'text-red-500'}`}>
                    {availability ? 'Available' : 'Unavailable'}
                </div>
            </div>

            {isHovered && (
                <motion.div
                    className='absolute inset-0 bg-black/90 p-4 flex flex-col justify-center items-center text-white'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className='flex gap-5'>
                        <p className='text-sm'><span className='font-semibold'>Capacity:</span> {capacity}</p>
                        <p className='text-sm'><span className='font-semibold'>Condition:</span> {condition}</p>
                        <p className='text-sm'><span className='font-semibold'>Description:</span> {description}</p>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}

export default InfraLisCard;