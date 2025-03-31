import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";


const UpdateShowForm = ({
    open,
    onOpenChange,
    data,
    onSubmit,
    onDelete,
    loading,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const form = useForm({
        defaultValues: {
            name: data?.name || "",
            catName: data?.categoryId?.name || "",
            quantity: data?.quantity || "",
            availableQuantity: data?.availableQuantity || "",
            condition: data?.condition || "",
            description: data?.description || "",
            //infra special
            location: data?.location || "",
            capacity: data?.capacity || "",
            timeSlots: Array.isArray(data?.timeSlots) ? data.timeSlots : [],
            availability: data?.availability || "",
            //cat special
            kind: data?.kind || "",
        },
    });

    useEffect(() => {
        if (data) {
            form.reset({
                name: data?.name || "",
                catName: data?.categoryId?.name || "",
                quantity: data?.quantity || "",
                availableQuantity: data?.availableQuantity || "",
                condition: data?.condition || "",
                description: data?.description || "",
                //infra special
                location: data?.location || "",
                capacity: data?.capacity || "",
                timeSlots: Array.isArray(data?.timeSlots) ? data.timeSlots : [],
                availability: data?.availability || "",
                kind: data?.kind || "",
            });
        }
    }, [data, form]);

    const handleUpdate = () => {
        setIsEditing(true);
    };

    //ONSUBMIT() called
    const handleSubmitChanges = () => {
        const formData = form.getValues();
        const id = data._id;
        const payload = {...formData,id}
        console.log("submit triggered", payload)
        onSubmit(payload);
        setIsEditing(false);
    };

    const handleCancel = () => {
        // Reset form to original values
        if (data) {
            form.reset({
                name: data?.name || "",
                catName: data?.categoryId?.name || "",
                quantity: data?.quantity || "",
                availableQuantity: data?.availableQuantity || "",
                condition: data?.condition || "",
                description: data?.description || "",
                //infra special
                location: data?.location || "",
                capacity: data?.capacity || "",
                timeSlots: Array.isArray(data?.timeSlots) ? data.timeSlots : [],
                availability: data?.availability || "",
                kind: data?.kind || "",
            });
        }
        setIsEditing(false);
    };

    const handleDelete = () => {
        setShowDeleteConfirm(true);
    };


    //ONDELETE() called
    const confirmDelete = () => {
        onDelete(data?._id);
        setShowDeleteConfirm(false);
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[600px] bg-black/95 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <DialogHeader>
                            <DialogTitle className="text-2xl">
                                {!data?.categoryId ? "Category details " :
                                    data?.categoryId?.kind === 'equipment' ? "Equipment Details" : "Infrastructure Details"
                                }

                            </DialogTitle>
                        </DialogHeader>

                        <Form {...form}>
                            <div className="space-y-4 mt-4 text-white/60">
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Name field */}

                                    {!(data?.categoryId)
                                        ? (
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Category Name</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                disabled={!isEditing}
                                                                className={`${!isEditing ? "bg-gray-700" : "bg-black/85"} text-white`}
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        )
                                        :
                                        (
                                            data?.categoryId?.kind === 'equipment'
                                                ?
                                                (
                                                    <FormField
                                                        control={form.control}
                                                        name="name"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Equipment Name</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        {...field}
                                                                        disabled={!isEditing}
                                                                        className={`${!isEditing ? "bg-gray-700" : "bg-black/85"} text-white`}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                )
                                                :
                                                (
                                                    <FormField
                                                        control={form.control}
                                                        name="name"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Infrastructure Name</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        {...field}
                                                                        disabled={!isEditing}
                                                                        className={`${!isEditing ? "bg-gray-700" : "bg-black/85"} text-white`}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                )

                                        )
                                    }

                                    {data?.categoryId && (
                                        <FormField
                                            control={form.control}
                                            name="catName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Category</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            disabled={!isEditing}
                                                            className={`${!isEditing ? "bg-gray-700" : "bg-black/85"} text-white`}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    )}
                                    
                                    {/* category special */}
                                    {data?.kind && (
                                        <FormField
                                            control={form.control}
                                            name="kind"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Kind</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            disabled={!isEditing}
                                                            className={`${!isEditing ? "bg-gray-700" : "bg-black/85"} text-white`}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                                    {/* Equipment specific fields */}
                                    {data?.availableQuantity && (
                                        <FormField
                                            control={form.control}
                                            name="availableQuantity"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Available Quantity</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            type="number"
                                                            disabled={!isEditing}
                                                            className={`${!isEditing ? "bg-gray-700" : "bg-black/85"} text-white`}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                    {data?.quantity && (
                                        <FormField
                                            control={form.control}
                                            name="quantity"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Total quantity</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            type="number"
                                                            disabled={!isEditing}
                                                            className={`${!isEditing ? "bg-gray-700" : "bg-black/85"} text-white`}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                    {data?.condition && (
                                        <FormField
                                            control={form.control}
                                            name="condition"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Condition</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            disabled={!isEditing}
                                                            className={`${!isEditing ? "bg-gray-700" : "bg-black/85"} text-white`}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                    {/* Infrastructure specific fields */}
                                    {data?.location && (
                                        <FormField
                                            control={form.control}
                                            name="location"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Location</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            disabled={!isEditing}
                                                            className={`${!isEditing ? "bg-gray-700" : "bg-black/85"} text-white`}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                    {data?.capacity && (
                                        <FormField
                                            control={form.control}
                                            name="capacity"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Capacity</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            type="number"
                                                            disabled={!isEditing}
                                                            className={`${!isEditing ? "bg-gray-700" : "bg-black/85"} text-white`}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    )}


                                    {data?.timeSlots && (
                                        <FormField
                                            control={form.control}
                                            name="timeSlots"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Time Slots</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            {...field}
                                                            disabled={!isEditing}
                                                            value={Array.isArray(field.value) ? field.value.join('\n') : field.value}
                                                            onChange={(e) => {
                                                                const timeSlots = e.target.value.split('\n')
                                                                field.onChange(timeSlots);
                                                                console.log("timeslots:")
                                                                console.log(timeSlots)
                                                            }}
                                                            placeholder="Enter time slots (one per line)"
                                                            className={`min-h-[80px] ${!isEditing ? "bg-gray-700" : "bg-black/85"} text-white`}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-500">
                                                        {isEditing && "Enter each time slot on a new line"}
                                                    </FormMessage>
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                    {data?.availability !== undefined && (
                                        <FormField
                                            control={form.control}
                                            name="availability"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Availability</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            disabled={!isEditing}
                                                            className={`${!isEditing ? "bg-gray-700" : "bg-black/85"} text-white`}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                </div>

                                {/* Description field */}
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    disabled={!isEditing}
                                                    placeholder="Item description..."
                                                    className={`min-h-[100px] ${!isEditing ? "bg-gray-700" : "bg-black/85"} text-white`}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                {/* Action buttons */}
                                <div className="flex justify-end gap-3 pt-4">
                                    {!isEditing ? (
                                        <>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                onClick={handleDelete}
                                                disabled={loading}
                                            >
                                                { loading ? (
                                                    <div className="flex items-center gap-2">
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    Deleting...
                                                </div>
                                                ):'Delete'}
                                            </Button>
                                            <Button
                                                type="button"
                                                onClick={handleUpdate}
                                                disabled={loading}
                                            >
                                                 { loading ? (
                                                    <div className="flex items-center gap-2">
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    Updating...
                                                </div>
                                                ):'Update' }
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className={'text-black'}
                                                onClick={handleCancel}
                                                disabled={loading}
                                            >

                                                Cancel
                                            </Button>
                                            <Button
                                                type="button"
                                                onClick={handleSubmitChanges}
                                                disabled={loading}
                                            >
                                                { loading ? (
                                                    <div className="flex items-center gap-2">
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    Updating...
                                                </div>
                                                ):'Update'}
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Form>
                    </motion.div>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                <AlertDialogContent className="bg-black/95 text-white border border-red-500">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-red-500">Confirm Deletion</AlertDialogTitle>
                        <AlertDialogDescription className="text-white/70">
                            Are you sure you want to delete this {data?.equipmentId ? "equipment" : "infrastructure"}?
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={cancelDelete}
                            className="bg-transparent border border-white/30 text-white hover:bg-white/40"
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-red-500 text-white hover:bg-red-600"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default UpdateShowForm;
