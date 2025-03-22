import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ListingCard({ id, equipName, status, date, onComplete, onRemove, adminComment = "No comment yet" }) {
    const [showModal, setShowModal] = useState(false);

    const bgStatus = status === 'pending' ? 'from-yellow-500 to-orange-400'
        : status === 'approved' ? 'from-green-500 to-lime-400'
            : status === 'rejected' ? 'from-red-500 to-pink-400'
                : 'from-blue-500 to-indigo-400';

    const handleRemoveClick = () => {
        setShowModal(true); // Open modal instead of directly removing
    };

    const closeModal = () => {
        setShowModal(false);
    };

    // Animation variants for the card
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    // Animation variants for the modal
    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
    };

    return (
        <>
            {/* Card with motion animation */}
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className={`w-full mb-3 p-2 md:m-3 bg-gradient-to-r ${bgStatus} rounded-lg shadow-md`}
            >
                <div className='text-black grid grid-cols-1 md:grid-cols-12 gap-2 items-center h-full'>
                    <div className='md:col-span-1 flex md:justify-center items-center text-sm font-bold'>
                        {id}
                    </div>
                    <div className='md:col-span-5 flex items-center md:justify-center'>
                        {equipName}
                    </div>
                    <div className='md:col-span-3 flex items-center md:justify-center capitalize'>
                        {status}
                    </div>
                    <div className='md:col-span-2 flex items-center md:justify-center'>
                        {date}
                    </div>
                    {(status === 'approved' || status === 'rejected') && (
                        <button
                            onClick={() => status === 'approved' ? onComplete(id) : handleRemoveClick()}
                            className="cursor-pointer col-span-1 text-xl"
                        >
                            {status === 'approved' ? '✅' : '✖️'}
                        </button>
                    )}
                </div>
            </motion.div>


            {/* Modal with motion animation and black-and-white theme */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="bg-black text-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6 border border-white/20"
                        >
                            <h2 className="text-2xl font-bold mb-4">Request Details</h2>
                            <div className="text-gray-300 space-y-2">
                                <p><span className="font-semibold">Equipment Name:</span> {equipName}</p>
                                <p><span className="font-semibold">Status:</span> {status}</p>
                                <p><span className="font-semibold">Request Date:</span> {date}</p>
                                <p><span className="font-semibold">Rejected Date:</span> 12/25/21</p> {/* Hardcoded for now */}
                                <p><span className="font-semibold">Admin Comment:</span> {adminComment}</p>
                            </div>
                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={closeModal}
                                    className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default ListingCard;

