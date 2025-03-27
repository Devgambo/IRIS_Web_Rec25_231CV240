import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreateCategoryForm from './forms/CreateCategoryForm';
import CreateEquipForm from './forms/CreateEquipForm';
import CreateInfraForm from './forms/CreateInfraForm';

function Create() {
    const [openModal, setOpenModal] = useState(null);

    const createOptions = [
        { id: 'category', label: 'Create Category', emoji: '🏷️' },
        { id: 'equipment', label: 'Create Equipment', emoji: '⚽' },
        { id: 'infrastructure', label: 'Create Infrastructure', emoji: '🏟️' }
    ];

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5
            }
        }),
        hover: {
            scale: 1.05,
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="flex flex-col gap-4"
            >
                {createOptions.map((option, i) => (
                    <motion.div
                        key={option.id}
                        custom={i}
                        variants={itemVariants}
                        whileHover="hover"
                        className="w-full"
                    >
                        <Button
                            onClick={() => setOpenModal(option.id)}
                            className="w-full py-6 text-lg font-medium bg-emerald-500/10 hover:bg-emerald-500/20 border-2 border-emerald-500/30 text-emerald-100 rounded-xl transition-all"
                        >
                            <span className="mr-2 text-xl">{option.emoji}</span>
                            {option.label}
                        </Button>
                    </motion.div>
                ))}
            </motion.div>

            {/* Category Modal */}
            <Dialog open={openModal === 'category'} onOpenChange={() => setOpenModal(null)}>
                <DialogContent className="sm:max-w-[425px] bg-black border-emerald-500/30">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <DialogHeader>
                            <DialogTitle className="text-emerald-400 mb-4">Create New Category</DialogTitle>
                        </DialogHeader>
                        <CreateCategoryForm
                            onSuccess={() => setOpenModal(null)}
                        />
                    </motion.div>
                </DialogContent>
            </Dialog>

            {/* Equipment Modal */}
            <Dialog open={openModal === 'equipment'} onOpenChange={() => setOpenModal(null)}>
                <DialogContent className="sm:max-w-[425px] bg-black border-emerald-500/30">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <DialogHeader>
                            <DialogTitle className="text-emerald-400 mb-4">Create New Equipment</DialogTitle>
                        </DialogHeader>
                        <CreateEquipForm
                            onSuccess={() => setOpenModal(null)}
                        />
                    </motion.div>
                </DialogContent>
            </Dialog>

            {/* Infrastructure Modal */}
            <Dialog open={openModal === 'infrastructure'} onOpenChange={() => setOpenModal(null)}>
                <DialogContent className="sm:max-w-[425px] bg-black border-emerald-500/30">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <DialogHeader>
                            <DialogTitle className="text-emerald-400 mb-4">Create New Infrastructure</DialogTitle>
                        </DialogHeader>
                        <CreateInfraForm
                            onSuccess={()=> setOpenModal(null)}
                        />
                    </motion.div>
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default Create;