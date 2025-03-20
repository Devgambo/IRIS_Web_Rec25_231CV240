import SignupForm from '../components/signup-form'
import React from 'react'

function SignUpPage() {
    return (
     <div className='w-full h-screen grid-cols-12'>
        <div className='col-span-6'>
            <SignupForm/>
        </div>
        <div className='col-span-6'>
            image
        </div>
     </div>
    )
}

export default SignUpPage
