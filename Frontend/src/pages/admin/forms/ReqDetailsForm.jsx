import React, { useEffect } from "react";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";


const RequestDetailsForm = ({
  open,
  onOpenChange,
  requestData,
  onSubmit,
  loading,
}) => {
  const form = useForm({
    defaultValues: {
      studentName: requestData?.userId?.name || "",
      equipmentName: requestData?.equipmentId?.name || "",
      infraName: requestData?.infraId?.name || "",
      quantity: requestData?.quantity || 0,
      bookingDate: requestData?.bookingDate?.split("T")[0] || "",
      startTime: requestData?.startTime || "",
      endTime: requestData?.endTime || "",
      timeSlot: requestData?.timeSlot || "",
      adminComment: requestData?.adminComment || "",
    },
  });

  useEffect(() => {
    if (requestData) {
      form.reset({
        studentName: requestData?.userId?.name || "",
        equipmentName: requestData?.equipmentId?.name || "",
        infraName: requestData?.infraId?.name || "",
        quantity: requestData?.quantity || 0,
        bookingDate: requestData?.bookingDate?.split("T")[0] || "",
        startTime: requestData?.startTime || "",
        endTime: requestData?.endTime || "",
        timeSlot: requestData?.timeSlot || "",
        adminComment: requestData?.adminComment || "",
      });
    }
  }, [requestData, form]);

  const handleSubmit = (status) => {
    const formData = form.getValues();
    console.log(formData)
    onSubmit({
      ...formData,
      status: status // 'approved' or 'rejected'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-black/95 text-white">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl">Request Details</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <div className="space-y-4 mt-4 text-white/60">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="studentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Name</FormLabel>
                      <FormControl>
                        <Input {...field} disabled className="bg-gray-700 text-white" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {requestData?.infraId?.name &&
                  <FormField
                  control={form.control}
                  name="infraName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Infrastructure</FormLabel>
                      <FormControl>
                        <Input {...field} disabled className="bg-gray-700 text-white" />
                      </FormControl>
                    </FormItem>
                  )}
                />}

                {requestData?.equipmentId?.name &&
                  <FormField
                  control={form.control}
                  name="equipmentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Equipment</FormLabel>
                      <FormControl>
                        <Input {...field} disabled className="bg-gray-700 text-white" />
                      </FormControl>
                    </FormItem>
                  )}
                />}

              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {requestData?.quantity &&
                  <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="number" 
                          disabled 
                          className="bg-gray-700 text-white"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />}

                <FormField
                  control={form.control}
                  name="bookingDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Booking Date</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input {...field} disabled className="bg-gray-700  text-white" />
                        </FormControl>
                        <Calendar className="absolute right-3 top-3 h-4 w-4 opacity-50" />
                      </div>
                    </FormItem>
                  )}
                />

                {requestData?.startTime &&
                  <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input {...field} disabled className="bg-gray-700 text-white" />
                        </FormControl>
                        <Clock className="absolute right-3 top-3 h-4 w-4 opacity-50" />
                      </div>
                    </FormItem>
                  )}
                />}
                {requestData?.endTime &&
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input {...field} disabled className="bg-gray-700 text-white" />
                        </FormControl>
                        <Clock className="absolute right-3 top-3 h-4 w-4 opacity-50" />
                      </div>
                    </FormItem>
                  )}
                />}
                {requestData?.timeSlot &&
                <FormField
                  control={form.control}
                  name="timeSlot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Slot</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input {...field} disabled className="bg-gray-700 text-white" />
                        </FormControl>
                        <Clock className="absolute right-3 top-3 h-4 w-4 opacity-50" />
                      </div>
                    </FormItem>
                  )}
                />}
              </div>

              <FormField
                control={form.control}
                name="adminComment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Comment</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Add any comments or notes..."
                        className="min-h-[100px] bg-black/85 text-white"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => handleSubmit("rejected")}
                  disabled={loading}
                >
                  Reject
                </Button>
                <Button
                  type="button"
                  onClick={() => handleSubmit("approved")}
                  disabled={loading}
                >
                  Approve
                </Button>
              </div>
            </div>
          </Form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestDetailsForm;