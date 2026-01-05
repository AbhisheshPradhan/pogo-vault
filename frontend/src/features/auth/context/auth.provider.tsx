import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    type PropsWithChildren,
} from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    type User,
} from 'firebase/auth';

import { auth } from '../../../lib/firebase';
import { AuthContext } from './auth.context';

import { collectionKeys, userKeys } from '@services/queryKeys';
import { createDatabaseUser } from '@services/userService';

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const queryClient = useQueryClient();

    const [user, setUser] = useState<User | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

    useEffect(() => {
        if (!isLoadingUser && !isSignedIn) {
            console.log('Session cleared: Removing user-specific cache...');

            queryClient.removeQueries({ queryKey: userKeys.all });
            queryClient.invalidateQueries({ queryKey: collectionKeys.all });
        }
    }, [isSignedIn, isLoadingUser, queryClient]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (!firebaseUser) {
                setUser(null);
                setIsSignedIn(false);
                setIsLoadingUser(false);
                return;
            }

            setUser(firebaseUser);
            setIsSignedIn(true);

            try {
                await createDatabaseUser({
                    uid: firebaseUser.uid,
                    username: firebaseUser.displayName || 'New Trainer',
                });
            } catch (error) {
                console.error('Error syncing user to database:', error);
            } finally {
                setIsLoadingUser(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = useMemo(
        () => async () => {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            return result.user;
        },
        [],
    );

    const logout = useCallback(async () => {
        try {
            await signOut(auth);
            // Explicitly clear cache on logout to be safe
            queryClient.clear();
        } catch (error) {
            console.error('Logout error:', error);
        }
    }, [queryClient]);

    const value = useMemo(() => {
        const userId = user?.uid;
        return {
            user,
            userId,
            isLoadingUser,
            isSignedIn,
            logout,
            signInWithGoogle,
        };
    }, [user, isLoadingUser, isSignedIn, signInWithGoogle, logout]);

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
