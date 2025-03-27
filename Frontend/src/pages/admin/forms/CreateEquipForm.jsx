//TODO: get; All the categories. {we'll need this as options for selecting category and saving data to db}
//TODO: send post; req to create new equipment 
import React, { useState } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Schema for form validation
const equipFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  categoryId: z.string().min(1, "Category is required"), // Changed to string if using Select
  quantity: z.number().min(1, "Quantity must be at least 1"),
  availableQuantity: z.number().min(0, "Available quantity cannot be negative"),
  description: z.string().min(10, "Description should be at least 10 characters"),
});

function CreateEquipForm({ onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  // TODO: Fetch categories from your API
  const [categories, setCategories] = useState([
    { _id: '1', name: 'Cricket' },
    { _id: '2', name: 'Tennis' },
  ]);

  const form = useForm({
    resolver: zodResolver(equipFormSchema),
    defaultValues: {
      name: '',
      categoryId: '',
      quantity: 0,
      availableQuantity: 0,
      description: '',
    }
  });

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      // TODO: Implement your API call
      console.log('Submitting:', values);
      /*
      const response = await axios.post('/api/equipments', {
        ...values,
        categoryId: parseInt(values.categoryId) // Convert back to number if needed
      });
      */
      onSuccess?.();
    } catch (error) {
      console.error('Error creating equipment:', error);
    } finally {
      setIsLoading(false);
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
                <FormLabel>Equipment Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Cricket ball" 
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

          {/* Quantity Field */}
          <FormField
            control={form.control}
            name='quantity'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Quantity*</FormLabel>
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

          {/* Available Quantity Field */}
          <FormField
            control={form.control}
            name='availableQuantity'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available Quantity</FormLabel>
                <FormControl>
                  <Input 
                    type='number' 
                    placeholder="5" 
                    className='bg-gray-800 text-white'
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
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
                    placeholder="Describe the equipment..."
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
                <>
                loading...
                {/* TODO_loader */}
                </>
              ) : 'Create Equipment'}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}

export default CreateEquipForm;
