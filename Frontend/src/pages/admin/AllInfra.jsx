import LisCard from '@/components/admin/LisCard';
import React, { useState } from 'react'
import { motion } from "framer-motion";
import UpdateShowForm from './forms/UpdateShowForm';

function AllInfra() {

    const [selectedInfra, setSelectedInfra] = useState();
    const [modelOpen, setModelOpen] = useState();
    const [loading, setLoading] = useState(false);  //Were're using rtq query


    //hard coded for now ,we'll fetch later
    //TODO: fetch all the infra regarless of category

    const infrastructures = [
        {
            _id:1,
            name:'Batminton crt 1',
            categoryId: {name:'Batminton', kind:'infrastructure'},
            location:'new sports complex',
            capacity:4,
            condition: 'good',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus impedit in sint.',
            timeSlots:['5:00pm','6:00pm','7:00pm','8:00pm'],
            availability:true,
        }
    ]

    const handleEquipClick = (equip)=>{
        setSelectedInfra(equip);
        setModelOpen(true);
    }
    

    //TODO: update equip req
    const handleSubmit = async (formdata)=>{
        console.log('33333')
        console.log('Form submitted:', formData);
        try {
            setLoading(true);
            // Your API call would look like:
            // const response = await axios.put(
            //   `/api/equipment-requests/${selectedRequest._id}`,
            //   formData
            // );
            setModalOpen(false);
          } catch (error) {
            console.error('Error:', error);
          } finally {
            // setLoading(false);
          }
    }

    //TODO: delete equip req
    const handleDelete = async (formdata) =>{
        console.log('696969')
        console.log('we have _id here')
        console.log('Form submitted for delete:', formData);

    }

    return (
        <div className='space-y-3 p-4'>
            {infrastructures.map((equip,index) => (
                <motion.div
                    key = {equip._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }} 
                >
                    <LisCard
                        index={index+1}
                        name={equip.name}
                        CategoryName={equip.categoryId.name}
                        onClick={()=>handleEquipClick(equip)}
                    />

                </motion.div>
            ))}

            <UpdateShowForm
                open={modelOpen}
                onOpenChange={setModelOpen}
                data={selectedInfra}
                onSubmit={handleSubmit}
                onDelete={handleDelete}
                loading={loading}
            />

        </div>
    )
}

export default AllInfra



