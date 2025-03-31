import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useAuth } from '@clerk/clerk-react';
import { useCreateReqMutation } from '@/features/reqEquipSliceApi';
import toast from 'react-hot-toast';

const requestSchema = z.object({
    quantity: z.coerce.number().min(1, { message: 'Quantity must be at least 1' }).max(100, { message: 'Quantity cannot exceed 100' }),
    bookingDate: z.date({ required_error: 'Booking date is required' }),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required'),
});

function ReqForm({ equipment, onClose }) {

    const { getToken } = useAuth();
    
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        watch,
    } = useForm({
        resolver: zodResolver(requestSchema),
        defaultValues: {
            quantity: 1
        }
    });

    const [bookingDate, setBookingDate] = useState(null);

    const [createReq, { isLoading }] = useCreateReqMutation();

    const watchedQuantity = watch('quantity');
    const isQuantityValid = watchedQuantity <= equipment.availableQuantity;

    const handleFormSubmit = async (data) => {
        try {
            const token = await getToken();
            if (data.quantity > equipment.availableQuantity) {
                toast.error(`Cannot request more than available quantity (${equipment.availableQuantity})`);
                return;
            }
            const requestData = {
                token,
                data: {
                    quantity: data.quantity,
                    bookingDate: format(data.bookingDate, 'yyyy-MM-dd'),
                    startTime: data.startTime,
                    endTime: data.endTime
                },
                eq_id: equipment._id
            };
            
            const response = await createReq(requestData).unwrap();
            console.log("response :",response);
            toast.success("Request Sent!");
            onClose();
            
        } catch (error) {
            toast.error("Error in sending infra req!")
            console.error('Error submitting request:', error);
        }
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
                                    disabled={(date) => date < new Date()}
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
                                <div className="mt-3">
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
                                <div className="mt-3">
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Quantity <span className="text-xs text-gray-400">(Available: {equipment.availableQuantity})</span>
                                    </label>
                                    <Input
                                        type="number"
                                        min="1"
                                        max={equipment.availableQuantity}
                                        {...register('quantity', { valueAsNumber: true })}
                                        className={`bg-zinc-800 text-white border-zinc-700 focus-visible:ring-1 focus-visible:ring-blue-500 ${
                                            !isQuantityValid ? 'border-red-500' : ''
                                        }`}
                                    />
                                    {errors.quantity && (
                                        <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>
                                    )}
                                    {!isQuantityValid && !errors.quantity && (
                                        <p className="text-red-500 text-xs mt-1">
                                            Cannot request more than available quantity
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isLoading || !isQuantityValid}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Submitting...' : 'Submit Request'}
                        </Button>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default ReqForm;
