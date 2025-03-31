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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Schema for form validation
const equipFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  categoryId: z.string().min(1, "Category is required"), // Changed to string if using Select
  quantity: z.number().min(1, "Quantity must be at least 1"),
  availableQuantity: z.number().min(0, "Available quantity cannot be negative"),
  description: z.string().min(10, "Description should be at least 10 characters"),
});


import { useGetCatsQuery } from '@/features/catSliceApi'; 
import { useCreateEquipMutation } from '@/features/equipSliceApi';
import { useAuth } from '@clerk/clerk-react';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';


function CreateEquipForm({ onSuccess }) {
  const {getToken} = useAuth();
  const [token, setToken] = useState(null);
  const type = 'equipment';
  
  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      setToken(fetchedToken);
    };
    fetchToken();
  }, [getToken]);

  const { data: categoriesData, isLoading: fetchingCat, error: categoryError } = useGetCatsQuery(
    { token, type },
    { skip: !token } // Skip query until token is available
  );
  
  const categories = categoriesData?.data?.categories || [];
  const [createEquip, {isLoading}] = useCreateEquipMutation();
  
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
      console.log('Submitting:', values);
      const payload = {...values, categoryId: values.categoryId};
      
      console.log("payload: ", payload);

      const currentToken = await getToken();
      
      const response = await createEquip({
        data: payload,
        token: currentToken
      }).unwrap();
      
      console.log(response);
      toast.success("Equipment created successfully")
      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error('Error creating equipment:', error);
      toast.error("Error while creating equipment")
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
                <Loader2 className="h-4 w-4 animate-spin" />
                creating...
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
