import { useAuth } from '../context/auth.context';

export const LoginButton = () => {
    const { signInWithGoogle } = useAuth();

    return (
        <button
            onClick={() => signInWithGoogle()}
            className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
            Login with Google
        </button>
    );
};
