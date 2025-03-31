import React, { useEffect, useState } from 'react';
import InfraLisCard from '@/components/student/InfraLisCard';
import InfraReqForm from '@/components/student/InfraReqForm';
import { useAuth } from '@clerk/clerk-react';
import { useGetInfrastructuresQuery } from '@/features/infraSliceApi';

function InfrastructureList({ cat_id, setShowingListing , cat_img}) {
    
    const [showModal, setShowModal] = useState(false);
    const [selectedInfra, setSelectedInfra] = useState(null);

    const { getToken } = useAuth();
    const [token, setToken] = useState();
    useEffect(() => {
        const fetchToken = async () => {
            const fetchedToken = await getToken();
            setToken(fetchedToken);
        };
        fetchToken();
    }, [getToken]);

    const { data: Infra, isLoading } = useGetInfrastructuresQuery({ token, cat_id })

    const infraList = Infra?.data?.allInfras || [];

    const handleInfraClick = (infra) => {
        setSelectedInfra(infra);
        setShowModal(true);
    };

    if (isLoading) {
        return <div className="m-5 text-center">Loading infrastructure...</div>;
    }

    return (
        <div className='relative grid md:grid-cols-2'>
            <div className='w-full p-2 flex flex-col'>
                <button className='cursor-pointer' onClick={() => setShowingListing(false)}>
                    <div className='rounded-full p-2 absolute top-0 right-0 text-2xl bg-white/11'>❌</div>
                </button>

                <div className='w-full text-xl mb-5 m-2 font-bold'>Infrastructure:</div>
                <div className='w-full p-5 flex justify-between text-sm text-white/15'>
                    <p>No.</p>
                    <p>Name</p>
                    <p>Location</p>
                    <p>Availability</p>
                </div>

                {infraList.map((infra, index) => (
                    <button key={infra._id} onClick={() => handleInfraClick(infra)}>
                        <InfraLisCard
                            name={infra.name}
                            location={infra.location}
                            capacity={infra.capacity}
                            condition={infra.condition}
                            description={infra.description}
                            availability={infra.availability}
                            index={index + 1}
                        />
                    </button>
                ))}
            </div>

            <div className='p-2 bg-white/5 flex justify-center align-middle items-center'>
                <img src={cat_img} alt="catImg" />
            </div>

            {/* Modal */}
            {showModal && selectedInfra && (
                <InfraReqForm
                    infra={selectedInfra}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}

export default InfrastructureList;
