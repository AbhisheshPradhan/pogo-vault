import type { User } from 'firebase/auth';
import { createContext, useContext } from 'react';

export interface AuthContextProps {
    user: User | null;
    userId: string | undefined;
    isSignedIn: boolean;
    isLoadingUser: boolean;
    logout: () => Promise<void>;
    signInWithGoogle: () => Promise<User>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuth = () => {
    const value = useContext(AuthContext);
    if (value === null) throw Error('No context, add <AuthContextProvider>');
    return value;
};
