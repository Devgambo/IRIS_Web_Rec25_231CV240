import React, { useState } from 'react'
import ChipTabs from '@/components/Tabs'
import CurrentReq from './student/CurrentReq'
import EquipmentShow from './student/EquipmentShow'
import InfraShow from './student/InfraShow'
import History from './student/History'
import EquipmentList from './student/EquipmentList'
import InfrastructureList from './student/InfrastructureList'

function StudentDashboard() {

    const [selectedTab, setSelectedTab] = useState('Current Bookings')
    const [showingEquipListing, setShowingEquipListing] = useState(false)
    const [showingInfraListing, setShowingInfraListing] = useState(false)
    const [cat_id, setCat_id] = useState();
    const [cat_img, setCat_img] = useState();

    const renderComponent = () => {

        if (showingEquipListing) {
            return <EquipmentList cat_id={cat_id} setShowingListing={setShowingEquipListing} cat_img={cat_img} />
        }
        if (showingInfraListing) {
            return <InfrastructureList cat_id={cat_id} setShowingListing={setShowingInfraListing} cat_img={cat_img} />
        }

        switch (selectedTab) {
            case 'Current Bookings':
                return <CurrentReq />;
            case 'Equipments':
                return <EquipmentShow setCat_id={setCat_id} setShowingListing={setShowingEquipListing} setCat_img={setCat_img} />;
            case 'Infrastructure':
                return <InfraShow setCat_id={setCat_id} setShowingListing={setShowingInfraListing} setCat_img={setCat_img}/>;
            case 'History':
                return <History />;
            default:
                return <CurrentReq />;
        }
    }

    const tabs = ["Current Bookings", "Equipments", "Infrastructure", "History"];

    return (
        <div className='m-5'>
            <div className={`${
                showingEquipListing | showingInfraListing
                ?"hidden"
                :""
            }`}>
                <ChipTabs selected={selectedTab} setSelected={setSelectedTab} tabs={tabs} />
            </div>
            <div className='bg-white/15 my-20 md:m-10 md:my-20 md:p-5 rounded-xl'>
                {renderComponent()}
            </div>
        </div>
    )
}

export default StudentDashboard
