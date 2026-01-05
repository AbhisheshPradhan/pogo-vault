import React from 'react';
import { Link } from 'react-router-dom';

import { ThemeToggle } from '@features/theme-toggle';
import { AuthWidget } from '@features/auth/components';

export const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-between p-4">
            <Link to={`/`} className="block">
                <h1 className="text-xl font-bold">PoGo Vault</h1>
            </Link>
            <div className="flex items-center justify-between gap-4">
                <ThemeToggle />
                <AuthWidget />
            </div>
        </header>
    );
};
