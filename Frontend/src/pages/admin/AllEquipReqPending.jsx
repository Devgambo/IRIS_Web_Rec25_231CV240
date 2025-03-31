import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReqCard from "@/components/admin/reqCard";
import RequestDetailsForm from "./forms/ReqDetailsForm";
import { useAuth } from "@clerk/clerk-react";
import { useGetRequestsQuery, useUpdateRequestMutation } from "@/features/reqEquipSliceApi";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function AllEquipReqPending() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { getToken } = useAuth();

  const [token, setToken] = useState();
  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      setToken(fetchedToken);
    };
    fetchToken();
  }, [getToken]);

  const { data: Reqs, isLoading: fetching } = useGetRequestsQuery({ token });
  const [updateRequest, { isLoading: updating }] = useUpdateRequestMutation();

  const equipmentReqs = Reqs?.data?.allreqs || [];

  const handleReqClick = (req) => {
    setSelectedRequest(req);
    setModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      const currentToken = await getToken();
      const response = await updateRequest({ token: currentToken, data: formData, id: selectedRequest._id }).unwrap();
      console.log("response:", response);
      toast.success("Request approved!")
      setModalOpen(false);
    } catch (error) {
      toast.error("could not send request")
      console.error('Error:', error);
    }
  };


  return (
    <div className="space-y-3 p-4">
      {fetching && (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          fetching...
        </>
      )}

      {equipmentReqs.map((req, index) => (
        <motion.div
          key={req._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <ReqCard
            name={req.equipmentId?.name}
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
        loading={updating}
      />
    </div>
  );
}

export default AllEquipReqPending;