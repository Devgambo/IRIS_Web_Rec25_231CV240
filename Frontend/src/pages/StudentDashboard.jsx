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

    const renderComponent = () => {

        if (showingEquipListing) {
            return <EquipmentList cat_id={cat_id} setShowingListing={setShowingEquipListing} />
        }
        if (showingInfraListing) {
            return <InfrastructureList cat_id={cat_id} setShowingListing={setShowingInfraListing} />
        }

        switch (selectedTab) {
            case 'Current Bookings':
                return <CurrentReq />;
            case 'Equipments':
                return <EquipmentShow setCat_id={setCat_id} setShowingListing={setShowingEquipListing} />;
            case 'Infrastructure':
                return <InfraShow setCat_id={setCat_id} setShowingListing={setShowingInfraListing}/>;
            case 'History':
                return <History />;
            default:
                return <CurrentReq />;
        }
    }


    return (
        <div className='m-5'>
            <div className={`${
                showingEquipListing | showingInfraListing
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
