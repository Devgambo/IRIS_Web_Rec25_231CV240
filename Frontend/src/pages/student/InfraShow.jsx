import CatCard from '@/components/student/CategoryCard';
import React from 'react';

function InfraShow({ setShowingListing, setCat_id }){
    //TODO: Hardcoded data for now (replace with fetched data later)
    const categories = [
        {
            _id:1324,
            name: "Cricket",
            description: "Bats, balls, and more for cricket enthusiasts.",
            coverImage: "https://media.istockphoto.com/id/1255328634/photo/cricket-leather-ball-resting-on-bat-on-the-stadium-pitch.jpg?s=2048x2048&w=is&k=20&c=5YgTlWqX4GDDcMzS2vLGpbx3PcwuY1a64hlmfo9kfuc=",
        },
        {
            _id:1764,
            name: "Football Gear",
            description: "Everything you need for a great football match.",
            coverImage: "https://via.placeholder.com/400x200",
        },
    ];

    return (
        <div className='m-5 grid grid-cols-1 md:grid-cols-3 gap-6'>
            {categories.map((category, index) => (
                <button
                    key={category._id}
                    onClick={() => {
                        setShowingListing(true);
                        setCat_id(category._id);
                        console.log('hit')
                    }}
                    className="w-full text-left focus:outline-none"
                    aria-label={`Select ${category.name}`}
                >
                    <CatCard
                        name={category.name}
                        description={category.description}
                        coverImage={category.coverImage}
                    />
                </button>
            ))}
        </div>
    );
}

export default InfraShow;
