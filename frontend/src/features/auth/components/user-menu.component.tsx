import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Description,
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react';

import type { User } from 'firebase/auth';

import { useAuth } from '../context/auth.context';
import { useUserCatchStatesActions } from '@features/collection/hooks/useUserCatchStates';

interface UserMenuProps {
    user: User;
}

export const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
    const { logout } = useAuth();
    const { resetCatchStates, isResetting } = useUserCatchStatesActions(
        user.uid,
    );
    const [isOpen, setIsOpen] = useState(false);

    const isAdmin = true;

    const handleResetProgress = () => {
        console.log('handleResetProgress');
        resetCatchStates(undefined, {
            onSuccess: () => {
                setIsOpen(false); // Close modal on success
                // You could add a toast notification here
            },
        });
    };

    return (
        <>
            <Menu as="div" className="relative">
                <MenuButton className="relative flex cursor-pointer rounded-full ring-2 ring-transparent transition-all hover:ring-indigo-500 focus:outline-none">
                    <img
                        alt=""
                        src={user.photoURL || ''}
                        className="size-10 rounded-full border border-gray-200 dark:border-white/10"
                    />
                </MenuButton>

                <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-xl border border-gray-200 bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-closed:scale-95 data-closed:opacity-0 dark:border-white/10 dark:bg-gray-900"
                >
                    {/* User Info Header */}
                    <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 dark:border-white/5">
                        <img
                            src={user.photoURL || ''}
                            className="size-10 rounded-full"
                            alt=""
                        />
                        <div className="flex flex-col overflow-hidden">
                            <span className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                                {user.displayName}
                            </span>
                            <span className="truncate text-xs text-gray-500 dark:text-gray-400">
                                {user.email}
                            </span>
                        </div>
                    </div>

                    <div className="py-1">
                        {isAdmin && (
                            <MenuItem>
                                <Link
                                    to="/admin"
                                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-50 dark:text-gray-300 dark:data-focus:bg-white/5"
                                >
                                    Admin Dashboard
                                </Link>
                            </MenuItem>
                        )}

                        <MenuItem>
                            <button
                                onClick={() => setIsOpen(true)}
                                className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-50 dark:text-gray-300 dark:data-focus:bg-white/5"
                            >
                                Reset All Progress
                            </button>
                        </MenuItem>
                    </div>

                    <div className="border-t border-gray-100 dark:border-white/5">
                        <MenuItem>
                            <button
                                onClick={() => logout()}
                                className="block w-full cursor-pointer px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                            >
                                Log out
                            </button>
                        </MenuItem>
                    </div>
                </MenuItems>
            </Menu>

            <Dialog
                open={isOpen || isResetting}
                onClose={() => setIsOpen(false)}
                transition
                className="fixed inset-0 z-10 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-closed:opacity-0"
            >
                <DialogBackdrop className="fixed inset-0 bg-black/20" />

                <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
                    <DialogPanel className="max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
                        <DialogTitle className="text-xl font-bold dark:text-white">
                            Reset All Progress?
                        </DialogTitle>
                        <Description className="mt-2 text-sm text-gray-500 dark:text-white">
                            This action is permanent. Please wait a moment to
                            confirm.
                        </Description>
                        <div className="mt-6 flex flex-col gap-4 sm:flex-row-reverse">
                            <Button
                                disabled={isResetting}
                                onClick={handleResetProgress}
                                className={`relative inline-flex w-full cursor-pointer justify-center overflow-hidden rounded-lg bg-red-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-500 ease-in-out hover:bg-red-500 sm:w-auto`}
                            >
                                <span className="relative z-10">
                                    {isResetting
                                        ? 'Resetting...'
                                        : 'Yes, Reset Everything'}
                                </span>
                            </Button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="inline-flex w-full cursor-pointer justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:w-auto dark:bg-gray-800 dark:text-white dark:ring-white/10 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
};
