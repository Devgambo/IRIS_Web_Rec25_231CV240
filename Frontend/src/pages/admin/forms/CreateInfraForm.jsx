import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useAuth } from '@clerk/clerk-react';
import { useGetCatsQuery } from '@/features/catSliceApi';
import { useCreateInfraMutation } from '@/features/infraSliceApi';
import toast from 'react-hot-toast';


// Schema for form validation
const infraFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    categoryId: z.string().min(1, "Category is required"),
    capacity: z.number().min(1, "Capacity must be at least 1"),
    location: z.string().min(2, "Location must be at least 2 characters"),
    timeSlots: z.array(z.string()).min(1, "At least one time slot is required"),
    description: z.string().min(10, "Description should be at least 10 characters"),
});

function CreateInfraForm({ onSuccess }) {
    const { getToken } = useAuth();
    const [token, setToken] = useState();
    const type = 'infrastructure';

    useEffect(() => {
        const fetchToken = async () => {
            const fetchedToken = await getToken();
            setToken(fetchedToken);
        };
        fetchToken();
    }, [getToken]);

    const { data: categoriesData, isLoading: fetchingCat, error: categoryError } = useGetCatsQuery(
        { token, type },
        { skip: !token }
    );

    const categories = categoriesData?.data?.categories || [];
    const [createInfra, {isLoading}] = useCreateInfraMutation();

    const form = useForm({
        resolver: zodResolver(infraFormSchema),
        defaultValues: {
            name: '',
            categoryId: '',
            capacity: 0,
            location: '',
            timeSlots: [],
            description: '',
        }
    });

    const onSubmit = async (values) => {
        try {
            console.log('Submitting:', values);
            const payload = {...values , categoryId: values.categoryId};
            console.log("payload: ",payload);
            const currentToken = await getToken();
            const response = await createInfra({
                data:payload,
                token: currentToken
            }).unwrap();

            console.log(response)
            toast.success("Infra created successfully")
            form.reset();
            onSuccess?.();
        } catch (error) {
            toast.error("Error while creating infra")
            console.error('Error creating infrastructure:', error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    {/* Name Field */}
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Infrastructure Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Cricket ground"
                                        className='bg-gray-800 text-white'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Category Field */}
                    <FormField
                        control={form.control}
                        name='categoryId'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger className='bg-gray-800 text-white'>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className='bg-gray-800 text-white'>
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category._id}
                                                value={category._id}
                                                className='hover:bg-gray-700'
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Time Slots Field */}
                    <FormField
                        control={form.control}
                        name="timeSlots"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Time Slots</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter time slots (one per line)
Example:
5:00pm
6:00pm
7:00pm"

                                        className="min-h-[100px] bg-gray-800 text-white"
                                        // value={field.value ? field.value.join('\n') : ''} //{BUG}
                                        onChange={(e) => {
                                            const rawText = e.target.value; // Preserve the actual input
                                            const slots = rawText.split('\n').map((slot) => slot.trim()).filter(Boolean);
                                            field.onChange(slots);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                                <p className="text-xs text-gray-400 mt-1">Enter each time slot on a new line</p>
                            </FormItem>
                        )}
                    />

                    {/* Capacity Field */}
                    <FormField
                        control={form.control}
                        name='capacity'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Total Capacity</FormLabel>
                                <FormControl>
                                    <Input
                                        type='number'
                                        placeholder="10"
                                        className='bg-gray-800 text-white'
                                        {...field}
                                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Location Field */}
                    <FormField
                        control={form.control}
                        name='location'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="New Sports Complex"
                                        className='bg-gray-800 text-white'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Description Field */}
                    <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Describe the infrastructure..."
                                        className='min-h-[100px] bg-gray-800 text-white'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className='flex justify-end pt-4'>
                        <Button
                            type="submit"
                            className='bg-emerald-600 hover:bg-emerald-700'
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Creating...
                                </div>
                            ) : 'Create Infrastructure'}
                        </Button>
                    </div>
                </form>
            </Form>
        </motion.div>
    );
}

export default CreateInfraForm;