import React, { useState } from 'react'
import ChipTabs from '@/components/Tabs'
import CompletedReq from './student/History'
import CurrentReq from './student/CurrentReq'
import EquipmentShow from './student/EquipmentShow'
import InfraShow from './student/InfraShow'
import History from './student/History'
import EquipmentList from './student/EquipmentList'
import { useEffect } from 'react'

function StudentDashboard() {

    const [selectedTab, setSelectedTab] = useState('Current Bookings')
    const [showingListing, setShowingListing] = useState(false)
    const [cat_id, setCat_id] = useState();

    const renderComponent = () => {

        if (showingListing) {
            return <EquipmentList cat_id={cat_id} setShowingListing={setShowingListing} />
        }

        switch (selectedTab) {
            case 'Current Bookings':
                return <CurrentReq />;
            case 'Equipments':
                return <EquipmentShow setCat_id={setCat_id} setShowingListing={setShowingListing} />;
            case 'Infrastructure':
                return <InfraShow />;
            case 'History':
                return <History />;
            default:
                return <CurrentReq />;
        }
    }


    return (
        <div className='m-5'>
            <div className={`${
                showingListing 
                ?"hidden"
                :""
            }`}>
                <ChipTabs selected={selectedTab} setSelected={setSelectedTab} />
            </div>
            <div className='bg-white/15 my-20 md:m-10 md:my-20 md:p-5 rounded-xl'>
                {renderComponent()}
            </div>
        </div>
    )
}

export default StudentDashboard
