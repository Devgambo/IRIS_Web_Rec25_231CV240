import React, { useEffect, useState } from 'react';
import LisCard from '@/components/student/EquipLisCard';
import ReqForm from '@/components/student/EquipReqForm'
import { useAuth } from '@clerk/clerk-react';
import { useGetEquipmentsQuery } from '@/features/equipSliceApi';

function EquipmentList({ cat_id, setShowingListing, cat_img }) {

    const [showModal, setShowModal] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState(null);

    const { getToken } = useAuth();
    const [token, setToken] = useState();
    useEffect(() => {
        const fetchToken = async () => {
            const fetchedToken = await getToken();
            setToken(fetchedToken);
        };
        fetchToken();
    }, [getToken]);

    const { data: Equips, isLoading } = useGetEquipmentsQuery({ token, cat_id });

    const equipmentList = Equips?.data?.allEquips || [];

    const handleEquipmentClick = (equipment) => {
        setSelectedEquipment(equipment);
        setShowModal(true);
    };

    if (isLoading) {
        return <div className="m-5 text-center">Loading equipments...</div>;
    }

    return (
        <div className='relative grid md:grid-cols-2'>
            <div className='w-full p-2 flex flex-col'>
                <button className='cursor-pointer' onClick={() => setShowingListing(false)}>
                    <div className='rounded-full p-2 absolute top-0 right-0 text-2xl bg-white/11'>❌</div>
                </button>

                <div className='w-full text-xl mb-5 m-2 font-bold'>Equipments:</div>
                <div className='w-full p-5 flex justify-between text-sm text-white/15'>
                    <p>No.</p>
                    <p>Name</p>
                    <p>Available Quantity</p>
                </div>
                {equipmentList.length === 0 ? (
                    <div className="col-span-3 text-center text-gray-500">No equipments found.</div>
                ) : (
                    equipmentList.map((equipment, index) => (
                        <button key={equipment._id} onClick={() => handleEquipmentClick(equipment)}>
                            <LisCard
                                name={equipment.name}
                                availableQuantity={equipment.availableQuantity}
                                condition={equipment.condition}
                                description={equipment.description}
                                index={index + 1}
                            />
                        </button>
                    ))
                )}
            </div>

            <div className='p-2 bg-white/5 flex justify-center align-middle items-center'>
                <img src={cat_img} alt="catImg" />
            </div>

            {/* Modal */}
            {showModal && selectedEquipment && (
                <ReqForm
                    equipment={selectedEquipment}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}

export default EquipmentList;
