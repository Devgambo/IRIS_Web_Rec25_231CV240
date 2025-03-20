import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

function Protected({page_for_role}) {
    const { user } = useUser()

    const role = user?.unsafeMetadata?.role;

    console.log(user);
    if (!user) {
        return (
            <div className="flex flex-col justify-center items-center text-2xl">
                Loading...
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
        <div className='flex flex-col justify-center items-center text-2xl' >
            NOT AUTHORISED ON THIS PAGE
            <button onClick={Navigate('/')}>
                go back
            </button>
        </div>
        </>)
    }
}

export default Protected
