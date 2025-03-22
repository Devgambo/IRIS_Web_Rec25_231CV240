import CatCard from '@/components/CategoryCard';
import React from 'react';
import { Link } from 'react-router-dom';

function InfraShow() {
    // Hardcoded data for now (replace with fetched data later)
    const categories = [
        {
            name: "Cricket Equipment",
            description: "Bats, balls, and more for cricket enthusiasts.",
            coverImage: "https://media.istockphoto.com/id/1255328634/photo/cricket-leather-ball-resting-on-bat-on-the-stadium-pitch.jpg?s=2048x2048&w=is&k=20&c=5YgTlWqX4GDDcMzS2vLGpbx3PcwuY1a64hlmfo9kfuc=",
        },
        {
            name: "Football Gear",
            description: "Everything you need for a great football match.",
            coverImage: "https://via.placeholder.com/400x200",
        },
        {
            name: "Badminton Rackets",
            description: "High-quality rackets for badminton players.",
            coverImage: "https://via.placeholder.com/400x200",
        },
        {
            name: "Tennis Courts",
            description: "Book tennis courts for your matches.",
            coverImage: "https://via.placeholder.com/400x200",
        },
    ];

    return (
        <div className='m-5 grid grid-cols-1 md:grid-cols-3 gap-6'>
            {categories.map((category, index) => (
                <Link to={'/'}>
                    <CatCard
                        key={index}
                        name={category.name}
                        description={category.description}
                        coverImage={category.coverImage}
                    />
                </Link>
            ))}
        </div>
    );
}

export default InfraShow;
