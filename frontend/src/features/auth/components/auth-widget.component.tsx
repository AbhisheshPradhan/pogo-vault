import { useAuth } from '../context/auth.context';
import { LoginButton } from './login-button.component';
import { UserMenu } from './user-menu.component';

export const AuthWidget = () => {
    const { isSignedIn, user, isLoadingUser } = useAuth();

    if (isLoadingUser) {
        return (
            <div className="size-10 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
        );
    }
    if (!isSignedIn) return <LoginButton />;

    if (!user)
        return (
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
        );

    return <UserMenu user={user} />;
};
