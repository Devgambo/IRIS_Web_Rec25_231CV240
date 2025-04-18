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

import { useAuth } from '@clerk/clerk-react';
import { useCreateCatMutation } from '@/features/catSliceApi';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

// Schema for form validation
const categoryFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  kind: z.enum(['equipment', 'infrastructure']),
  coverImage: z.any().optional()
});


function CreateCategoryForm({ onSuccess }) {

  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const form = useForm({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: '',
      description: '',
      kind: 'equipment',
      coverImage: null
    }
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      form.setValue('coverImage', file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const { getToken } = useAuth();
  const [createCat, { isLoading }] = useCreateCatMutation();


  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description || '');
      formData.append('kind', values.kind);
      if (selectedFile) {
        formData.append('coverImage', selectedFile);
      }

      //remove this
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const token = await getToken();

      const response = await createCat({
        data: formData,
        token
      }).unwrap();

      console.log(response);
      toast.success("Category created successfully")
      form.reset();
      setSelectedFile(null);
      setPreviewImage(null);
      onSuccess?.();
    } catch (err) {
      console.error("❌ Error in creating category", err);
      toast.error("Error while creating category")
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className={''}>
                <FormLabel>Category Name</FormLabel>
                <FormControl className={'bg-black text-white/50'}>
                  <Input placeholder="e.g., Cricket Equipments" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl className={'bg-black text-white/50'}>
                  <Textarea
                    placeholder="Brief description of the category"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="kind"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Type*</FormLabel>
                <FormControl className={'bg-black text-white/50'}>
                  <select
                    {...field}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="equipment">Equipment</option>
                    <option value="infrastructure">Infrastructure</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverImage"
            render={() => (
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
                <FormControl>
                  <div className="flex flex-col items-start gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="cursor-pointer bg-black text-white/50"
                      value=""
                    />

                    {previewImage && (
                      <div className="mt-2">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="h-32 w-32 object-cover rounded-md"
                        />
                      </div>
                    )}

                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  creating...
                </>
              ) : (
                'Create Category'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}

export default CreateCategoryForm;