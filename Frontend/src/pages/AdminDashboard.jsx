import ChipTabs from '@/components/Tabs';
import React, { useState } from 'react'
import AllEquipReqPending from './admin/AllEquipReqPending';
import AllInfraReqPending from './admin/AllInfraReqPending';
import Statistics from './admin/Statistics';

function AdminDashboard() {

    const [selectedTab, setSelectedTab] = useState('Current Bookings')

    const tabs = ["Equipments", "Infrastructure" ];

    const renderComponent = () => {
        switch(selectedTab){
            case 'Equipments':
                return <AllEquipReqPending/>
            case 'Infrastructure':
                return <AllInfraReqPending/>
            default:
                return <AllEquipReqPending/>
        }
    }

    return (
        <div className=' w-full mt-16 h-screen'>
            {/* <div>
                <Statistics/>
            </div> */}
            <h1 className='m-2 text-2xl font-semibold absolute'>Pending Requests:</h1>
            <ChipTabs className={'w-[90%] md:w-[25%] m-5 p-5'} selected={selectedTab} setSelected={setSelectedTab} tabs={tabs} />
            <div className='p-2 mt-18 m-2'>
                {renderComponent()}
            </div>
        </div>
    )
}
export default AdminDashboard
