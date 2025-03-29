import LisCard from '@/components/admin/LisCard';
import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import UpdateShowForm from './forms/UpdateShowForm';
import { useAuth } from '@clerk/clerk-react';
import { useGetAllInfrastructuresQuery, useDeleteInfrastructureMutation, useUpdateInfrastructureMutation } from '@/features/infraSliceApi';

function AllInfra() {
    const {getToken} = useAuth();
    const [selectedInfra, setSelectedInfra] = useState();
    const [modelOpen, setModelOpen] = useState();

    const [token, setToken] = useState();
    useEffect(() => {
        const fetchToken = async () => {
            const fetchedToken = await getToken();
            setToken(fetchedToken);
        };
        fetchToken();
    }, [getToken]);

    const {data: AllInfrastructures , isLoading:fetching} = useGetAllInfrastructuresQuery({token});
    const [updateInfrastructure , {isLoading:updating}] = useUpdateInfrastructureMutation();
    const [deleteInfrastructure, {isLoading: deleting}] = useDeleteInfrastructureMutation();

    const infrastructures = AllInfrastructures?.data?.infras || [];

    const handleEquipClick = (equip)=>{
        setSelectedInfra(equip);
        setModelOpen(true);
    }
    
    const handleSubmit = async (formdata)=>{
        try {
            const currToken = await getToken();
            console.log("data:",formdata)
            console.log("id:",formdata.id)
            const response = await updateInfrastructure({token:currToken, data:formdata, id:formdata.id});
            console.log(response);
            setModelOpen(false);
          } catch (error) {
            console.error('Error:', error);
          }
    }

    const handleDelete = async (formdata) =>{
        try {
            console.log('id:', formdata);
            const currToken = await getToken(); 
            const response = await deleteInfrastructure({token:currToken, id:formdata});
            console.log(response);
            setModelOpen(false);
        } catch (error) {
            console.log(error);
        }
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
                loading={updating||deleting}
            />

        </div>
    )
}

export default AllInfra



