import React, {useState} from 'react'
import AllEquips from './admin/AllEquips';
import AllInfra from './admin/AllInfra';
import AllCat from './admin/AllCat';
import Create from './admin/Create';
import ChipTabs from '@/components/Tabs';

function Management() {

    const [selectedTab, setSelectedTab] = useState('Equipments')

    const tabs = ["Equipments", "Infrastructures", "Categories"];

    const renderComponent = ()=>{
        switch(selectedTab){
            case 'Equipments':
                return <AllEquips/>
            case 'Infrastructures':
                return <AllInfra/>
            case 'Categories':
                return <AllCat/>
            default:
                return <AllEquips/>
        }
    }

    return (
        <div className='m-2 mt-16'> 
            <h1 className='m-2 text-2xl font-semibold absolute'>MANAGE EVERYTHING:</h1>
            <ChipTabs className={'w-[90%] md:w-[40%] m-5 p-5'} selected={selectedTab} setSelected={setSelectedTab} tabs={tabs} />
            <div className='p-2 mt-18 m-2 grid grid-cols-1 md:grid-cols-2'>
                <div className='m-2'>{renderComponent()}</div>
                <div className=' p-5 flex justify-center items-center'><Create/></div>
            </div>
        </div>
    )
}

export default Management
