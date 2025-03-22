import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { Button } from './ui/button'
import Loader from './Loader'


function Protected({page_for_role}) {
    const { user } = useUser()

    const role = user?.unsafeMetadata?.role;

    console.log(user);
    if (!user) {
        return (
            <div className="h-screen flex flex-col justify-center items-center text-2xl">
                <Loader/>
            </div>
        );
    }

    if(role===page_for_role){
        return (
            <>
                <Outlet/>
            </>
        )
    }
    else{
        return(<>
        <div className='flex flex-col justify-center h-screen items-center text-2xl text-red-500 m-5' >
            NOT AUTHORISED ON THIS PAGE
            <Link to={'/'}>
                <Button className={'outline'}>Go Back</Button>
            </Link>
        </div>
        </>)
    }
}

export default Protected
