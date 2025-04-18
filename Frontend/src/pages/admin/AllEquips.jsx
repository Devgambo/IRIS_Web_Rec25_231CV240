import LisCard from '@/components/admin/LisCard';
import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import UpdateShowForm from './forms/UpdateShowForm';
import { useAuth } from '@clerk/clerk-react';
import { useGetAllEquipmentsQuery, useUpdateEquipmentMutation, useDeleteEquipmentMutation } from '@/features/equipSliceApi';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

function AllEquips() {
    const { getToken } = useAuth()
    const [selectedEquip, setSelectedEquip] = useState();
    const [modelOpen, setModelOpen] = useState(false);

    const [token, setToken] = useState();
    useEffect(() => {
        const fetchToken = async () => {
            const fetchedToken = await getToken();
            setToken(fetchedToken);
        };
        fetchToken();
    }, [getToken]);

    const { data: AllEquipments, isLoading: fetching } = useGetAllEquipmentsQuery({ token });
    const [updateEquipment, { isLoading: updating }] = useUpdateEquipmentMutation();
    const [deleteEquipment, { isLoading: deleting }] = useDeleteEquipmentMutation();
    const equipments = AllEquipments?.data?.equipments || [];

    const handleEquipClick = (equip) => {
        setSelectedEquip(equip);
        setModelOpen(true);
    }

    const handleSubmit = async (formdata) => {
        try {
            const currToken = await getToken();
            const response = await updateEquipment({ token: currToken, data: formdata, id: formdata.id })
            console.log("response :", response);
            toast.success("Equipment updated!")
            setModelOpen(false);
        } catch (error) {
            toast.error("updation failed!")
            console.error('Error:', error);
        }
    }

    const handleDelete = async (formdata) => {
        try {
            console.log('id:', formdata);
            const currToken = await getToken();
            const response = await deleteEquipment({ token: currToken, id: formdata });
            console.log("response :", response);
            toast.success("Equipment deleted!")
            setModelOpen(false);
        } catch (error) {
            toast.error("deletion failed!")
            console.log(error);
        }
    }

    return (
        <div className='space-y-3 p-4'>
            {fetching &&
                <>
                    <Loader2 className="h-4 w-4 animate-spin" /> fetching...
                </>
            }

            {equipments.map((equip, index) => (
                <motion.div
                    key={equip._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                    <LisCard
                        index={index + 1}
                        name={equip.name}
                        CategoryName={equip.categoryId.name}
                        onClick={() => handleEquipClick(equip)}
                    />


                </motion.div>
            ))}

            <UpdateShowForm
                open={modelOpen}
                onOpenChange={setModelOpen}
                data={selectedEquip}
                onSubmit={handleSubmit}
                onDelete={handleDelete}
                loading={updating || deleting}
            />

        </div>
    )
}

export default AllEquips


