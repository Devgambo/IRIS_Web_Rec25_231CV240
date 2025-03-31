import ChipTabs from '@/components/Tabs';
import React, { useState } from 'react'
import AllEquipReqPending from './admin/AllEquipReqPending';
import AllInfraReqPending from './admin/AllInfraReqPending';
import Statistics from './admin/Statistics';

function AdminDashboard() {

    const [selectedTab, setSelectedTab] = useState('Current Bookings')

    const tabs = ["Equipments", "Infrastructure"];

    const renderComponent = () => {
        switch (selectedTab) {
            case 'Equipments':
                return <AllEquipReqPending />
            case 'Infrastructure':
                return <AllInfraReqPending />
            default:
                return <AllEquipReqPending />
        }
    }

    return (
        <div className='mt-18 grid md:grid-cols-5 grid-cols-1'>
            <div className='md:col-span-3'>
                <Statistics />
            </div>
            <div className='md:col-span-2'>
                <h1 className='m-5 text-xl font-bold absolute'>Pending Requests:</h1>
                <ChipTabs className={'w-full md:w-[60%] m-6 p-5'} selected={selectedTab} setSelected={setSelectedTab} tabs={tabs} />
                <div className='p-2 mt-18 m-2'>
                    {renderComponent()}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
