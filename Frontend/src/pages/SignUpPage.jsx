import SignupForm from '../components/signup-form'
import React from 'react'

function SignUpPage() {
    return (
        <div className="grid md:grid-cols-2 min-h-screen bg-gradient-to-r from-black via-gray-400 to-white">
            <div className="flex justify-center items-center p-4">
                <SignupForm />
            </div>
            <div className="flex justify-center items-center p-4">
                <img src="/logo3 (1).png" alt="Logo" />
            </div>
        </div>
    )
}

export default SignUpPage
