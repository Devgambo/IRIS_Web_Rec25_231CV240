import React, { useState } from 'react';
import { motion } from 'framer-motion';


function History() {

    const [history, setHistory] = useState([
        {
            id: 1,
            equipName: 'Cricket Bat',
            status: 'completed',
            requestDate: '2025-03-01',
            returnDate: '2025-03-05',
            adminComment: '',
        },
        {
            id: 2,
            equipName: 'Football',
            status: 'rejected',
            requestDate: '2025-03-10',
            approvedDate: '2025-03-11',
            adminComment: 'Not available during the requested slot',
        },
        {
            id: 3,
            equipName: 'Badminton Racket',
            status: 'completed',
            requestDate: '2025-02-15',
            returnDate: '2025-02-16',
            adminComment: '',
        },
    ]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-6">History:</h1>
            <div className="space-y-4">
                {history.length === 0 ? (
                    <div className="text-center text-gray-500">No history found.</div>
                ) : (
                    history.map((item) => (
                        <HistoryCard key={item.id} {...item} />
                    ))
                )}
            </div>
        </div>
    );
}




function HistoryCard({
    id,
    equipName,
    status,
    requestDate,
    returnDate,
    approvedDate,
    adminComment,
    quantity
}) {
    const bgStatus = status === 'completed'
        ? 'from-green-500 to-lime-400'
        : 'from-red-500 to-pink-400';

    // Animation variants for the card
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className={`w-full p-4 rounded-lg bg-gradient-to-r ${bgStatus} shadow-md mb-4`}
        >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center text-black">
                {/* ID */}
                <div className="col-span-1 font-bold flex md:justify-center">#{id}</div>

                {/* Equipment Name */}
                <div className="col-span-3 md:col-span-4 flex md:justify-center">
                    <span className="font-medium">{equipName}</span>
                </div>

                {/* Status */}
                <div className="col-span-3 flex md:justify-center capitalize">
                    <span className="font-semibold">{status}</span>
                </div>

                {/* Details */}
                <div className="col-span-5 md:col-span-4 text-sm">
                    <p><span className="font-semibold">Requested On:</span> {requestDate}</p>

                    {status === 'completed' && (
                        <p><span className="font-semibold">Response On:</span> {returnDate}</p>
                    )}

                    {status === 'rejected' && (
                        <>
                            <p><span className="font-semibold">Rejected On:</span> {approvedDate}</p>
                            <p><span className="font-semibold">Admin Comment:</span> {adminComment}</p>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
}


export default History;
