import LisCard from '@/components/admin/LisCard';
import React, { useState } from 'react'
import { motion } from "framer-motion";
import UpdateShowForm from './forms/UpdateShowForm';

function AllCat() {

    const [selectedCat, setSelectedCat] = useState();
    const [modelOpen, setModelOpen] = useState(false);
    const [loading, setLoading] = useState();  //Were're using rtq query


    //hard coded for now ,we'll fetch later
    //TODO: fetch all the cats
    const cats = [
        {
            _id:1,
            name:'Cricket',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus impedit in sint.',
            kind:'equipment'
        }
    ]

    const handleCatClick = (cat)=>{
        setSelectedCat(cat);
        setModelOpen(true);
    }
    

    //TODO: update cat req
    const handleSubmit = async (formdata)=>{
        console.log('Form submitted:', formdata);
        try {
            setLoading(true);
            // Your API call would look like:
            // const response = await axios.put(
            //   `/api/cat-requests/${selectedRequest._id}`,
            //   formData
            // );
            setModelOpen(false);
          } catch (error) {
            console.error('Error:', error);
          } finally {
            // setLoading(false);
          }
    }

    //TODO: delete cat req
    const handleDelete = async (formdata) =>{
        console.log('we have _id here')
        console.log('Form submitted for delete:', formdata);

    }

    return (
        <div className='space-y-3 p-4'>
            {cats.map((cat,index) => (
                <motion.div
                    key = {cat._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }} 
                >
                    <LisCard
                        index={index+1}
                        name={cat.name}
                        kind={cat.kind}
                        onClick={()=>handleCatClick(cat)}
                    />

                </motion.div>
            ))}

            <UpdateShowForm
                open={modelOpen}
                onOpenChange={setModelOpen}
                data={selectedCat}
                onSubmit={handleSubmit}
                onDelete={handleDelete}
                loading={loading}
            />

        </div>
    )
}

export default AllCat


