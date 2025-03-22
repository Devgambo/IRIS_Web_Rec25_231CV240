import ListingCard from '@/components/ListingReqCard';
import React, { useState } from 'react';

function CurrentReq() {

    // Hardcoded for now
    const pendingRequests = [
        { id: 1, equipName: 'Cricket Ball', status: 'pending', date: '12/34/21' },
        { id: 2, equipName: 'Cricket Ball', status: 'pending', date: '12/24/21' },
    ];

    const verifiedRejectedRequests = [
        { id: 3, equipName: 'Cricket Ball', status: 'approved', date: '12/24/21' },
        {
            id: 4,
            equipName: 'Cricket Ball',
            status: 'rejected',
            date: '12/24/21',
            adminComment: "Equipment not available on the requested date."
        },
    ];

    const handleComplete = (id) => {
        console.log("Complete request:", id);
        // TODO: Call API, refresh state, etc.
    };

    const handleRemove = (id) => {
        console.log("Remove request:", id);
        // You can remove it from the list if it's still here or trigger any other logic
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
            <div className='m-2 p-4'>
                <h1 className='m-2 text-2xl font-semibold mb-6'>Pending Requests:</h1>
                {pendingRequests.map(request => (
                    <ListingCard key={request.id} {...request} />
                ))}
            </div>
            <div className='m-2 p-4'>
                <h1 className='m-2 text-2xl font-semibold mb-6'>Verified/Rejected Requests:</h1>
                {verifiedRejectedRequests.map(request => (
                    <ListingCard
                        key={request.id}
                        {...request}
                        onComplete={handleComplete}
                        onRemove={handleRemove} // still needed for now, but modal handles display
                    />
                ))}
            </div>
        </div>
    );
}

export default CurrentReq;

