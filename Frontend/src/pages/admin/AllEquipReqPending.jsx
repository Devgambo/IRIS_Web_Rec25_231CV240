import React, { useState } from "react";
import { motion } from "framer-motion";
import ReqCard from "@/components/admin/reqCard";
import RequestDetailsForm from "./forms/ReqDetailsForm";
// import { useToast } from "@/components/ui/use-toast";


function AllEquipReqPending() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);            //Were're using rtq query
//   const { toast } = useToast();

  // Mock data - replace with your actual data fetching logic
  const equipmentReqs = [
    {
      _id: "1",
      userId: { name: "John Doe" },
      equipmentId: { name: "Cricket Ball" },
      quantity: 3,
      bookingDate: "2023-12-24T00:00:00.000Z",
      startTime: "10:00",
      endTime: "12:00",
      status: "pending",
    },
  ];

  const handleReqClick = (req) => {
    setSelectedRequest(req);
    setModalOpen(true);
  };


  //TODO: api to update the status
  const handleSubmit = async (formData) => {
    console.log('33333')
    console.log('Form submitted:', formData);
    try {
      setLoading(true);
      // Your API call would look like:
      // const response = await axios.put(
      //   `/api/equipment-requests/${selectedRequest._id}`,
      //   formData
      // );
      setModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="space-y-3 p-4">
      {equipmentReqs.map((req, index) => (
        <motion.div
          key={req._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <ReqCard
            name={req.equipmentId.name}
            quantity={req.quantity}
            bookingDate={new Date(req.bookingDate).toLocaleDateString()}
            index={index + 1}
            onClick={() => handleReqClick(req)}
          />
        </motion.div>
      ))}

      <RequestDetailsForm
        open={modalOpen}
        onOpenChange={setModalOpen}
        requestData={selectedRequest}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default AllEquipReqPending;