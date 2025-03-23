import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input'; // ShadCN Input
import { Button } from '@/components/ui/button'; // ShadCN Button
import { format } from 'date-fns';

// ✅ Zod schema for form validation
const requestSchema = z.object({
    quantity: z.number({ required_error: 'quantity is required' }),
    bookingDate: z.date({ required_error: 'Booking date is required' }),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required'),
});

function ReqForm({ equipment, onClose }) {

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
        console.log('Form submitted:', {
            ...data,
            bookingDate: format(data.bookingDate, 'yyyy-MM-dd'),
        });

        // TODO: Send createEquipReq API call here
        // Example:
        /*
        await axios.post('/api/equipment-request', {
          equipmentId: equipment.id,
          quantity: 1, // Assuming 1 for now, handle quantity if needed
          bookingDate: format(data.bookingDate, 'yyyy-MM-dd'),
          startTime: data.startTime,
          endTime: data.endTime,
          note: data.note,
        });
        */

        onClose();
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
                        className="absolute top-3 right-4 text-red-400 hover:text-red-600 text-2xl"
                    >
                        ❌
                    </button>

                    <h2 className="text-2xl font-bold mb-4 text-white">Request Equipment</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Equipment</label>
                        <p className="bg-zinc-800 text-white p-2 rounded-md border border-zinc-700">{equipment?.name}</p>
                    </div>

                    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            {/* Booking Date / onleft*/}
                            <div>
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
                                    <p className="text-red-500 text-xs mt-1">{errors.bookingDate.message}</p>
                                )}
                            </div>
                            {/* on right */}
                            <div>
                                {/* Start Time */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Start Time</label>
                                    <Input
                                        type="time"
                                        {...register('startTime')}
                                        className="bg-zinc-800 text-white border-zinc-700 focus-visible:ring-1 focus-visible:ring-blue-500"
                                    />
                                    {errors.startTime && (
                                        <p className="text-red-500 text-xs mt-1">{errors.startTime.message}</p>
                                    )}
                                </div>

                                {/* End Time */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">End Time</label>
                                    <Input
                                        type="time"
                                        {...register('endTime')}
                                        className="bg-zinc-800 text-white border-zinc-700 focus-visible:ring-1 focus-visible:ring-blue-500"
                                    />
                                    {errors.endTime && (
                                        <p className="text-red-500 text-xs mt-1">{errors.endTime.message}</p>
                                    )}
                                </div>

                                {/* quantity */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Quantity</label>
                                    <Input
                                        type="Number"
                                        placeholder=""
                                        {...register('quantity')}
                                        className="bg-zinc-800 text-white border-zinc-700 focus-visible:ring-1 focus-visible:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
                        >
                            Submit Request
                        </Button>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default ReqForm;
