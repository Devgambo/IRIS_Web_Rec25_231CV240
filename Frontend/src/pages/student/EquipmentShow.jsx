import CatCard from '@/components/student/CategoryCard';
import React, { useEffect, useState } from 'react';
import { useGetCatsQuery } from '@/features/catSliceApi';
import { useAuth } from '@clerk/clerk-react';
import { Loader2 } from 'lucide-react';

function EquipmentShow({ setShowingListing, setCat_id, setCat_img }) {
    const { getToken } = useAuth();
    const [token, setToken] = useState();

    useEffect(() => {
        const fetchToken = async () => {
            const fetchedToken = await getToken();
            setToken(fetchedToken);
        };
        fetchToken();
    }, [getToken]);

    const { data: categoriesData, isLoading } = useGetCatsQuery({
        token,
        type: 'equipment'
    }, { skip: !token });

    const categories = categoriesData?.data?.categories || [];

    if (isLoading) {
        return <>
            <Loader2 className="h-4 w-4 animate-spin" /> Loading Categories...
        </>
    }

    return (
        <div className='m-5 grid grid-cols-1 md:grid-cols-3 gap-6'>
            {categories.length === 0 ? (
                <div className="col-span-3 text-center text-gray-500">No equipment categories found.</div>
            ) : (
                categories.map((category) => (
                    <button
                        key={category._id}
                        onClick={() => {
                            setShowingListing(true);
                            setCat_id(category._id);
                            setCat_img(category.coverImage);
                        }}
                        className="w-full text-left focus:outline-none"
                        aria-label={`Select ${category.name}`}
                    >
                        <CatCard
                            name={category.name}
                            description={category.description}
                            coverImage={category.coverImage || "https://via.placeholder.com/400x200"}
                        />
                    </button>
                ))
            )}
        </div>
    );
}

export default EquipmentShow;
