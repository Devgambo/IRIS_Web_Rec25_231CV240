import LisCard from '@/components/student/EquipLisCard';
import React, { useState } from 'react';
import ReqForm from '@/components/student/EquipReqForm'

function EquipmentList({ cat_id, setShowingListing }) {

    const [showModal, setShowModal] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState(null);

//TODO: we'll sent a get request to get all the equipments from a perticular category

    const equipmentData = {
        1324: [ // Cricket Equipment
            { id: 1, name: "Cricket Ball", availableQuantity: 15, condition: "Good", description: "Leather cricket balls for practice and matches." },
            { id: 2, name: "Cricket Bat", availableQuantity: 8, condition: "Excellent", description: "Willow cricket bats for professional use." },
            { id: 3, name: "Batting Gloves", availableQuantity: 10, condition: "Good", description: "Padded gloves for batting." },
        ],
        1764: [ // Football Gear
            { id: 4, name: "Football", availableQuantity: 20, condition: "Good", description: "Size 5 football for matches." },
            { id: 5, name: "Shin Guards", availableQuantity: 12, condition: "Excellent", description: "Protective shin guards for players." },
        ],
        1254: [ // Badminton Rackets
            { id: 6, name: "Badminton Racket", availableQuantity: 5, condition: "Good", description: "Lightweight rackets for beginners." },
            { id: 7, name: "Shuttlecocks", availableQuantity: 50, condition: "Excellent", description: "Feather shuttlecocks for professional play." },
        ],
        1354: [ // Tennis Courts
            { id: 8, name: "Tennis Racket", availableQuantity: 6, condition: "Good", description: "Graphite rackets for advanced players." },
            { id: 9, name: "Tennis Balls", availableQuantity: 30, condition: "Good", description: "Pressurized tennis balls for matches." },
        ],
    };

    //temp
    const equipmentList = equipmentData[cat_id] || [];

    const handleEquipmentClick = (equipment) => {
        setSelectedEquipment(equipment);
        setShowModal(true);
    };

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

                {equipmentList.map((equipment, index) => (
                    <button key={equipment.id} onClick={() => handleEquipmentClick(equipment)}>
                        <LisCard
                            name={equipment.name}
                            availableQuantity={equipment.availableQuantity}
                            condition={equipment.condition}
                            description={equipment.description}
                            index={index + 1}
                        />
                    </button>
                ))}
            </div>

            <div className='p-2 bg-white/5 flex justify-center align-middle items-center'>
                Image here
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
