import React, { useState } from 'react';
import InfraLisCard from '@/components/InfraLisCard';
import InfraReqForm from '@/components/InfraReqForm';

function InfrastructureList({ cat_id, setShowingListing }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedInfra, setSelectedInfra] = useState(null);

    //TODO:  Hardcoded data based on cat_id (replace with API call later)
    const infraData = {
        1324: [ // Example category ID
            {
                id: 1,
                name: "Cricket Ground",
                location: "Main Campus",
                capacity: 100,
                condition: "good",
                description: "Well-maintained cricket ground with floodlights.",
                timeSlots: ["10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"],
                availability: true,
            },
            {
                id: 2,
                name: "Tennis Court",
                location: "Sports Complex",
                capacity: 4,
                condition: "good",
                description: "Professional tennis court with synthetic surface.",
                timeSlots: ["9:00 AM - 11:00 AM", "3:00 PM - 5:00 PM"],
                availability: true,
            },
        ],
        1764: [ // Another example category ID
            {
                id: 3,
                name: "Football Field",
                location: "East Campus",
                capacity: 22,
                condition: "maintenance",
                description: "Grass football field under maintenance.",
                timeSlots: ["4:00 PM - 6:00 PM"],
                availability: false,
            },
        ],
    };

    //temp
    const infraList = infraData[cat_id] || [];

    const handleInfraClick = (infra) => {
        setSelectedInfra(infra);
        setShowModal(true);
    };

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
                    <button key={infra.id} onClick={() => handleInfraClick(infra)}>
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
                Image here
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
