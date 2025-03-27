import LisCard from '@/components/admin/LisCard';
import React, { useState } from 'react'
import { motion } from "framer-motion";
import UpdateShowForm from './forms/UpdateShowForm';

function AllEquips() {

    const [selectedEquip, setSelectedEquip] = useState();
    const [modelOpen, setModelOpen] = useState(false);
    const [loading, setLoading] = useState();  //Were're using rtq query


    //hard coded for now ,we'll fetch later
    //TODO: fetch all the equipemnts regarless of cat
    const equipments = [
        {
            _id:1,
            name:'Cricket ball',
            categoryId: {name:'Cricket', kind:'equipment'},
            quantity: 10,
            availableQuantity: 5,
            condition: 'good',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus impedit in sint.'
        }
    ]

    const handleEquipClick = (equip)=>{
        setSelectedEquip(equip);
        setModelOpen(true);
    }
    

    //TODO: update equip req
    const handleSubmit = async (formdata)=>{
        console.log('Form submitted:', formdata);
        try {
            setLoading(true);
            // Your API call would look like:
            // const response = await axios.put(
            //   `/api/equipment-requests/${selectedRequest._id}`,
            //   formData
            // );
            setModelOpen(false);
          } catch (error) {
            console.error('Error:', error);
          } finally {
            // setLoading(false);
          }
    }

    //TODO: delete equip req
    const handleDelete = async (formdata) =>{
        console.log('we have _id here')
        console.log('Form submitted for delete:', formdata);

    }

    return (
        <div className='space-y-3 p-4'>
            {equipments.map((equip,index) => (
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
                data={selectedEquip}
                onSubmit={handleSubmit}
                onDelete={handleDelete}
                loading={loading}

            />

        </div>
    )
}

export default AllEquips


