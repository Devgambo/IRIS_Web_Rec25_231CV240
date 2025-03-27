import React from 'react';
import { motion } from 'framer-motion';
import { SignedIn, SignedOut, SignIn, UserButton, SignOutButton } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
function Navbar() {
    const { user } = useUser();
    const role = user?.unsafeMetadata?.role
    return (
        <motion.div
            className='z-10 flex justify-center items-center fixed top-4 left-1/2 transform -translate-x-1/2 h-[6vh] w-[90vw] max-w-4xl bg-white/10 border border-white/20 rounded-full backdrop-blur-sm'
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            whileHover={{ scale: 1.01, borderColor: 'white' }}
            transition={{ type: 'spring', stiffness: 120 }}
        >
            <div className='flex justify-between items-center w-full px-4'>
                <div className='text-white font-bold'>
                    <Link to={'/'}>
                        NITK SportsMate
                    </Link>
                </div>
                <div className='flex items-center space-x-4'>
                    <SignedIn>
                        {role == 'admin' &&
                            <div className='text-white font-bold  '>
                                <Link to={'/management'}>
                                    Manage🧑‍🔧
                                </Link>
                            </div>
                        }
                        {role == 'admin' &&
                            <div className='text-white font-bold '>
                                <Link to={'/dashboard-admin'}>
                                    Dashboard🤖
                                </Link>
                            </div>
                        }
                        {/* <SignOutButton className={'cursor-pointer '}>
                            Log out
                        </SignOutButton> */}
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <Link to={'/signup'}>Signup</Link>
                        <Link to={'/signin'}>Login</Link>
                    </SignedOut>
                </div>
            </div>
        </motion.div>
    );
}

export default Navbar;
