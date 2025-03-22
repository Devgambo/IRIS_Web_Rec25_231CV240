import { ClerkExpressRequireAuth} from '@clerk/clerk-sdk-node';

export const requireAuth = ClerkExpressRequireAuth({ 
    apiKey: process.env.CLERK_SECRET_KEY,
 });
