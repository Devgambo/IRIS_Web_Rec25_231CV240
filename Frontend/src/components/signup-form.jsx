import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignUp, useUser } from '@clerk/clerk-react';
import VerifyEmail from "./verifyEmail";



const signupSchema = z.object({
  firstname: z.string().min(2, 'Firstname is required'),
  lastname: z.string().min(2, 'Lastname is required'),
  email: z.string().email('Invalid email'),
  regNo: z.preprocess((val) => Number(val), z.number()),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});



export default function SignupForm() {

  const { signUp } = useSignUp();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const [isPendingVerification, setIsPendingVerification] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const result = await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.firstname,
        lastName: data.lastname,
      });

      await signUp.update({
        unsafeMetadata: {
          RegNo: data.regNo,
          role: 'student',
        },
      });

      // Send verification email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      //TODO: toaster for alerts (code sent!)

      setIsPendingVerification(true)
    } catch (err) {
      console.error(err);
      setError(err.errors ? err.errors[0].message : 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  if (isPendingVerification) {
    return (
      <VerifyEmail/>
    )
  }

  return (
    (<div
      className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to SportsMate
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Signup to nitk sportsMate
      </p>
      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input {...register('firstname')} id="firstname" placeholder="Tyler" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input {...register('lastname')} id="lastname" placeholder="Durden" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input {...register('email')} id="email" placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="registrationNo">Registration Number</Label>
          <Input {...register('regNo')} id="registrationNo" placeholder="2310229" type="number" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Create Password</Label>
          <Input {...register('password')} id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>
        <button
          disabled={loading}
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit">
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>)
  );
}

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    (<div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>)
  );
};
