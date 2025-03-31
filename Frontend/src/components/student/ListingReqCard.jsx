import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

function ListingCard({
    index,
    _id,
    equipmentId,
    infrastructureId,
    quantity,
    bookingDate,
    startTime,
    endTime,
    timeSlot,
    status,
    adminComment,
    type = 'equipment',
    onComplete,
    onRemove,
    onCancel
}) {
    const [showModal, setShowModal] = useState(false);
    const [isCompletingRequest, setIsCompletingRequest] = useState(false);

    // Resource name and type handling
    const resourceName = type === 'equipment'
        ? equipmentId?.name || equipmentId || 'Unknown Equipment'
        : infrastructureId?.name || infrastructureId || 'Unknown Infrastructure';

    // Date and time formatting
    const formattedBookingDate = bookingDate
        ? format(new Date(bookingDate), type === 'equipment' ? 'MMM dd, yyyy' : 'MMM dd, yyyy')
        : 'N/A';

    const timeDisplay = type === 'equipment'
        ? `${startTime} - ${endTime}`
        : timeSlot;

    // Enhanced status styling with vibrant colors for dark theme
    const statusColors = {
        pending: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
        approved: 'bg-green-500/20 text-green-400 border border-green-500/30',
        rejected: 'bg-red-500/20 text-red-400 border border-red-500/30',
        completed: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
        cancelled: 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
    };

    const handleRemoveClick = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    // Handle complete action with loading state
    const handleCompleteClick = async () => {
        setIsCompletingRequest(true);
        try {
            await onComplete(_id);
        } finally {
            setIsCompletingRequest(false);
        }
    };

    // Check if booking is in the past
    const isBookingPast = () => {
        const today = new Date();
        const booking = new Date(bookingDate);

        if (type === 'equipment' && endTime) {
            const [hours, minutes] = endTime.split(':').map(Number);
            booking.setHours(hours, minutes, 0, 0);
        } else {
            booking.setHours(23, 59, 59, 999); // End of day for infrastructure
        }

        return booking < today;
    };

    // Status action buttons
    const getActionButton = () => {
        if (status === 'approved') {
            const isPast = isBookingPast();

            if (isPast) {
                return (
                    <button
                        onClick={handleCompleteClick}
                        disabled={isCompletingRequest}
                        className="px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium border border-purple-500/30 hover:bg-purple-500/30 transition-colors flex items-center"
                    >
                        {isCompletingRequest ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            <>✓ Mark as Used</>
                        )}
                    </button>
                );
            } else {
                return (
                    <div className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium border border-blue-500/30">
                        Upcoming Booking
                    </div>
                );
            }
        } else if (status === 'rejected') {
            return (
                <button
                    onClick={handleRemoveClick}
                    className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-full text-xs font-medium border border-red-500/30 hover:bg-red-500/30 transition-colors"
                >
                    ✕ Details
                </button>
            );
        } else if (status === 'completed') {
            return (
                <div className="px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium border border-purple-500/30">
                    Completed
                </div>
            );
        } else if (status == 'pending') {
            return (
                <button
                    onClick={() => onCancel(_id)}
                    className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-full text-xs font-medium border border-red-500/30 hover:bg-red-500/30 transition-colors"
                >
                    ✕ Cancel
                </button>
            )
        }
        return null;
    };

    return (
        <>
            {/* Card with dark theme styling */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`w-full mb-4 p-4 bg-gray-800/50 rounded-xl border ${status === 'completed' ? 'border-purple-700/30' :
                    status === 'cancelled' ? 'border-red-700/30' :
                        status === 'approved' ? 'border-green-700/30' :
                            status === 'rejected' ? 'border-red-700/30' :
                                'border-gray-700/50'
                    } hover:border-gray-600 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-purple-900/10`}
            >
                <div className="flex items-start">
                    <div className={`flex items-center justify-center h-8 w-8 rounded-full mr-4 font-semibold text-sm ${status === 'completed' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                            status === 'approved' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                                status === 'rejected' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                status === 'cancelled' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                    'bg-purple-500/20 text-purple-400 border-purple-500/30'
                        } border`}>
                        {index}
                    </div>

                    <div className="flex-1">
                        <div className="flex items-baseline">
                            <h3 className="text-lg font-semibold text-white">
                                {resourceName}
                            </h3>
                            {type === 'equipment' && quantity && (
                                <span className="ml-2 text-sm text-gray-400">(x{quantity})</span>
                            )}
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className={`text-xs px-2.5 py-1 rounded-full ${statusColors[status] || 'bg-gray-600/50 text-gray-300'}`}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </span>
                            <span className="text-sm text-gray-400">
                                {formattedBookingDate}
                            </span>
                        </div>

                        {timeDisplay && (
                            <div className="mt-1.5 text-sm text-gray-400 flex items-center">
                                <svg className="w-4 h-4 mr-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {timeDisplay}
                            </div>
                        )}
                    </div>

                    <div className="ml-2">
                        {getActionButton()}
                    </div>
                </div>
            </motion.div>
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-70 backdrop-blur-sm z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-gray-900 rounded-xl border border-gray-700 shadow-xl w-full max-w-md p-6"
                        >
                            <h2 className="text-xl font-bold mb-5 text-white flex items-center">
                                <span className={`flex items-center justify-center h-7 w-7 rounded-full mr-3 text-sm border ${status === 'rejected' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                        'bg-purple-500/20 text-purple-400 border-purple-500/30'
                                    }`}>
                                    {index}
                                </span>
                                Request Details
                            </h2>

                            <div className="space-y-3.5 text-gray-300">
                                <div className="flex">
                                    <span className="font-medium text-gray-400 w-32">Resource:</span>
                                    <span className="text-white">{resourceName}</span>
                                </div>

                                {type === 'equipment' && quantity && (
                                    <div className="flex">
                                        <span className="font-medium text-gray-400 w-32">Quantity:</span>
                                        <span className="text-white">{quantity}</span>
                                    </div>
                                )}

                                <div className="flex">
                                    <span className="font-medium text-gray-400 w-32">Status:</span>
                                    <span className={`${statusColors[status] || 'bg-gray-600/50'} px-2.5 py-1 rounded-full text-xs`}>
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </span>
                                </div>

                                <div className="flex">
                                    <span className="font-medium text-gray-400 w-32">Booking Date:</span>
                                    <span className="text-white">{formattedBookingDate}</span>
                                </div>

                                <div className="flex">
                                    <span className="font-medium text-gray-400 w-32">Time Slot:</span>
                                    <span className="text-white">{timeDisplay}</span>
                                </div>

                                <div className="pt-1">
                                    <span className="font-medium text-gray-400">Admin Comment:</span>
                                    <div className="mt-2 bg-gray-800/50 p-3 rounded-lg border border-gray-700/50 text-gray-300">
                                        {adminComment || 'No comments provided'}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end mt-6 space-x-3">
                                {status === 'rejected' && (
                                    <button
                                        onClick={() => {
                                            onRemove(_id);
                                            closeModal();
                                        }}
                                        className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-colors"
                                    >
                                        Remove
                                    </button>
                                )}
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
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