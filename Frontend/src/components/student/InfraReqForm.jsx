import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Calendar } from '@/components/ui/calendar';

// Zod schema for form validation
const requestSchema = z.object({
    bookingDate: z.date({ required_error: 'Request date is required' }),
    timeSlot: z.string({ required_error: 'Time slot is required' }),
});

function InfraReqForm({ infra, onClose }) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(requestSchema),
    });

    const [bookingDate, setBookingDate] = useState(null);

    const handleFormSubmit = async (data) => {
        //TODO: Send post req to create InfraReq
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-zinc-900 text-white rounded-2xl md:w-[40%] w=full p-6 relative shadow-2xl border border-zinc-800"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 120 }}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-xl text-red-500 hover:text-red-700"
                    >
                        ❌
                    </button>

                    <h2 className="text-2xl font-bold mb-4 text-white">Request Infrastructure</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Infrastructure</label>
                        <p className="bg-zinc-800 text-white p-2 rounded-md border border-zinc-700">{infra.name}</p>
                    </div>

                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-1.5'>
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-300 mb-1">Booking Date</label>
                                <Calendar
                                    mode="single"
                                    selected={bookingDate}
                                    onSelect={(date) => {
                                        setBookingDate(date);
                                        setValue('bookingDate', date);
                                    }}
                                    className="rounded-md border border-zinc-700 bg-zinc-800 text-white"
                                />
                                {errors.bookingDate && (
                                    <p className="text-red-500 text-sm mt-1">{errors.bookingDate.message}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Time Slot</label>
                                <select
                                    {...register('timeSlot')}
                                    className="w-full bg-white/15 rounded px-2 py-1"
                                >
                                    {infra.timeSlots.map((slot, index) => (
                                        <option className=' text-black' key={index} value={slot}>
                                            {slot}
                                        </option>
                                    ))}
                                </select>
                                {errors.timeSlot && (
                                    <p className="text-red-500 text-sm mt-1">{errors.timeSlot.message}</p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full my-5 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                        >
                            Submit Request
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default InfraReqForm;