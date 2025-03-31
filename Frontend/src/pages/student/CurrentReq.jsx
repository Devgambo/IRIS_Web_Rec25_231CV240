import ListingCard from '@/components/student/ListingReqCard';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import {
    useEReqsByStatusQuery,
    useUpdateRequestMutation
} from '@/features/reqEquipSliceApi';
import {
    useIReqsByStatusQuery,
    useUpdateIRequestMutation
} from '@/features/reqInfraSliceApi';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
function CurrentReq() {
    const { getToken } = useAuth();
    const [token, setToken] = useState();

    // Mutations for updating requests
    const [updateRequest, { isLoading: updatingEquip }] = useUpdateRequestMutation();
    const [updateIRequest, { isLoading: updatingInfra }] = useUpdateIRequestMutation();

    useEffect(() => {
        const fetchToken = async () => {
            const fetchedToken = await getToken();
            setToken(fetchedToken);
        };
        fetchToken();
    }, [getToken]);


    const Pstatus = 'pending';
    const { data: EPReqs, isLoading: fetchingEPR } = useEReqsByStatusQuery({ token, status: Pstatus });
    const { data: IPReqs, isLoading: fetchingIPR } = useIReqsByStatusQuery({ token, status: Pstatus });
    const pendingRequests = [...(EPReqs?.data?.reqs || []), ...(IPReqs?.data?.reqs || [])] || [];


    const Vstatus = 'approved';
    const { data: IVReqs, isLoading: fetchingIVR } = useIReqsByStatusQuery({ token, status: Vstatus });
    const { data: EVReqs, isLoading: fetchingEVR } = useEReqsByStatusQuery({ token, status: Vstatus });


    const verifiedRequests = [
        ...(IVReqs?.data?.reqs || []),
        ...(EVReqs?.data?.reqs || [])
    ] || [];

    // Handle marking a request as completed
    const handleComplete = async (id) => {
        try {

            const isEquipment = verifiedRequests.find(req =>
                req._id === id && req.equipmentId
            );

            const updateData = {
                status: 'completed'
            };

            if (isEquipment) {
                await updateRequest({
                    token,
                    id,
                    data: updateData
                }).unwrap();
            } else {
                await updateIRequest({
                    token,
                    id,
                    data: updateData
                }).unwrap();
            }

            toast.success('Request marked as completed!');
        } catch (error) {
            console.error("Error completing request:", error);
            toast.error('Failed to mark as completed. Please try again.');
        }
    };


    const handleCancel = async (id) => {
        try {
            const isEquipment = pendingRequests.find(req =>
                req._id === id && req.equipmentId
            );

            const updateData = {
                status: 'cancelled'
            };

            if (isEquipment) {
                await updateRequest({
                    token,
                    id,
                    data: updateData
                }).unwrap();
            } else {
                await updateIRequest({
                    token,
                    id,
                    data: updateData
                }).unwrap();
            }

            toast.success('Request cancelled successfully!');
        } catch (error) {
            console.error("Error cancelling request:", error);
            toast.error('Failed to cancel request. Please try again.');
        }
    };


    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
            <div className='rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 m-2 p-6'>
                <h1 className='text-2xl font-semibold mb-6 text-white'>Pending Requests:</h1>
                {fetchingEPR || fetchingIPR ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        fetching...
                    </>
                ) : pendingRequests.length > 0 ? (
                    pendingRequests.map((req, index) => (
                        <ListingCard
                            key={req._id}
                            index={index + 1}
                            {...req}
                            type={req.equipmentId ? 'equipment' : 'infrastructure'}
                            onCancel={handleCancel}
                        />
                    ))
                ) : (
                    <div className="text-gray-400 text-center py-4">No pending requests</div>
                )}
            </div>
            <div className='rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 m-2 p-6'>
                <h1 className='text-2xl font-semibold mb-6 text-white'>Verified/Rejected Requests:</h1>
                {fetchingIVR || fetchingEVR ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        fetching...
                    </>
                ) : verifiedRequests.length > 0 ? (
                    verifiedRequests.map((req, index) => (
                        <ListingCard
                            key={req._id}
                            index={index + 1}
                            {...req}
                            type={req.equipmentId ? 'equipment' : 'infrastructure'}
                            onComplete={handleComplete}
                        />
                    ))
                ) : (
                    <div className="text-gray-400 text-center py-4">No verified/rejected requests</div>
                )}
            </div>
        </div>
    );
}

export default CurrentReq;




