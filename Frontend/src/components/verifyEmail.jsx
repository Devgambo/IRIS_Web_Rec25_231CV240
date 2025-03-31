import { useState, useEffect } from 'react';
import { useSignUp, useAuth, useUser } from '@clerk/clerk-react';
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from '@/features/userSliceApi.js';
import toast from 'react-hot-toast';

export default function VerifyEmail() {

  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shouldSave, setShouldSave] = useState(false);

  const { getToken } = useAuth();
  const { signUp, setActive } = useSignUp();
  const { user } = useUser();

  const [signup, { isLoading }] = useSignupMutation();

  //function to save to db
  const saveUserToDB = async () => {
    try {
      if (!user) {
        console.error("User not found yet.");
        return;
      }

      const token = await getToken();

      console.log("token:", token);

      const userPayload = {
        "clerkId": user.id,
        "email": user.primaryEmailAddress.emailAddress,
        "name": `${user.firstName} ${user.lastName}`,
        "regNo": user.unsafeMetadata.RegNo || 'N/A',
        "role": user.unsafeMetadata.role,
      };

      console.log('Attempting to save user with payload:', userPayload);

      const response = await signup({
        user: userPayload,
        token
      }).unwrap();

      toast.success("Successfully saved to database")
      console.log('✅ User saved successfully:', response);
      navigate('/dashboard');

    } catch (err) {
      console.error("❌ Error saving user:", err);
      toast.error("Error in saving user")
      setError(
        err.data?.message ||
        err.error ||
        'Failed to save user data'
      );
    }
  };

  useEffect(() => {
    const save = async () => {
      if (user && shouldSave) {
        await saveUserToDB();
      }
    };
    save();
  }, [user, shouldSave]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });
      await setActive({ session: completeSignUp.createdSessionId });
      console.log('✅ Session created:', completeSignUp.createdSessionId);
      toast.success("Successfully Signed in")
      setShouldSave(true);
    } catch (err) {
      console.error('❌ Verification Error:', err);
      setError(err.errors ? err.errors[0].message : 'Invalid code!');
      toast.error("You entered wrong code")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
      <form onSubmit={handleVerify} className="space-y-4">
        <div>
          <label>Verification Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter the code from your email"
          />
        </div>

        <button
          type="submit"
          disabled={loading || isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? 'Verifying...'
            : isLoading
              ? 'Saving user...'
              : 'Verify'}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}
