import React, { useState } from "react";
import { motion } from "framer-motion";
import ReqCard from "@/components/admin/reqCard";
import RequestDetailsForm from "./forms/ReqDetailsForm";
// import { useToast } from "@/components/ui/use-toast";

function AllInfraReqPending() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);  //use this which fetching the data()
//   const { toast } = useToast();

  // Mock data - replace with your actual data fetching logic
  const infraReqs = [
    {
      _id: "1",
      userId: { name: "Jane Smith" },
      infraId: { name: "Football Ground" },
      bookingDate: "2023-12-24T00:00:00.000Z",
      timeSlot: "5:30pm",
      status: "pending",
    },
    {
      _id: "2", 
      userId: { name: "Alex Johnson" },
      infraId: { name: "Basketball Court" },
      bookingDate: "2023-12-25T00:00:00.000Z",
      timeSlot: "6:30pm",
      status: "pending",
    },
    {
      _id: "3",
      userId: { name: "Sam Wilson" },
      infraId: { name: "Tennis Court" },
      bookingDate: "2023-12-26T00:00:00.000Z",
      timeSlot: "7:30pm",
      status: "pending",
    }
  ];

  const handleReqClick = (req) => {
    setSelectedRequest(req);
    setModalOpen(true);
  };

  //TODO: api to update the status
  const handleSubmit = async (formData) => {
    console.log('Form submitted:', formData);
    try {
      setLoading(true);
      // Your API call would look like:
      // const response = await axios.put(
      //   `/api/infra-requests/${selectedRequest._id}`,
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
      {infraReqs.map((req, index) => (
        <motion.div
          key={req._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <ReqCard
            name={req.infraId.name}
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

export default AllInfraReqPending;