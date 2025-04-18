import LisCard from '@/components/admin/LisCard';
import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import UpdateShowForm from './forms/UpdateShowForm';
import { useAuth } from '@clerk/clerk-react';
import { useGetCatsQuery } from '@/features/catSliceApi';
import { useDeleteCatMutation } from '@/features/catSliceApi';
import { useUpdateCatMutation } from '@/features/catSliceApi';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

function AllCat() {
    const { getToken } = useAuth();

    const [token, setToken] = useState();
    useEffect(() => {
        const fetchToken = async () => {
            const fetchedToken = await getToken();
            setToken(fetchedToken);
        };
        fetchToken();
    }, [getToken]);

    const typeE = 'equipment';
    const typeI = 'infrastructure';
    const { data: Equipcat, isLoading: fetchingECat } = useGetCatsQuery({ token, type: typeE }, { skip: !token });
    const { data: Infracat, isLoading: fetchingICat } = useGetCatsQuery({ token, type: typeI }, { skip: !token });
    const [selectedCat, setSelectedCat] = useState();
    const [modelOpen, setModelOpen] = useState(false);

    const [deleteCat, { isLoading: deleting }] = useDeleteCatMutation();
    const [updateCat, { isLoading: updating }] = useUpdateCatMutation()

    const Ecats = Equipcat?.data?.categories || [];
    const Icats = Infracat?.data?.categories || [];

    const handleCatClick = (cat) => {
        setSelectedCat(cat);
        setModelOpen(true);
    }


    const handleSubmit = async (formdata) => {
        console.log('Form submitted:', formdata);
        try {
            const currentToken = await getToken();
            const response = await updateCat({ token: currentToken, id: formdata.id, data: formdata })
            console.log("response :", response);
            toast.success("Category Updated!")
            setModelOpen(false);
        } catch (error) {
            toast.error("Error in updating category")
            console.error('Error:', error);
        }
    }

    const handleDelete = async (formdata) => {
        try {
            console.log('id:', formdata);
            const currentToken = await getToken();
            const response = await deleteCat({ token: currentToken, id: formdata });
            console.log("response :", response);
            toast.success("Category deleted.")
        } catch (err) {
            toast.error("Error in category deletion.")
            console.log(err);
        }
    }

    return (
        <div className='space-y-3 p-4'>
            <div className='w-full text-xl underline'> Equipment Categories: </div>
            {fetchingECat &&
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    fetching...
                </>
            }
            {Ecats.map((cat, index) => (
                <motion.div
                    key={cat._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                    <LisCard
                        index={index + 1}
                        name={cat.name}
                        kind={cat.kind}
                        onClick={() => handleCatClick(cat)}
                    />

                </motion.div>
            ))}

            <div className='w-full text-xl underline'> Infrastructure Categories: </div>

            {fetchingICat &&
                <>
                <Loader2 className="h-4 w-4 animate-spin" />
                fetching...
            </>
            }
            {Icats.map((cat, index) => (
                <motion.div
                    key={cat._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                    <LisCard
                        index={index + 1}
                        name={cat.name}
                        kind={cat.kind}
                        onClick={() => handleCatClick(cat)}
                    />

                </motion.div>
            ))}

            <UpdateShowForm
                open={modelOpen}
                onOpenChange={setModelOpen}
                data={selectedCat}
                onSubmit={handleSubmit}
                onDelete={handleDelete}
                loading={deleting || updating}
            />
        </div>
    )
}

export default AllCat


