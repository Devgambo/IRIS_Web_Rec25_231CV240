import LisCard from '@/components/LisCard'
import React from 'react'

function EquipmentList({ cat_id, setShowingListing }) {

    //we have cat_id :)



    return (
        <div className='relative grid md:grid-cols-2'>
            <div className='w-full p-2 flex flex-col'>
                <button className='cursor-pointer' onClick={() => setShowingListing(false)}><div className='absolute top-0 right-0 text-2xl bg-white/11'>❌</div></button>
                <div className='w-full text-xl mb-5 m-2 font-bold'>Equipments:</div>
                <LisCard />
                <LisCard />
                <LisCard />
                <LisCard />
                <LisCard />
                <LisCard />
                <LisCard />
            </div>
            <div className='p-2'>
                
            </div>
        </div>
    );
}

export default EquipmentList
