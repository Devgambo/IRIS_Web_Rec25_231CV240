import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useEReqsByStatusQuery } from '@/features/reqEquipSliceApi'
import { useIReqsByStatusQuery } from '@/features/reqInfraSliceApi';
import ListingCard from '@/components/student/ListingReqCard';
import toast from 'react-hot-toast';
import { useDeleteRequestMutation } from '@/features/reqEquipSliceApi';
import { useDeleteIRequestMutation } from '@/features/reqInfraSliceApi';

function History() {

    const { getToken } = useAuth();
    const [deleteRequest] = useDeleteRequestMutation()
    const [deleteIRequest] = useDeleteIRequestMutation()
    const [token, setToken] = useState();
    useEffect(() => {
        const fetchToken = async () => {
            const fetchedToken = await getToken();
            setToken(fetchedToken);
        };
        fetchToken();
    }, [getToken]);

    const Cstatus = 'completed';
    const Rstatus = 'rejected';
    const clstatus = 'cancelled';

    const {data: ECReqs, isLoading:fetchingECR} = useEReqsByStatusQuery({token, status: Cstatus});
    const {data: ERReqs, isLoading:fetchingERR} = useEReqsByStatusQuery({token, status: Rstatus});
    const {data: ECLReqs, isLoading:fetchingECLR} = useEReqsByStatusQuery({token, status: clstatus});
    const {data: ICReqs, isLoading:fetchingICR} = useIReqsByStatusQuery({token, status: Cstatus});
    const {data: IRReqs, isLoading:fetchingIRR} = useIReqsByStatusQuery({token, status: Rstatus});
    const {data: ICLReqs, isLoading:fetchingICLR} = useIReqsByStatusQuery({token, status: clstatus});

    const handleRemove = async (id, type) => {
        try {
            if (!token) {
                toast.error('Authentication token not available');
                return;
            }
            const toastId = toast.loading('Deleting request...');
            
            if (type === 'equipment') {
                await deleteRequest({ token, id }).unwrap();
            } else if (type === 'infrastructure') {
                await deleteIRequest({ token, id }).unwrap();
            }

            toast.success('Request deleted successfully', { id: toastId });
            
        } catch (error) {
            console.error('Error deleting request:', error);
            toast.error('Failed to delete request');
        }
    };

    const history = [
        ...(ECReqs?.data?.reqs || []).map(req => ({
            ...req,
            type: 'equipment',
            name: req.equipmentId?.name || 'Unknown Equipment'
        })),
        ...(ERReqs?.data?.reqs || []).map(req => ({
            ...req,
            type: 'equipment',
            name: req.equipmentId?.name || 'Unknown Equipment'
        })),
        ...(ICReqs?.data?.reqs || []).map(req => ({
            ...req,
            type: 'infrastructure',
            name: req.infrastructureId?.name || 'Unknown Infrastructure'
        })),
        ...(IRReqs?.data?.reqs || []).map(req => ({
            ...req,
            type: 'infrastructure',
            name: req.infrastructureId?.name || 'Unknown Infrastructure'
        })),
        ...(ICLReqs?.data?.reqs || []).map(req => ({
            ...req,
            type: 'infrastructure',
            name: req.infrastructureId?.name || 'Unknown Infrastructure'
        })),
        ...(ECLReqs?.data?.reqs || []).map(req => ({
            ...req,
            type: 'equipment',
            name: req.infrastructureId?.name || 'Unknown Infrastructure'
        })),
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-6">History:</h1>
            <div className="space-y-4 max-h-[80vh] overflow-scroll">
                {history.length === 0 ? (
                    <div className="text-center text-gray-500">No history found.</div>
                ) : (
                    history.map((req,index) => (
                        <ListingCard
                            key={req._id}
                            index={index + 1}
                            {...req}
                            type={req.type}
                            onRemove={(id)=>handleRemove(id, req.type)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}


export default History;
